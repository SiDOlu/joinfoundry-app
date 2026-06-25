package adversarial

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/joinfoundry/app/internal/model"
)

type AdversarialEngine interface {
	AnalyzeIdea(ctx context.Context, idea *model.Idea) (*model.ValidationReport, error)
}

type mockAdversarialEngine struct{}

func NewAdversarialEngine() AdversarialEngine {
	return &mockAdversarialEngine{}
}

func (e *mockAdversarialEngine) AnalyzeIdea(ctx context.Context, idea *model.Idea) (*model.ValidationReport, error) {
	return &model.ValidationReport{
		ID:            uuid.New(),
		IdeaID:        idea.ID,
		OverallStatus: model.ValidationResultPass,
		CreatedAt:     time.Now(),
	}, nil
}
