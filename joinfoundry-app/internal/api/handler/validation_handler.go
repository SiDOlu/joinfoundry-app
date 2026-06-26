package handler

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/joinfoundry/app/internal/service/validation"
)

type ValidationHandler struct {
	service validation.ValidationService
}

type IdeaSubmission struct {
	ProblemStatement string `json:"problem_statement"`
	Context          string `json:"context,omitempty"`
}

func NewValidationHandler(s validation.ValidationService) *ValidationHandler {
	return &ValidationHandler{service: s}
}

func (h *ValidationHandler) ValidateIdea(w http.ResponseWriter, r *http.Request) {
	var sub IdeaSubmission
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// For now, create a dummy idea ID since we don't have Idea persistence yet
	ideaID := uuid.New()

	report, err := h.service.ValidateIdea(r.Context(), ideaID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(report)
}
