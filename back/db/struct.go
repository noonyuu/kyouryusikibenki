package db

import (
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

type Database struct {
	client *mongo.Client
}

type WordList struct {
	ID       string    `bson:"_id,omitempty"`
	Word     string    `bson:"word"`
	Day      time.Time `bson:"day"`
	DeleteAt time.Time `bson:"deleteAt,omitempty"`
}

type DaySum struct {
	ID    string `bson:"_id,omitempty"`
	Count int    `bson:"count"`
	Path  string `bson:"path"`
}

type WordRank struct {
	ID   string    `bson:"_id,omitempty"`
	Day  time.Time `bson:"day"`
	Rank []string  `bson:"rank"`
}

type Plant struct {
	ID       string    `bson:"_id,omitempty"`
	ImageKey string    `bson:"imageKey"`
	Day      time.Time `bson:"day"`
}

type Analysis struct {
	ID        string    `bson:"_id,omitempty"`
	Comment   string    `bson:"comment"`
	CreatedAt time.Time `bson:"createdAt"`
}
