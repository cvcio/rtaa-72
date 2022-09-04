package services

import (
	"context"
	"errors"
	"sync"

	"github.com/ChimeraCoder/anaconda"
	"github.com/bufbuild/connect-go"
	"github.com/cvcio/rtaa-72/internal/clients"
	accountsv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/classification/accounts/v1"
	commentsv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/classification/comments/v1"
	twitterwatchv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/streamer/twitter/v1"
	"github.com/cvcio/rtaa-72/pkg/config"
	"github.com/cvcio/rtaa-72/pkg/db"
	"github.com/cvcio/rtaa-72/pkg/helpers"
	"github.com/cvcio/rtaa-72/pkg/twitter"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type TwitterWatchServiceConnect struct {
	rtaa    *grpc.ClientConn
	clients map[string]clients.StreamClient
	mu      sync.RWMutex

	cfg *config.Config
	log *zap.SugaredLogger
	mg  *db.MongoDB
}

// NewTwitterWatchServiceConnect implements TwitterWatchService.
func NewTwitterWatchServiceConnect(log *zap.SugaredLogger, cfg *config.Config) *TwitterWatchServiceConnect {
	return &TwitterWatchServiceConnect{
		log:     log,
		cfg:     cfg,
		clients: make(map[string]clients.StreamClient, 1),
	}
}

func (s *TwitterWatchServiceConnect) Close() {
	for _, t := range s.getClients() {
		s.RemoveClient(t.Meta.Id)
	}
}

// AddClient adds a new client in the twitterwatch service
func (s *TwitterWatchServiceConnect) AddClient(id string, c *clients.StreamClient) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.clients[id]; !ok {
		s.clients[id] = *c
	}
}

// RemoveClient remove a client from the twitterwatch service
func (s *TwitterWatchServiceConnect) RemoveClient(id string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.log.Debugf("Removing client: %s", id)

	if c, ok := s.clients[id]; ok {
		c.Close()
		delete(s.clients, id)
	}
}

// getClients get all active clients
func (s *TwitterWatchServiceConnect) getClients() []clients.StreamClient {
	var cs []clients.StreamClient

	s.mu.RLock()
	defer s.mu.RUnlock()

	for _, c := range s.clients {
		cs = append(cs, c)
	}

	return cs
}

func (s *TwitterWatchServiceConnect) Authorize(context.Context, *connect.Request[twitterwatchv1_pb.AuthorizeRequest]) (*connect.Response[twitterwatchv1_pb.AuthResponse], error) {
	return connect.NewResponse(&twitterwatchv1_pb.AuthResponse{}), nil
}

// Obb implements twitter's pin-based oath 1.0a authorization
// read more: https://developer.twitter.com/en/docs/authentication/oauth-1-0a/pin-based-oauth
func (s *TwitterWatchServiceConnect) Obb(ctx context.Context, req *connect.Request[twitterwatchv1_pb.Empty]) (*connect.Response[twitterwatchv1_pb.ObbResponse], error) {
	// create the authorizer
	authorizer := twitter.NewTwitterAuthorizer(s.cfg.Twitter.TwitterConsumerKey, s.cfg.Twitter.TwitterConsumerSecret)

	// request a token
	url, requestToken, err := authorizer.RequestToken()
	if err != nil {
		s.log.Errorf("request token error: %s", err.Error())
		return nil, status.Error(codes.Internal, "request token error")
	}
	return connect.NewResponse(&twitterwatchv1_pb.ObbResponse{
		RequestToken: requestToken,
		Url:          url,
	}), nil
}

