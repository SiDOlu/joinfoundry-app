package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/joinfoundry/app/internal/model"
	"github.com/joinfoundry/app/internal/repository"
)

type IdeaHandler struct {
	repo repository.IdeaRepository
}

func NewIdeaHandler(r repository.IdeaRepository) *IdeaHandler {
	return &IdeaHandler{repo: r}
}

func (h *IdeaHandler) CreateIdea(w http.ResponseWriter, r *http.Request) {
	var idea model.Idea
	if err := json.NewDecoder(r.Body).Decode(&idea); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	idea.ID = uuid.New()
	idea.CreatedAt = time.Now()
	idea.Status = model.IdeaStatusDraft

	if err := h.repo.Create(r.Context(), &idea); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(idea)
}

func (h *IdeaHandler) ListIdeas(w http.ResponseWriter, r *http.Request) {
	ideas, err := h.repo.List(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ideas)
}
