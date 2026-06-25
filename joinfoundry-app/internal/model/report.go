package model

import (
	"time"

	"github.com/google/uuid"
)

type StageName string

const (
	StageProblemSolutionFit      StageName = "PROBLEM_SOLUTION_FIT"
	StageMarketValueFit          StageName = "MARKET_VALUE_FIT"
	StageTechnicalOperationalFit StageName = "TECHNICAL_OPERATIONAL_FIT"
	StageStrategicAlignment      StageName = "STRATEGIC_ALIGNMENT"
)

type ValidationResult string

const (
	ValidationResultPass     ValidationResult = "PASS"
	ValidationResultFail     ValidationResult = "FAIL"
	ValidationResultFatal    ValidationResult = "FATAL"
	ValidationResultInReview ValidationResult = "IN_REVIEW"
)

type StageResult struct {
	Stage       StageName        `json:"stage"`
	Result      ValidationResult `json:"result"`
	Findings    string           `json:"findings"`
	Notes       string           `json:"notes"`
	CompletedAt time.Time        `json:"completed_at"`
}

type ValidationReport struct {
	ID            uuid.UUID        `json:"id"`
	IdeaID        uuid.UUID        `json:"idea_id"`
	OverallStatus ValidationResult `json:"overall_status"`
	Stages        []StageResult    `json:"stages"`
	CreatedAt     time.Time        `json:"created_at"`
	UpdatedAt     time.Time        `json:"updated_at"`
}
