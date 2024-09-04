package router

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/noonyuu/benki/back/db"
)

type AnalysisHandler struct {
	DB *db.Database
}

func NewAnalysis(database *db.Database) *mux.Router {
	handler := &AnalysisHandler{DB: database}
	router := mux.NewRouter()
	router.HandleFunc("/v1/analysis", handler.CreateAnalysis).Methods("POST")
	router.HandleFunc("/v1/analysis", handler.GetAnalysis).Methods("GET")

	return router
}

func (h *AnalysisHandler) CreateAnalysis(w http.ResponseWriter, r *http.Request) {
	// ヘッダーにkeyが存在するかを確認
	key := r.Header.Get("key")
	if key != os.Getenv("key") {
		http.Error(w, "Forbidden: Missing testkey", http.StatusForbidden)
		return
	}

	var analysis db.Analysis
	if err := json.NewDecoder(r.Body).Decode(&analysis); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// 現在の日時を設定
	analysis.CreatedAt = time.Now()

	if err := h.DB.CreateAnalysis(&analysis); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(analysis)
}

func (h *AnalysisHandler) GetAnalysis(w http.ResponseWriter, r *http.Request) {
	analysis, err := h.DB.GetAnalysis()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(analysis)
}
