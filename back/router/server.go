package router

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/noonyuu/benki/back/db"
)

func Server(database *db.Database) {
	mainRouter := mux.NewRouter()

	// 各サブルータを作成し、メインルータにマウントします
	wordListRouter := NewWordList(database)
	plantRouter := NewPlant(database)

	mainRouter.PathPrefix("/v1/word-list").Handler(wordListRouter)
	mainRouter.PathPrefix("/v1/plant").Handler(plantRouter)

	go func() {
		log.Println("Server is running on port 8080")
		if err := http.ListenAndServe(":8080", mainRouter); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()
}

