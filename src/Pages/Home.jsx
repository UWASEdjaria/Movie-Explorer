import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function Home({ addToFavorites, favorites }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies from the API
  useEffect(function() {
    async function fetchMovies() {
      try {
     
        const response = await fetch('https://api.tvmaze.com/shows');
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        // Transform the data to match our needs
        const formattedMovies = data.map(function(show) {
          return {
            id: show.id,
            name: show.name,
            image: show.image?.medium,
            summary: show.summary,
            rating: show.rating?.average,
            genres: show.genres
          };
        });
        
        setMovies(formattedMovies);
        setError(null);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  function handleAddToFavorites(movie) {
    addToFavorites(movie);
  }

  // Update filtered movies when search query or movies change
  useEffect(() => {
    const filtered = movies.filter(movie => 
      movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some(genre => 
        genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-center">
          <p className="mb-4 text-lg text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white transition-colors rounded bg-amber-600 hover:bg-amber-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Popular Movies & TV Shows</h1>
      
      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies or genres..."
            className="w-full px-4 py-3 pl-12 pr-10 text-white rounded-lg bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-300"
          />
          <div className="absolute transform -translate-y-1/2 left-3 top-1/2 text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute transform -translate-y-1/2 right-3 top-1/2 text-amber-300 hover:text-white"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {(searchQuery ? filteredMovies : movies).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddFavorite={() => handleAddToFavorites(movie)}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
          />
        ))}
        {searchQuery && filteredMovies.length === 0 && (
          <div className="py-8 text-center col-span-full">
            <p className="text-gray-600 dark:text-gray-400">No movies found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;