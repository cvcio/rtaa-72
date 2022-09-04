package main

import (
	"context"
	"fmt"
	"os"

	"github.com/cvcio/rtaa-72/internal/servers"
	"github.com/cvcio/rtaa-72/pkg/config"
	"github.com/kelseyhightower/envconfig"
)

// Ministry gRPC Server
// Handles auth, accounts, subscriptions, organizations
// and any other business model accross all CVCIO "products".
func main() {
	// Create a new Config struct to store environment variables
	cfg := config.NewConfig()

	// Read config from env variables and panic on error,
	// as we can't continue
	err := envconfig.Process("", cfg)
	if err != nil {
		fmt.Printf("gRPC failed to parse environment variables, exiting with error: %s\n", err.Error())
		os.Exit(1)
	}

	// Create the context to cancel at exit
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Run the gRPC Server
	if err := servers.RunConnect(ctx, cfg); err != nil {
		fmt.Printf("gRPC server failure, exiting with error: %s\n", err.Error())
		os.Exit(1)
	}
}
