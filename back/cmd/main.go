package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/noonyuu/benki/back/db"
	"github.com/noonyuu/benki/back/router"
)

func loadEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Panicln("読み込み出来ませんでした: %v", err)
	}
}

func main() {
	loadEnv()
	fmt.Println("Hello, World!")
	// データベース接続
	database, err := db.Connect(os.Getenv("DB_URI"))
	if err != nil {
		log.Fatal(err)
	}
	defer database.Disconnect()

	router.Server(database)

	// サーバーの終了を待機する
	select {}
}
