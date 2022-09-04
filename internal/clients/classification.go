package clients

import (
	"context"
	"time"

	"github.com/ChimeraCoder/anaconda"
	accountsv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/classification/accounts/v1"
	commentsv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/classification/comments/v1"
	commonv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/classification/common/v1"
	twitterwatchv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/streamer/twitter/v1"
	"go.uber.org/zap"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// ClassificationClient
type ClassificationClient struct {
	accountClassification accountsv1_pb.AccountServiceClient
	commentClassification commentsv1_pb.CommentServiceClient
	log                   *zap.SugaredLogger
}

// NewStreamService returns a new stream gRPC service
func NewClassificationClient(ctx context.Context,
	log *zap.SugaredLogger,
	accountClassification accountsv1_pb.AccountServiceClient, commentClassification commentsv1_pb.CommentServiceClient,
) *ClassificationClient {
	return &ClassificationClient{
		log:                   log,
		accountClassification: accountClassification,
		commentClassification: commentClassification,
	}
}

func (s *ClassificationClient) Close() {}

// Consume messages from twitter listener
func (s *ClassificationClient) ConsumeV1(in chan anaconda.Tweet, out chan twitterwatchv1_pb.StreamResponse, active bool) {
	for t := range in {
		// create the response object
		res := twitterwatchv1_pb.StreamResponse{}
		// add the accounts
		res.Accounts = append(res.Accounts, s.GetAccounts(t)...)
		// add the tweets
		res.Tweets = append(res.Tweets, s.GetTweets(t)...)
		// add media elements
		res.Media = append(res.Media, s.GetMedia(t)...)

		// add relationships elements
		res.Relationships = s.GetRelationships(t)

		if active {
			// range over accounts and classify
			for _, a := range res.Accounts {
				// assign prediction to account
				a.Prediction = s.ClassifyTwitterAccount(a)
			}

			// range over tweets and classify
			for _, a := range res.Tweets {
				// assign prediction to account
				a.Prediction = s.ClassifyToxic(a)
			}
		}
		// send to out channel
		out <- res
	}
}

// Classify a single account
func (s *ClassificationClient) ClassifyTwitterAccount(a *twitterwatchv1_pb.Account) *commonv1_pb.Prediction {
	c, err := s.accountClassification.ClassifyTwitterAccount(context.Background(), &accountsv1_pb.TwitterAccount{
		Followers:      a.Followers,
		Following:      a.Following,
		Tweets:         a.Tweets,
		Favorites:      a.Favorites,
		Listed:         a.Listed,
		DefaultProfile: a.DefaultProfile,
		Verified:       a.Verified,
		CreatedAt:      a.CreatedAt,
	})

	if err != nil {
		s.log.Errorf("error while classifing user (%s): %s", a.UserName, err.Error())
		return nil
	}

	return c.Predictions[0]
}

// Classify a single comment
func (s *ClassificationClient) ClassifyToxic(a *twitterwatchv1_pb.Tweet) []*commonv1_pb.Prediction {
	c, err := s.commentClassification.ClassifyToxic(context.Background(), &commentsv1_pb.Comment{
		Text: a.Text,
		Meta: &commonv1_pb.Meta{
			Lang: a.Lang,
		},
	})

	if err != nil {
		s.log.Errorf("error while classifing user (%s): %s", a.Text, err.Error())
		return nil
	}

	return c.Predictions
}

// GetAccounts from tweet object
func (s *ClassificationClient) GetAccounts(t anaconda.Tweet) []*twitterwatchv1_pb.Account {
	var accounts []*twitterwatchv1_pb.Account

	// quoted user object
	if t.QuotedStatus != nil {
		accounts = append(accounts, s.GetAccounts(*t.QuotedStatus)...)
	}

	// retweeted user object
	if t.RetweetedStatus != nil {
		accounts = append(accounts, s.GetAccounts(*t.RetweetedStatus)...)
	}

	// tweet user object
	createdAtA, _ := time.Parse(time.RubyDate, t.User.CreatedAt)
	a := twitterwatchv1_pb.Account{
		Followers:        int64(t.User.FollowersCount),
		Following:        int64(t.User.FriendsCount),
		Tweets:           t.User.StatusesCount,
		Favorites:        int64(t.User.FavouritesCount),
		Listed:           t.User.ListedCount,
		DefaultProfile:   t.User.DefaultProfileImage,
		Verified:         t.User.Verified,
		CreatedAt:        timestamppb.New(createdAtA.UTC()),
		Id:               t.User.IdStr,
		UserName:         t.User.ScreenName,
		Name:             t.User.Name,
		ProfileImageUrl:  t.User.ProfileImageUrlHttps,
		ProfileBannerUrl: t.User.ProfileBannerURL,
		Srource:          t.Source,
	}

	accounts = append(accounts, &a)
	return accounts
}

// GetTweets from tweet object
func (s *ClassificationClient) GetTweets(t anaconda.Tweet) []*twitterwatchv1_pb.Tweet {
	var tweets []*twitterwatchv1_pb.Tweet
	author := t.User.ScreenName
	typeof := "TWEET"
	if t.InReplyToStatusIdStr != "" {
		typeof = "REPLY"
	}
	if t.QuotedStatus != nil {
		typeof = "QUOTE"
		author = t.QuotedStatus.User.ScreenName
		tweets = append(tweets, s.GetTweets(*t.QuotedStatus)...)
	}
	if t.RetweetedStatus != nil {
		typeof = "RETWEET"
		author = t.RetweetedStatus.User.ScreenName
		tweets = append(tweets, s.GetTweets(*t.RetweetedStatus)...)
	}
	var hashtags []string
	for _, h := range t.Entities.Hashtags {
		hashtags = append(hashtags, h.Text)
	}
	createdAtA, _ := time.Parse(time.RubyDate, t.CreatedAt)
	a := twitterwatchv1_pb.Tweet{
		Id:        t.IdStr,
		Text:      t.FullText,
		TypeOf:    typeof,
		Retweets:  int64(t.RetweetCount),
		Favorites: int64(t.FavoriteCount),
		Source:    t.Source,
		Hashtags:  hashtags,
		CreatedAt: timestamppb.New(createdAtA.UTC()),
		Author:    author,
		UserName:  t.User.ScreenName,
		Lang:      t.Lang,
	}
	tweets = append(tweets, &a)
	return tweets
}

func (s *ClassificationClient) GetMedia(t anaconda.Tweet) []*twitterwatchv1_pb.Media {
	var media []*twitterwatchv1_pb.Media
	for _, v := range t.Entities.Media {
		media = append(media, &twitterwatchv1_pb.Media{
			Id:            v.Id_str,
			DisplayUrl:    v.Display_url,
			MediaUrlHttps: v.Media_url_https,
			Type:          v.Type,
		})
	}
	return media
}

func (s *ClassificationClient) GetRelationships(t anaconda.Tweet) []*twitterwatchv1_pb.Relationship {
	var relationships []*twitterwatchv1_pb.Relationship // append(res.Media, s.GetMedia(t))
	relationships = append(relationships, &twitterwatchv1_pb.Relationship{
		Source: t.IdStr,
		Target: t.User.IdStr,
		Label:  "TWEET_OF",
	})
	if t.InReplyToStatusIdStr != "" {
		relationships = append(relationships, &twitterwatchv1_pb.Relationship{
			Source: t.User.IdStr,
			Target: t.InReplyToUserIdStr,
			Label:  "IN_REPLY_TO_ACCOUNT",
		})
		relationships = append(relationships, &twitterwatchv1_pb.Relationship{
			Source: t.IdStr,
			Target: t.InReplyToStatusIdStr,
			Label:  "REPLY_OF",
		})
	}
	if t.QuotedStatus != nil {
		relationships = append(relationships, &twitterwatchv1_pb.Relationship{
			Source: t.User.IdStr,
			Target: t.QuotedStatus.User.IdStr,
			Label:  "QUOTED_ACCOUNT",
		})
		relationships = append(relationships, &twitterwatchv1_pb.Relationship{
			Source: t.User.IdStr,
			Target: t.QuotedStatusIdStr,
			Label:  "QUOTE_OF",
		})
	}
	if t.RetweetedStatus != nil {
		relationships = append(relationships, &twitterwatchv1_pb.Relationship{
			Source: t.User.IdStr,
			Target: t.RetweetedStatus.User.IdStr,
			Label:  "RETWEETED_ACCOUNT",
		})
		relationships = append(relationships, &twitterwatchv1_pb.Relationship{
			Source: t.User.IdStr,
			Target: t.RetweetedStatus.IdStr,
			Label:  "RETWEET_OF",
		})
	}
	return relationships
}
