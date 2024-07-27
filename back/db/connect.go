package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect(uri string) (*Database, error) {
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}
	return &Database{client: client}, nil
}

func (db *Database) Disconnect() {
	if err := db.client.Disconnect(context.TODO()); err != nil {
		log.Printf("Error disconnecting from MongoDB: %v", err)
	}
}
