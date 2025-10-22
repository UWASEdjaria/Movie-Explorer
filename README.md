# React Movie Explorer

A React SPA to explore, search, filter, and favorite movies. Built with Vite + Tailwind CSS with dark/light mode support.

# Features

View movie details

Search movies by name

Filter by category/genre

Add movies to favorites (saved in localStorage)

Routing between pages using React Router

Responsive design with dark/light mode

# Pages & Structure
src/
├── pages/
│   ├── Home.jsx             # Movie list and search
│   ├── MovieDetails.jsx     # Single movie details
│   └── Favorites.jsx        # Favorite movies
│
├── components/
│   ├── MovieCard.jsx        # Movie display card
│   ├── Navbar.jsx           # Navigation bar
│   ├── SearchBar.jsx        # Search input
│   └── CategoryFilter.jsx   # Filter by genre
│
├── hooks/
│   ├── useFetchMovies.js    # Custom hook for fetching movies
│   └── useFavorites.js      # Hook to manage favorites with localStorage
│
├── utils/
│   └── api.js               # API calls and helper functions
│
├── App.jsx                  # Routes & layout
└── main.jsx                 # Entry point

# Installation
git clone <repo-url>
cd movie-explorer
npm install
npm run dev

Usage

Open http://localhost:5173 (Vite default)

Browse movies on Home page

Search or filter movies by category

Click Add to Favorites to save movies

Toggle dark/light mode using the navbar

# Technologies

React + JSX

React Router

Tailwind CSS (with dark mode)

JavaScript (ES6+)

TVMaze API for movie data
Live Demo

[]