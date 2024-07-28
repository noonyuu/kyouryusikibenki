package router

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/noonyuu/benki/back/db"
)

type PlantHandler struct {
	DB *db.Database
}

func NewPlant(database *db.Database) *mux.Router {
	handler := &PlantHandler{DB: database}
	router := mux.NewRouter()
	router.HandleFunc("/v1/plant", handler.GetPlant).Methods("GET")
	router.HandleFunc("/v1/plant/all", handler.GetPlants).Methods("GET")
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
	dateStr := r.URL.Query().Get("date")
	if dateStr == "" {
		http.Error(w, "Date query parameter is required", http.StatusBadRequest)
		return
	}

	date, err := time.Parse("2006-01-02T15:04:05Z", dateStr)
	if err != nil {
		http.Error(w, "Invalid date format", http.StatusBadRequest)
		return
	}

	plant, err := h.DB.GetPlant(date)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if plant == nil {
		http.Error(w, "No plant found for the given date", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(plant)
}

// 全件取得
func (h *PlantHandler) GetPlants(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetPlants")
	plants, err := h.DB.GetPlants()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(plants)
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

	// `day`フィールドを2006-01-02T15:04:05Zから2006-01-02形式に変換
	plant.Day = plant.Day.Truncate(24 * time.Hour)

	if err := h.DB.UpsertPlant(&plant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(plant)
}
