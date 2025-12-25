package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	// Setup static file server
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Template handler
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Handle favicon.ico request
		if r.URL.Path == "/favicon.ico" {
			http.ServeFile(w, r, "./static/image/favicon.ico")
			return
		}
		
		// Only handle root path
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}

		tmplPath := filepath.Join("templates", "index.html")
		tmpl, err := template.ParseFiles(tmplPath)
		if err != nil {
			log.Printf("Template error: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		
		if err := tmpl.Execute(w, nil); err != nil {
			log.Printf("Template execution error: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})

	// Get port from environment variable (Railway akan set ini)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default untuk local development
	}

	addr := ":" + port
	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📁 Static files from: ./static")
	log.Printf("📄 Templates from: ./templates")
	
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal("Server error:", err)
	}
}