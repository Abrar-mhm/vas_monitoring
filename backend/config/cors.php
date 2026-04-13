<?php

return [
    'paths' => ['api/*'], // Applique CORS uniquement sur les routes /api/*
    'allowed_methods' => ['*'], // Autorise toutes les méthodes : GET, POST, PUT, DELETE
    'allowed_origins' => ['http://localhost:5173'], // Autorise uniquement React à faire des requêtes
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Autorise l'envoi des tokens Sanctum
];