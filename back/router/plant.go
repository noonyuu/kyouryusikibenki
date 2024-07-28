package router

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/noonyuu/benki/back/db"
)

type PlantHandler struct {
	DB *db.Database
}

func NewPlant(database *db.Database) *mux.Router {
	handler := &PlantHandler{DB: database}
	router := mux.NewRouter()
	// router.HandleFunc("/v1/plant", handler.CreatePlant).Methods("POST")
	router.HandleFunc("/v1/plant", handler.GetPlant).Methods("GET")
	router.HandleFunc("/v1/plant", handler.DeletePlant).Methods("DELETE")
	router.HandleFunc("/v1/plant", handler.UpsertPlant).Methods("POST")

	return router
}

func (h *PlantHandler) CreatePlant(w http.ResponseWriter, r *http.Request) {
	// ヘッダーにkeyが存在するかを確認
	key := r.Header.Get("key")
	if key != os.Getenv("key") {
		http.Error(w, "Forbidden: Missing testkey", http.StatusForbidden)
		return
	}

	var plant db.Plant
	if err := json.NewDecoder(r.Body).Decode(&plant); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.DB.CreatePlant(&plant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(plant)
}

func (h *PlantHandler) GetPlant(w http.ResponseWriter, r *http.Request) {
	plant, err := h.DB.GetPlant()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(plant)
}

func (h *PlantHandler) DeletePlant(w http.ResponseWriter, r *http.Request) {
	// ヘッダーにkeyが存在するかを確認
	key := r.Header.Get("key")
	if key != os.Getenv("key") {
		http.Error(w, "Forbidden: Missing testkey", http.StatusForbidden)
		return
	}
	if err := h.DB.DeletePlant(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *PlantHandler) UpsertPlant(w http.ResponseWriter, r *http.Request) {
	// ヘッダーにkeyが存在するかを確認
	key := r.Header.Get("key")
	if key != os.Getenv("key") {
		http.Error(w, "Forbidden: Missing testkey", http.StatusForbidden)
		return
	}

	var plant db.Plant
	if err := json.NewDecoder(r.Body).Decode(&plant); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.DB.UpsertPlant(&plant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(plant)
}
