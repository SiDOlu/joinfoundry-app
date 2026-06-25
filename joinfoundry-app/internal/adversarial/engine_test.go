package adversarial

import (
	"context"
	"testing"

	"github.com/joinfoundry/app/internal/model"
)

func TestAnalyzeIdea(t *testing.T) {
	engine := NewAdversarialEngine()
	idea := &model.Idea{
		Title:       "Test Idea",
		Description: "A test description",
	}

	report, err := engine.AnalyzeIdea(context.Background(), idea)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if report == nil {
		t.Fatal("expected report, got nil")
	}

	if report.OverallStatus != model.ValidationResultPass {
		t.Errorf("expected status PASS, got %v", report.OverallStatus)
	}
}
