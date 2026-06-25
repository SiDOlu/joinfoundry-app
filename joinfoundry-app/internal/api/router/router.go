package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joinfoundry/app/internal/api/handler"
	"github.com/joinfoundry/app/internal/adversarial"
	"github.com/joinfoundry/app/internal/repository"
	"github.com/joinfoundry/app/internal/service/validation"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Dependencies
	advEngine := adversarial.NewAdversarialEngine()
	valService := validation.NewValidationService(advEngine)
	valHandler := handler.NewValidationHandler(valService)
	
	ideaRepo := repository.NewMemoryIdeaRepository()
	ideaHandler := handler.NewIdeaHandler(ideaRepo)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	r.Post("/validate", valHandler.ValidateIdea)
	
	r.Route("/ideas", func(r chi.Router) {
		r.Post("/", ideaHandler.CreateIdea)
		r.Get("/", ideaHandler.ListIdeas)
	})

	return r
}
