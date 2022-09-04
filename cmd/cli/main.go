package main

import (
	"log"
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:    "rtaa-72",
		Version: "1.0.0",
		Usage:   "Collect, classify, store and visuzalise data from Twitter.",
		Action: func(*cli.Context) error {
			return nil
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
