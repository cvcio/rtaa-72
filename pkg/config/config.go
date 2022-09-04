package config

import (
	"fmt"
	"time"
)

// Config struct holds all the configuration elements for
// this service.
type Config struct {
	Env string `envconfig:"ENV" default:"development"`
	// Logger Settings
	Log struct {
		LogLevel string `envconfig:"LOG_LEVEL" default:"info"`
		LogPath  string `envconfig:"LOG_PATH" default:"tmp"`
	}
	// gRPC Service Settings
	Service struct {
		Network         string        `envconfig:"SERVICE_NETWORK" default:"tcp"`
		Host            string        `envconfig:"SERVICE_HOST" default:"0.0.0.0"`
		Port            string        `envconfig:"SERVICE_PORT" default:"50050"`
		ReadTimeout     time.Duration `envconfig:"SERVICE_READ_TIMEOUT" default:"10s"`
		WriteTimeout    time.Duration `envconfig:"SERVICE_WRITE_TIMEOUT" default:"20s"`
		ShutdownTimeout time.Duration `envconfig:"SERVICE_SHUTDOWN_TIMEOUT" default:"10s"`
		DomainName      string        `envconfig:"SERVICE_DOMAIN_NAME" default:""`
	}
	// gRPC Gateway Settings
	Gateway struct {
		Enabled         bool          `envconfig:"GATEWAY_ENABLED" default:"false" `
		Host            string        `envconfig:"GATEWAY_HOST" default:"0.0.0.0"`
		Port            string        `envconfig:"GATEWAY_PORT" default:"50051"`
		ReadTimeout     time.Duration `envconfig:"GATEWAY_READ_TIMEOUT" default:"10s"`
		WriteTimeout    time.Duration `envconfig:"GATEWAY_WRITE_TIMEOUT" default:"20s"`
		ShutdownTimeout time.Duration `envconfig:"GATEWAY_SHUTDOWN_TIMEOUT" default:"0s"`
		DomainName      string        `envconfig:"GATEWAY_DOMAIN_NAME" default:""`
	}
	// connect Gateway Settings
	Connect struct {
		Enabled         bool          `envconfig:"CONNECT_ENABLED" default:"true" `
		Host            string        `envconfig:"CONNECT_HOST" default:"0.0.0.0"`
		Port            string        `envconfig:"CONNECT_PORT" default:"8000"`
		ReadTimeout     time.Duration `envconfig:"CONNECT_READ_TIMEOUT" default:"10s"`
		WriteTimeout    time.Duration `envconfig:"CONNECT_WRITE_TIMEOUT" default:"20s"`
		ShutdownTimeout time.Duration `envconfig:"CONNECT_SHUTDOWN_TIMEOUT" default:"0s"`
	}
	// Mongo Settings
	Mongo struct {
		Host        string        `envconfig:"MONGO_HOST" default:"localhost"`
		Port        int           `envconfig:"MONGO_PORT" default:"27017"`
		Path        string        `envconfig:"MONGO_PATH" default:""`
		User        string        `envconfig:"MONGO_USER" default:""`
		Pass        string        `envconfig:"MONGO_PASS" default:""`
		DialTimeout time.Duration `envconfig:"MONGO_TIMEOUT" default:"15s"`
	}
	// Redis Settings
	Redis struct {
		Host string `envconfig:"REDIS_HOST" default:"localhost"`
		Port string `envconfig:"REDIS_PORT" default:"6379"`
	}
	Streamer struct {
		Host   string   `default:"localhost" envconfig:"STREAMER_HOST"`
		Port   string   `default:"50050" envconfig:"STREAMER_PORT"`
		Follow string   `default:"" envconfig:"FOLLOW"`
		Track  []string `default:"" envconfig:"TRACK"`
	}
	Twitter struct {
		TwitterConsumerKey       string `envconfig:"TWITTER_CONSUMER_KEY" default:""`
		TwitterConsumerSecret    string `envconfig:"TWITTER_CONSUMER_SECRET" default:""`
		TwitterAccessToken       string `envconfig:"TWITTER_ACCESS_TOKEN" default:""`
		TwitterAccessTokenSecret string `envconfig:"TWITTER_ACCESS_TOKEN_SECRET" default:""`
	}
	// TLS Certificates
	TLS struct {
		PEMFile string `envconfig:"TLS_PEM_FILE" default:"server-cert.pem"`
		KEYFile string `envconfig:"TLS_KEY_FILE" default:"server-key.key"`
	}

	Classification struct {
		Enabled bool   `envconfig:"CLASSIFICATION_ENABLED" default:"true" `
		Host    string `envconfig:"CLASSIFICATION_HOST" default:"0.0.0.0"`
		Port    string `envconfig:"CLASSIFICATION_PORT" default:"50052"`
	}
}

// NewConfig return a new Config
func NewConfig() *Config {
	return new(Config)
}

// GetGatewayURL returns gateway's URL in host:port foprmat
func (c *Config) GetGatewayURL() string {
	return fmt.Sprintf("%s:%s", c.Gateway.Host, c.Gateway.Port)
}

// GetServiceURL returns service's URL in host:port foprmat
func (c *Config) GetServiceURL() string {
	return fmt.Sprintf("%s:%s", c.Service.Host, c.Service.Port)
}

// GetConnectURL returns service's (connect) URL in host:port foprmat
func (c *Config) GetConnectURL() string {
	return fmt.Sprintf("%s:%s", c.Connect.Host, c.Connect.Port)
}

// RedisURL returns server `host:port`
func (c *Config) GetRedisURL() string {
	return fmt.Sprintf("%s:%s", c.Redis.Host, c.Redis.Port)
}

// ClassificationURL returns server `host:port`
func (c *Config) GetClassificationURL() string {
	return fmt.Sprintf("%s:%s", c.Classification.Host, c.Classification.Port)
}

// GetMongoURL returns server `host:port`
func (c *Config) GetMongoURL() string {
	return fmt.Sprintf("mongodb://%s:%d/%s", c.Mongo.Host, c.Mongo.Port, c.Mongo.Path)
}
