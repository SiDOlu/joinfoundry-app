package model

import (
	"time"

	"github.com/google/uuid"
)

type IdeaStatus string

const (
	IdeaStatusDraft     IdeaStatus = "DRAFT"
	IdeaStatusSubmitted IdeaStatus = "SUBMITTED"
)

type Idea struct {
	ID        uuid.UUID  `json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	Status    IdeaStatus `json:"status"`
}
