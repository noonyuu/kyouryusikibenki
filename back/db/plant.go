package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (db *Database) CreatePlant(plant *Plant) error {
	collection := db.client.Database("plants").Collection("plant")
	_, err := collection.InsertOne(context.TODO(), plant)
	return err
}

func (db *Database) GetPlant(date time.Time) (*Plant, error) {
	collection := db.client.Database("plants").Collection("plant")

	// 日付の範囲を設定（1日のみを対象）
	startOfDay := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.UTC)
	endOfDay := startOfDay.Add(24 * time.Hour)

	filter := bson.M{
		"day": bson.M{
			"$gte": startOfDay,
			"$lt":  endOfDay,
		},
	}

	var plant Plant
	err := collection.FindOne(context.TODO(), filter).Decode(&plant)
	if err == mongo.ErrNoDocuments {
		return nil, nil // 該当するドキュメントがない場合
	} else if err != nil {
		return nil, err
	}

	return &plant, nil
}

func (db *Database) GetPlants() ([]Plant, error) {
	collection := db.client.Database("plants").Collection("plant")

	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var plants []Plant

	for cursor.Next(context.Background()) {
		var plant Plant
		if err := cursor.Decode(&plant); err != nil {
			return nil, err
		}
		plants = append(plants, plant)
	}

	return plants, nil
}

func (db *Database) UpdatePlant(plant *Plant) error {
	collection := db.client.Database("plants").Collection("plant")
	_, err := collection.UpdateOne(context.TODO(), bson.D{}, bson.M{"$set": plant})
	return err
}

// 削除
func (db *Database) DeletePlant() error {
	collection := db.client.Database("plants").Collection("plant")
	_, err := collection.DeleteOne(context.TODO(), bson.D{})
	return err
}

func (db *Database) UpsertPlant(plant *Plant) error {
	collection := db.client.Database("plants").Collection("plant")

	// 指定日の0時0分0秒と23時59分59秒を取得
	startOfDay := time.Date(plant.Day.Year(), plant.Day.Month(), plant.Day.Day(), 0, 0, 0, 0, plant.Day.Location())
	endOfDay := time.Date(plant.Day.Year(), plant.Day.Month(), plant.Day.Day(), 23, 59, 59, 999999999, plant.Day.Location())

	// Upsertのためのフィルタ条件を作成
	filter := bson.D{
		{Key: "day", Value: bson.D{
			{Key: "$gte", Value: startOfDay},
			{Key: "$lt", Value: endOfDay},
		}},
	}

	// UpdateまたはInsertのための更新内容を作成
	update := bson.M{
		"$set": plant,
	}

	// Upsertオプションを有効にする
	opts := options.Update().SetUpsert(true)

	// 更新または挿入操作を実行
	_, err := collection.UpdateOne(context.TODO(), filter, update, opts)
	return err
}
