package db

import (
	"context"
	"time"

	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	// ErrNotFound abstracts the  not found error.
	ErrNotFound = errors.New("document not found")

	// ErrInvalidID occurs when an ID is not in a valid form.
	ErrInvalidID = errors.New("ID is not in its proper form")

	// ErrAuthenticationFailure occurs when a user attempts to authenticate but
	// anything goes wrong.
	ErrAuthenticationFailure = errors.New("authentication failed")

	// ErrForbidden occurs when a user tries to do something that is forbidden to them according to our access control policies.
	ErrForbidden = errors.New("attempted action is not allowed")

	// ErrInvalid is a generic error
	ErrInvalid = errors.New("invalid request")

	// ErrInvalidDBProvided wrong database
	ErrInvalidDBProvided = errors.New("invalid DB provided")

	// ErrConnectionFailed connection error
	ErrConnectionFailed = errors.New("connection failed")
)

// MongoDB client struct.
type MongoDB struct {
	Database string
	Client   *mongo.Client
	Context  context.Context
}

// NewMongoDB returns a new mongodb client.
func NewMongoDB(uri, database string, timeout time.Duration) (*MongoDB, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	clientOpts := &options.ClientOptions{
		ConnectTimeout: &timeout,
	}

	client, err := mongo.Connect(ctx, clientOpts.ApplyURI(uri))
	if err != nil {
		return nil, errors.Wrap(ErrConnectionFailed, err.Error())
	}

	// Call Ping to verify that the deployment is up and the Client was configured successfully.
	// As mentioned in the Ping documentation, this reduces application resiliency as the server may be
	// temporarily unavailable when Ping is called.
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return nil, errors.Wrap(ErrConnectionFailed, err.Error())
	}

	return &MongoDB{
		Client:   client,
		Database: database,
		Context:  ctx,
	}, nil
}

// Close closes the database connection.
func (db *MongoDB) Close() error {
	return db.Client.Disconnect(db.Context)
}

// Copy returns a copy of the database.
func (db *MongoDB) Copy() *mongo.Database {
	return db.Client.Database(db.Database)
}

// Execute executes database queries.
func (db *MongoDB) Execute(ctx context.Context, collName string, f func(*mongo.Collection) error) error {
	return f(db.Client.Database(db.Database).Collection(collName))
}
