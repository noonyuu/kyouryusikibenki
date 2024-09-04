package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
)

func (db *Database) CreateAnalysis(analysis *Analysis) error {
	collection := db.client.Database("words").Collection("analysis")
	_, err := collection.InsertOne(context.TODO(), analysis)
	return err
}

func (db *Database) GetAnalysis() ([]Analysis, error) {
	collection := db.client.Database("words").Collection("analysis")
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var analysis []Analysis
	for cursor.Next(context.TODO()) {
		var a Analysis
		if err := cursor.Decode(&a); err != nil {
			return nil, err
		}
		analysis = append(analysis, a)
	}
	return analysis, nil
}
