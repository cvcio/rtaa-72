package clients

import (
	"github.com/ChimeraCoder/anaconda"
	twitterwatchv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/streamer/twitter/v1"
	"github.com/cvcio/rtaa-72/pkg/config"
	"github.com/cvcio/rtaa-72/pkg/twitter"
)

type StreamClient struct {
	TwitterAPIV1         *twitter.V1Client
	TwitterAPIV2         *twitter.V2Client
	ClassificationClient *ClassificationClient
	GephiClient          *GephiClient
	Meta                 *twitterwatchv1_pb.ConnectRequest
}

func NewStreamClient(cfg *config.Config, meta *twitterwatchv1_pb.ConnectRequest) (*StreamClient, error) {
	return &StreamClient{
		Meta: meta,
	}, nil
}

func (c *StreamClient) Close() {
	if c.Meta.ClassificationServiceActive {
		c.ClassificationClient.Close()
	}
	if c.Meta.GephiServiceActive {
		c.GephiClient.Close()
	}

	if c.TwitterAPIV1 != nil {
		c.Reset()
		c.TwitterAPIV1.Api.Close()
	}
}
func (c *StreamClient) Reset() {
	if c.TwitterAPIV1 != nil && c.TwitterAPIV1.Stream != nil {
		c.TwitterAPIV1.Stream.Stop()
	}
}
func (c *StreamClient) HandlerV1(tweetChan chan anaconda.Tweet) func(t anaconda.Tweet) {
	return func(t anaconda.Tweet) {
		tweetChan <- t
	}
}
