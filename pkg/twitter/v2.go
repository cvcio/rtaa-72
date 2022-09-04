package twitter

import (
	"errors"
	"net/url"

	tc "github.com/cvcio/twitter"
)

// V2Client struct
type V2Client struct {
	Api *tc.Twitter
}

// NewV2API returns a new twitter v2 api client
func NewV2API(accessToken string, accessTokenSecret string, consumerKey string, consumerSecret string) (*V2Client, error) {
	api, err := tc.NewTwitter(consumerKey, consumerSecret)
	if err != nil {
		return nil, errors.New(err.Message)
	}
	if ok, err := api.VerifyCredentials(); err != nil || !ok {
		return nil, errors.New(err.Message)
	}
	return &V2Client{Api: api}, nil
}

// AddStreamRules add new rules to a specific stream
func (c *V2Client) AddStreamRules(value, tag string) (*tc.Rules, error) {
	rules := new(tc.Rules)
	rules.Add = append(rules.Add, &tc.RulesData{
		Value: value,
		Tag:   tag,
	})
	// v := url.Values{}
	res, err := c.Api.PostFilterStreamRules(nil, rules)
	if err != nil {
		return nil, errors.New(err.Message)
	}

	return res, nil
}

// DeleteStreamRuls delete rules from a specific stream
func (c *V2Client) DeleteStreamRuls(ids []string) error {
	if len(ids) > 0 {
		rules := new(tc.Rules)
		rules.Delete = &tc.RulesDelete{
			Ids: ids,
		}

		_, err := c.Api.PostFilterStreamRules(nil, rules)
		if err != nil {
			return errors.New(err.Message)
		}
	}
	return nil
}

// Stream data using twitter v2 api
func (c *V2Client) Stream() (*tc.Stream, error) {
	v := url.Values{}
	v.Add("user.fields", "created_at,description,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified")
	v.Add("expansions", "author_id,in_reply_to_user_id")
	v.Add("tweet.fields", "created_at,id,lang,source,public_metrics")

	s, err := c.Api.GetFilterStream(v)
	if err != nil {
		return nil, errors.New(err.Message)
	}
	return s, nil
}

// Search data using twiiter v2 api
func (c *V2Client) Search() {}

// GetUsersBy retrieve user data using twitter v2 api
func (c *V2Client) GetUsersBy() {}