// Verify twitter's authorization
func (s *TwitterWatchServiceConnect) Verify(ctx context.Context, req *connect.Request[twitterwatchv1_pb.VerifyRequest]) (*connect.Response[twitterwatchv1_pb.AuthResponse], error) {
	s.log.Debugf("Verify request: %+v", req.Msg)
	// create the authorizer
	authorizer := twitter.NewTwitterAuthorizer(s.cfg.Twitter.TwitterConsumerKey, s.cfg.Twitter.TwitterConsumerSecret)

	// request access tokens
	oAuthToken, oAuthTokenSecret, err := authorizer.RequestAccessToken(req.Msg.RequestToken, req.Msg.OauthVerifier)
	if err != nil {
		s.log.Errorf("request access tokens error: %s", err.Error())
		return nil, status.Error(codes.Internal, "request access token error")
	}

	// connect to twitter api v1
	api := anaconda.NewTwitterApiWithCredentials(oAuthToken, oAuthTokenSecret, s.cfg.Twitter.TwitterConsumerKey, s.cfg.Twitter.TwitterConsumerSecret)

	// retrieve self
	self, err := api.GetSelf(nil)
	if err != nil {
		s.log.Errorf("request self error: %s", err.Error())
		return nil, status.Error(codes.Internal, "request profile error, unable to verify credentials")
	}

	// save the model
	// return AuthResponse
	return connect.NewResponse(&twitterwatchv1_pb.AuthResponse{
		Id:                   self.IdStr,
		OauthToken:           oAuthToken,
		OauthTokenSecret:     oAuthTokenSecret,
		Email:                self.Email,
		UserName:             self.ScreenName,
		Verified:             self.Verified,
		ProfileImageUrlHttps: self.ProfileImageUrlHttps,
		CreatedAt:            timestamppb.Now(),
	}), nil
}

// Addrules adds a new rule to twitter streaming api
func (s *TwitterWatchServiceConnect) AddRules(context.Context, *connect.Request[twitterwatchv1_pb.RulesRequest]) (*connect.Response[twitterwatchv1_pb.RulesResponse], error) {
	return connect.NewResponse(&twitterwatchv1_pb.RulesResponse{}), nil
}

// GetRules returns all rules stored on twitter streaming api
func (s *TwitterWatchServiceConnect) GetRules(context.Context, *connect.Request[twitterwatchv1_pb.RulesRequest]) (*connect.Response[twitterwatchv1_pb.RulesResponse], error) {
	return connect.NewResponse(&twitterwatchv1_pb.RulesResponse{}), nil
}

// GetRule by id, specific to user id
func (s *TwitterWatchServiceConnect) GetRule(context.Context, *connect.Request[twitterwatchv1_pb.RulesRequest]) (*connect.Response[twitterwatchv1_pb.RulesResponse], error) {
	return connect.NewResponse(&twitterwatchv1_pb.RulesResponse{}), nil
}

// DeleteRules deletes all rules
func (s *TwitterWatchServiceConnect) DeleteRules(context.Context, *connect.Request[twitterwatchv1_pb.RulesRequest]) (*connect.Response[twitterwatchv1_pb.RulesResponse], error) {
	return connect.NewResponse(&twitterwatchv1_pb.RulesResponse{}), nil
}

// DeleteRule deletes a specific rule
func (s *TwitterWatchServiceConnect) DeleteRule(context.Context, *connect.Request[twitterwatchv1_pb.RulesRequest]) (*connect.Response[twitterwatchv1_pb.RulesResponse], error) {
	return connect.NewResponse(&twitterwatchv1_pb.RulesResponse{}), nil
}

// Connect establish a connection with the service
func (s *TwitterWatchServiceConnect) Connect(ctx context.Context, req *connect.Request[twitterwatchv1_pb.ConnectRequest]) (*connect.Response[twitterwatchv1_pb.ConnectResponse], error) {
	s.log.Debugf("Connect request: %s", req.Msg.Id)
	if req.Msg.OauthToken == "" || req.Msg.OauthTokenSecret == "" || req.Msg.Id == "" {
		return nil, status.Error(codes.Internal, "request profile error, unable to verify credentials")
	}

	// make sure to remove active client before connecting
	if _, ok := s.clients[req.Msg.Id]; ok {
		s.RemoveClient(req.Msg.Id)
	}

	// create a new stream client
	c, err := clients.NewStreamClient(s.cfg, req.Msg)
	if err != nil {
		return nil, status.Error(codes.Internal, "unable to create client")
	}

	if req.Msg.ClassificationServiceActive {
		// ** Classification Client
		classificationClient, err := grpc.Dial(req.Msg.ClassificationServiceHost, []grpc.DialOption{
			grpc.WithTransportCredentials(insecure.NewCredentials()),
		}...)
		if err != nil {
			s.log.Errorf("Error connecting to classification service, disabling: %s", err)
			c.Meta.ClassificationServiceActive = false
		} else {
			// rtaa-classifier
			c.ClassificationClient = clients.NewClassificationClient(
				ctx, s.log,
				accountsv1_pb.NewAccountServiceClient(classificationClient),
				commentsv1_pb.NewCommentServiceClient(classificationClient),
			)
		}
	}

	if req.Msg.GephiServiceActive {
		// ** Gephi Client
		ws, err := clients.NewGephiClient(req.Msg.GephiServiceHost, req.Msg.GephiServiceWorkspace, s.log)
		if err != nil {
			s.log.Errorf("Error connecting to gephi websocket, disabling: %s", err)
			c.Meta.GephiServiceActive = false
		} else {
			c.GephiClient = ws
		}
	}

	if req.Msg.Version == "v1" {
		// ** Twitter V1 Client
		twitterClient, err := twitter.NewV1API(req.Msg.OauthToken, req.Msg.OauthTokenSecret, s.cfg.Twitter.TwitterConsumerKey, s.cfg.Twitter.TwitterConsumerSecret)
		if err != nil {
			return nil, connect.NewError(connect.CodeInternal, err)
		}
		c.TwitterAPIV1 = twitterClient
	} else if req.Msg.Version == "v2" {
		// ** Twitter V2 Client
		twitterClient, err := twitter.NewV2API(req.Msg.OauthToken, req.Msg.OauthTokenSecret, s.cfg.Twitter.TwitterConsumerKey, s.cfg.Twitter.TwitterConsumerSecret)
		if err != nil {
			return nil, connect.NewError(connect.CodeInternal, err)
		}
		c.TwitterAPIV2 = twitterClient
	}

	// add client
	s.AddClient(req.Msg.Id, c)
	s.log.Debugf("Active clients: %d", len(s.getClients()))

	return connect.NewResponse(&twitterwatchv1_pb.ConnectResponse{
		Status: "created",
	}), nil
}

