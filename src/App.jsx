import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Favorites from "./Pages/Favorites";
import CategoryFilter from "./components/CategoryFilter";
import Navbar from "./components/Navbar";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme and favorites from localStorage on initial render
  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save favorites to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(movie) {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);
      if (!isAlreadyFavorite) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  }

  function removeFromFavorites(movieId) {
    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => movie.id !== movieId)
    );
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  addToFavorites={addToFavorites} 
                  favorites={favorites}
                  isDarkMode={isDarkMode}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites} 
                  removeFromFavorites={removeFromFavorites} 
                />
              } 
            />
            <Route 
              path="/movie/:id" 
              element={
                <MovieDetails 
                  favorites={favorites}
                  onToggleFavorite={(movie) => {
                    const isFavorite = favorites.some(fav => fav.id === movie.id);
                    if (isFavorite) {
                      removeFromFavorites(movie.id);
                    } else {
                      addToFavorites(movie);
                    }
                  }}
                />
              } 
            />
            <Route 
              path="/category/:category" 
              element={
                <CategoryFilter 
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;