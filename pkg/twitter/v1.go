package twitter

import (
	"net/url"

	"github.com/ChimeraCoder/anaconda"
)

// Demux receives channels or interfaces and type switches them to call the appropriate handle function.
type Demux interface {
	Handle(m interface{})
	HandleChan(c <-chan interface{})
}

// StreamDemux receives messages and type switches them to call functions with typed messages.
type StreamDemux struct {
	All        func(m interface{})
	Tweet      func(tweet anaconda.Tweet)
	Event      func(event anaconda.Event)
	EventTweet func(event anaconda.EventTweet)
	Other      func(m interface{})
}

// NewStreamDemux initializes a new StreamDemux.
func NewStreamDemux() StreamDemux {
	return StreamDemux{
		All:        func(m interface{}) {},
		Tweet:      func(tweet anaconda.Tweet) {},
		Event:      func(event anaconda.Event) {},
		EventTweet: func(event anaconda.EventTweet) {},
		Other:      func(m interface{}) {},
	}
}

// Handle handles messages.
func (d StreamDemux) Handle(m interface{}) {
	d.All(m)

	switch t := m.(type) {
	case anaconda.Tweet:
		d.Tweet(t)
	case anaconda.Event:
		d.Event(t)
	case anaconda.EventTweet:
		d.EventTweet(t)
	default:
		d.Other(t)
	}
}

// HandleChan handles channels.
func (d StreamDemux) HandleChan(c <-chan interface{}) {
	for m := range c {
		d.Handle(m)
	}
}

// V1Client struct.
type V1Client struct {
	Api    *anaconda.TwitterApi
	Stream *anaconda.Stream
}

type ListenOpts func(*V1Client) error

// NewV1API creates a new anaconda instance.
// Anaconda is a Twitter API Drivers (github.com/ChimeraCoder/anaconda).
func NewV1API(accessToken string, accessTokenSecret string, consumerKey string, consumerSecret string) (*V1Client, error) {
	api := anaconda.NewTwitterApiWithCredentials(
		accessToken,
		accessTokenSecret,
		consumerKey,
		consumerSecret,
	)
	if _, err := api.VerifyCredentials(); err != nil {
		return nil, err
	}

	return &V1Client{Api: api}, nil
}

func WithPublicStream(values map[string][]string) ListenOpts {
	return func(s *V1Client) error {
		v := url.Values(values)
		s.Stream = s.Api.PublicStreamFilter(v)
		return nil
	}
}

// NewListener return a new Listener service, given a twitter api client
func (s *V1Client) NewListener(opts ...ListenOpts) error {
	for _, opt := range opts {
		err := opt(s)
		if err != nil {
			return err
		}
	}
	return nil
}

// Listen start the listener and send cathed urls to chan
func (s *V1Client) TweetListen(f func(anaconda.Tweet)) {
	demux := NewStreamDemux()
	demux.Tweet = f
	demux.HandleChan(s.Stream.C)
}

// GetUsersShow Retrieve User Information from Twitter
func (s *V1Client) GetUsersShow(username string) *anaconda.User {
	user, err := s.Api.GetUsersShow(username, url.Values{})
	if err != nil {
		return nil
	}
	return &user
}

// Stop stops the listener
func (s *V1Client) Stop() {
	s.Stream.Stop()
}
