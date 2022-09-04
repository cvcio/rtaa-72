package twitter

import (
	"fmt"

	"github.com/dghubble/oauth1"
	twauth "github.com/dghubble/oauth1/twitter"
)

type TwitterAuthorizer struct {
	ConsumerKey    string
	ConsumerSecret string
}

func NewTwitterAuthorizer(consumerKey, consumerSecret string) *TwitterAuthorizer {
	return &TwitterAuthorizer{
		consumerKey, consumerSecret,
	}
}

func (t *TwitterAuthorizer) RequestToken() (string, string, error) {
	// create OAuth1 authorization client
	twitterAuth := oauth1.Config{
		ConsumerKey:    t.ConsumerKey,
		ConsumerSecret: t.ConsumerSecret,
		CallbackURL:    "oob", // "http://localhost:8080/auth/verify",
		Endpoint:       twauth.AuthorizeEndpoint,
	}

	// request temporaty token
	requestToken, _, err := twitterAuth.RequestToken()
	if err != nil {
		return "", "", fmt.Errorf("Request token error: %s", err.Error())
	}

	// generate authorization url
	authorizationURL, err := twitterAuth.AuthorizationURL(requestToken)
	if err != nil {
		return "", "", fmt.Errorf("Authorization URL error: %s", err.Error())
	}
	return authorizationURL.String(), requestToken, nil
}

func (t *TwitterAuthorizer) RequestAccessToken(requestToken, pin string) (string, string, error) {
	// create OAuth1 authorization client
	twitterAuth := oauth1.Config{
		ConsumerKey:    t.ConsumerKey,
		ConsumerSecret: t.ConsumerSecret,
		CallbackURL:    "oob",
		Endpoint:       twauth.AuthorizeEndpoint,
	}
	// generate access tokens
	accessToken, accessSecret, err := twitterAuth.AccessToken(requestToken, "secret does not matter", pin)
	if err != nil {
		return "", "", fmt.Errorf("Access token error: %s", err.Error())
	}
	return accessToken, accessSecret, nil
}