// Disconnect establish a connection with the service
func (s *TwitterWatchServiceConnect) Disconnect(ctx context.Context, req *connect.Request[twitterwatchv1_pb.ConnectRequest]) (*connect.Response[twitterwatchv1_pb.ConnectResponse], error) {
	s.log.Debugf("Disconnect request: %s", req.Msg.Id)
	// remove client
	if _, ok := s.clients[req.Msg.Id]; ok {
		s.RemoveClient(req.Msg.Id)
	}
	return connect.NewResponse(&twitterwatchv1_pb.ConnectResponse{
		Status: "removed",
	}), nil
}

// Stream data from twitter api
func (s *TwitterWatchServiceConnect) Stream(ctx context.Context, req *connect.Request[twitterwatchv1_pb.StreamRequest], stream *connect.ServerStream[twitterwatchv1_pb.StreamResponse]) error {
	s.log.Debugf("Stream request: %+v", req.Msg)

	// remove client on exit
	defer s.RemoveClient(req.Msg.Id)

	if _, ok := s.clients[req.Msg.Id]; ok {
		s.log.Debugf("Found client: %+v", req.Msg.Id)
		c := s.clients[req.Msg.Id]
		s.log.Debugf("Meta: %+v", c.Meta)
		TweetChan := make(chan anaconda.Tweet)
		defer close(TweetChan)
		ResponseChan := make(chan twitterwatchv1_pb.StreamResponse)
		defer close(ResponseChan)

		// v1 implementation
		// create the listener with public stream values
		err := c.TwitterAPIV1.NewListener(twitter.WithPublicStream(
			map[string][]string{"track": helpers.SplitTrim(c.Meta.Track)},
		))
		if err != nil {
			s.log.Errorf("Twitter API Error: %v", err)
			return connect.NewError(connect.CodeCanceled, errors.New("Twitter API Error."))
		}

		// start streaming from twitter
		go c.TwitterAPIV1.TweetListen(c.HandlerV1(TweetChan))

		// consume tweets and classify
		go c.ClassificationClient.ConsumeV1(TweetChan, ResponseChan, c.Meta.ClassificationServiceActive)

		// consume response channels and publish to stream
		for t := range ResponseChan {
			s.log.Debugf("New Accounts (%d), Tweets (%d), Relationships (%d)", len(t.Accounts), len(t.Tweets), len(t.Relationships))
			if c.Meta.GephiServiceActive {
				go c.GephiClient.Broadcast(&t)
			}
			if err := stream.Send(&t); err != nil {
				s.log.Warnf("broadcast warning, stream probably closed: %v", err)
				return connect.NewError(connect.CodeInternal, err)
			}
		}
	} else {
		return connect.NewError(connect.CodeNotFound, errors.New("Client not found."))
	}

	return nil
}
