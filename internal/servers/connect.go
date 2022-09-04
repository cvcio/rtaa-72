package servers

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/cvcio/rtaa-72/internal/proto/rtaa/streamer/twitter/v1/twitterv1connect"
	"github.com/cvcio/rtaa-72/internal/services"
	"github.com/cvcio/rtaa-72/pkg/config"
	"github.com/cvcio/rtaa-72/pkg/logger"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func RunConnect(ctx context.Context, cfg *config.Config) error {
	// ** LOGGER
	// Create a reusable zap logger
	log := logger.NewLogger(cfg.Env, cfg.Log.LogLevel, cfg.Log.LogPath)

	// ** CHANNELS
	// Blocking main listening for requests
	// Make a channel to listen for errors coming from the listener. Use a
	// buffered channel so the goroutine can exit if we don't collect this error.
	serverErrors := make(chan error, 1)
	defer close(serverErrors)

	// Listen for os signals
	osSignals := make(chan os.Signal, 1)
	defer close(osSignals)

	// ** MIDDLEWARE
	// Create cors middleware
	cors := cors.New(cors.Options{
		// AllowedOrigins: []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}, //, "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		// Debug:            cfg.Web.Debug,
	})

	// Register gRPC server endpoint
	// Note: Make sure the gRPC server is running properly and accessible
	mux := http.NewServeMux()
	twitterWatchService := services.NewTwitterWatchServiceConnect(log, cfg)
	defer twitterWatchService.Close()

	muxPath, muxHandler := twitterv1connect.NewTwitterWatchServiceHandler(twitterWatchService)
	mux.Handle(muxPath, muxHandler)

	// ** HTTP SERVER
	// Use WebsocketProxy to expose the underlying handler as a bidi
	// websocket stream with newline-delimited JSON as the content encoding.
	server := &http.Server{
		Addr:    cfg.GetConnectURL(),
		Handler: h2c.NewHandler(cors.Handler(mux), &http2.Server{}),
		// ReadTimeout:    cfg.Gateway.ReadTimeout,
		// WriteTimeout:   cfg.Gateway.WriteTimeout,
		// MaxHeaderBytes: 1 << 20,
	}

	// Start the service listening for requests.
	log.Debug("Ready to start gRPC gateway")
	go func() {
		log.Debugf("Starting Connect service on %s", cfg.GetConnectURL())
		serverErrors <- server.ListenAndServe()
	}()

	// ** TERMINATION
	// Listen for manual termination
	signal.Notify(osSignals, syscall.SIGTERM, syscall.SIGINT, syscall.SIGHUP, syscall.SIGQUIT)

	// Blocking main and waiting for shutdown.
	select {
	case err := <-serverErrors:
		log.Errorf("Error starting gRPC gateway server: %v", err.Error())
		return err

	case signal := <-osSignals:
		log.Infof("Start shutdown signal %s", signal)

		// Asking listener to shutdown and load shed.
		if err := server.Shutdown(ctx); err != nil {
			log.Debugf("Graceful shutdown did not complete in %s: %s", cfg.Gateway.ShutdownTimeout, err.Error())
			if err := server.Close(); err != nil {
				return err
			}
		}
	}

	return nil
}
