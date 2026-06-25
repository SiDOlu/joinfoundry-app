package repository

import (
	"context"
	"errors"
	"sync"

	"github.com/google/uuid"
	"github.com/joinfoundry/app/internal/model"
)

type IdeaRepository interface {
	Create(ctx context.Context, idea *model.Idea) error
	GetByID(ctx context.Context, id uuid.UUID) (*model.Idea, error)
	List(ctx context.Context) ([]*model.Idea, error)
}

// In-memory implementation for now (Mock)
type memoryIdeaRepository struct {
	mu    sync.RWMutex
	ideas map[uuid.UUID]*model.Idea
}

func NewMemoryIdeaRepository() IdeaRepository {
	return &memoryIdeaRepository{
		ideas: make(map[uuid.UUID]*model.Idea),
	}
}

func (r *memoryIdeaRepository) Create(ctx context.Context, idea *model.Idea) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.ideas[idea.ID] = idea
	return nil
}

func (r *memoryIdeaRepository) GetByID(ctx context.Context, id uuid.UUID) (*model.Idea, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	idea, ok := r.ideas[id]
	if !ok {
		return nil, errors.New("idea not found")
	}
	return idea, nil
}

func (r *memoryIdeaRepository) List(ctx context.Context) ([]*model.Idea, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	list := make([]*model.Idea, 0, len(r.ideas))
	for _, idea := range r.ideas {
		list = append(list, idea)
	}
	return list, nil
}
