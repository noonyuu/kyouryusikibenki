package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (db *Database) CreateWordList(word *WordList) error {
	collection := db.client.Database("words").Collection("word-list")
	_, err := collection.InsertOne(context.TODO(), word)
	return err
}

func (db *Database) GetWordList() ([]WordList, error) {
	collection := db.client.Database("words").Collection("word-list")

	// 論理削除されていないデータを取得するためのフィルタ
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "deleteAt", Value: bson.D{{Key: "$exists", Value: false}}}}}}

	// ランダムに20件取得するためのサンプルステージ
	sampleStage := bson.D{{Key: "$sample", Value: bson.D{{Key: "size", Value: 20}}}}

	// アグリゲーションパイプライン
	pipeline := mongo.Pipeline{matchStage, sampleStage}

	// パイプラインを使ってデータを取得
	cursor, err := collection.Aggregate(context.TODO(), pipeline)
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

    // 現在の日時を取得してDeleteAtに設定
    deleteAt := time.Now()
    update := bson.D{
        {Key: "$set", Value: bson.D{{Key: "deleteAt", Value: deleteAt}}},
    }

		// id := "66d5cb0f036921f3c63c7130"
    
    // IDをMongoDBのObjectID型に変換
    // objID, err := primitive.ObjectIDFromHex(id)
    // if err != nil {
    //     return err
    // }

    // 削除のためのフィルタ
    // filter := bson.D{{Key: "_id", Value: objID}}
		
    // 論理削除する対象をフィルタリング（削除済みでないもの）
    filter := bson.D{{Key: "deleteAt", Value: bson.D{{Key: "$exists", Value: false}}}}

    // ドキュメントを更新して論理削除
    result, err := collection.UpdateMany(context.TODO(), filter, update)
    if err != nil {
        return err
    }

    // 削除されたドキュメントの数をログに出力
    log.Printf("Deleted %d documents", result.ModifiedCount)

    return nil
}
