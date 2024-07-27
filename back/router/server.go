package router

import (
	"log"
	"net/http"

	"github.com/noonyuu/benki/back/db"
)

func Server(database *db.Database) {

	router := NewWordList(database)
	go func() {
		log.Println("Server is running on port 8080")
		if err := http.ListenAndServe(":8080", router); err != nil {
			log.Fatal(err)
		}
	}()
}
