package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (db *Database) CreateWordList(word *WordList) error {
	collection := db.client.Database("words").Collection("word-list")
	_, err := collection.InsertOne(context.TODO(), word)
	return err
}

func (db *Database) GetWordList() ([]WordList, error) {
	collection := db.client.Database("words").Collection("word-list")

	// 論理削除されていないデータを取得するためのフィルタ
	filter := bson.D{{"deleteAt", bson.D{{"$exists", false}}}}

	// FindOptionsで取得件数の制限を設定
	findOptions := options.Find().SetLimit(20)

	// フィルタとオプションを使用してデータを取得
	cursor, err := collection.Find(context.TODO(), filter, findOptions)
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
	// Cursorが完了した後にエラーが発生していないか確認
	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return words, nil
}

// 削除
func (db *Database) DeleteWordList() error {
	collection := db.client.Database("words").Collection("word-list")
	// 現在の日時を取得
	deleteAt := time.Now()
	// 論理削除のためのフィルタ
	filter := bson.D{{"deleteAt", bson.D{{"$exists", false}}}}

	update := bson.D{
		{Key: "$set", Value: bson.D{{"deleteAt", deleteAt}}},
	}
	_, err := collection.UpdateMany(context.TODO(), filter, update)
	return err
}
