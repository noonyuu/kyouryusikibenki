package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
)

func (db *Database) CreateWordList(word *WordList) error {
	collection := db.client.Database("words").Collection("word-list")
	_, err := collection.InsertOne(context.TODO(), word)
	return err
}

func (db *Database) GetWordList() ([]WordList, error) {
	collection := db.client.Database("words").Collection("word-list")
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var words []WordList
	for cursor.Next(context.TODO()) {
		var word WordList
		if err := cursor.Decode(&word); err != nil {
			return nil, err
		}
		words = append(words, word)
	}
	return words, nil
}
