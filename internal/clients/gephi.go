package clients

import (
	"encoding/json"
	"fmt"
	"time"

	twitterwatchv1_pb "github.com/cvcio/rtaa-72/internal/proto/rtaa/streamer/twitter/v1"
	"go.uber.org/zap"
	"golang.org/x/net/websocket"
)

type GephiClient struct {
	ws  *websocket.Conn
	log *zap.SugaredLogger
}

func NewGephiClient(address string, workspace string, log *zap.SugaredLogger) (*GephiClient, error) {
	ws, err := websocket.Dial(fmt.Sprintf("ws://%s/%s", address, workspace), "", fmt.Sprintf("http://%s/", address))
	if err != nil {
		fmt.Printf("Dial failed: %s\n", err.Error())
		return nil, err
	}

	return &GephiClient{
		ws, log,
	}, nil
}
func (s *GephiClient) Close() {
	s.ws.Close()
}
func (s *GephiClient) Broadcast(in *twitterwatchv1_pb.StreamResponse) {
	for _, t := range in.Tweets {
		node := &Node{
			Id:        t.Id,
			Type:      "TWEET",
			Label:     t.UserName,
			CreatedAt: t.CreatedAt.AsTime().String(),
			Data:      t.String(),
		}
		if len(t.Prediction) > 0 {
			node.Class = t.Prediction[0].Label
			node.Score = t.Prediction[0].Score
		}
		if err := websocket.Message.Send(s.ws, node.AddTX()); err != nil {
			s.log.Error(err)
		}
	}
	for _, t := range in.Accounts {
		node := &Node{
			Id:        t.Id,
			Type:      "ACCOUNT",
			Label:     t.UserName,
			CreatedAt: t.CreatedAt.AsTime().String(),
			Class:     t.Prediction.Label,
			Score:     t.Prediction.Score,
			Data:      t.String(),
		}
		if err := websocket.Message.Send(s.ws, node.AddTX()); err != nil {
			s.log.Error(err)
		}
	}

	for _, t := range in.Relationships {
		edge := &Edge{
			Source: t.Source,
			Target: t.Target,
			Label:  t.Label,
		}
		if err := websocket.Message.Send(s.ws, edge.AddTX()); err != nil {
			s.log.Error(err)
		}
	}
}

type Node struct {
	Id        string      `json:"id"`
	Label     string      `json:"label"`
	CreatedAt string      `json:"created_at,omitempty"`
	Type      string      `json:"type,omitempty"`
	Class     string      `json:"class,omitempty"`
	Score     float32     `json:"score,omitempty"`
	Data      interface{} `json:"data,omitempty"`
}

func (n *Node) AddTX() string {
	str, _ := json.Marshal(n)
	return fmt.Sprintf(`{ "an": { %s: %s } }`, n.Id, string(str))
}

type Edge struct {
	Source   string  `json:"source"`
	Target   string  `json:"target"`
	Label    string  `json:"label,omitempty"`
	Interval string  `json:"interval,omitempty"`
	Weight   float64 `json:"weight,omitempty"`
}

func (e *Edge) AddTX() string {
	return fmt.Sprintf(`{ "ae": { %d: { "source": %s, "target": %s, "directed": true, "label": "%s", "interval": "%s" } } }`, time.Now().UnixNano(), e.Source, e.Target, e.Label, e.Interval)
}
