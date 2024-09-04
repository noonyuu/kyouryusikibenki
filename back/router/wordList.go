package router

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/noonyuu/benki/back/db"
)

type WordListHandler struct {
	DB *db.Database
}

func NewWordList(database *db.Database) *mux.Router {
	handler := &WordListHandler{DB: database}
	router := mux.NewRouter()
	router.HandleFunc("/v1/word-list", handler.CreateWordList).Methods("POST")
	router.HandleFunc("/v1/word-list/all", handler.GetAllWordList).Methods("GET")
	router.HandleFunc("/v1/word-list", handler.GetWordList).Methods("GET")
	router.HandleFunc("/v1/word-list", handler.DeleteWordList).Methods("DELETE")

	return router
}

func (h *WordListHandler) CreateWordList(w http.ResponseWriter, r *http.Request) {
	// ヘッダーにkeyが存在するかを確認
	key := r.Header.Get("key")
	if key != os.Getenv("key") {
		http.Error(w, "Forbidden: Missing testkey", http.StatusForbidden)
		return
	}

	var wordList db.WordList
	if err := json.NewDecoder(r.Body).Decode(&wordList); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.DB.CreateWordList(&wordList); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(wordList)
}

func (h *WordListHandler) GetWordList(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetWordList")
	wordList, err := h.DB.GetWordList()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(wordList)
}

func (h *WordListHandler) GetAllWordList(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetWordList")
	wordList, err := h.DB.GetAllWordList()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(wordList)
}

func (h *WordListHandler) DeleteWordList(w http.ResponseWriter, r *http.Request) {
	// ヘッダーにkeyが存在するかを確認
	key := r.Header.Get("key")
	if key != os.Getenv("key") {
		http.Error(w, "Forbidden: Missing testkey", http.StatusForbidden)
		return
	}
	if err := h.DB.DeleteWordList(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
