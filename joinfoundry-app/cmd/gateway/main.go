package main

import (
	"log"
	"net/http"

	"github.com/joinfoundry/app/internal/api/router"
	"github.com/joinfoundry/app/internal/config"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize router
	r := router.NewRouter()

	// Start server
	log.Printf("Starting server on port %s", cfg.Server.Port)
	if err := http.ListenAndServe(":"+cfg.Server.Port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
