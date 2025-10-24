import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Favorites({ favorites, removeFromFavorites }) {
  function handleRemoveFavorite(movie) {
    if (window.confirm(`Remove ${movie.name} from favorites?`)) {
      removeFromFavorites(movie.id);
    }
  }

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-orange-900 dark:text-orange-300">
          My Favorite Movies
        </h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              Your favorites list is empty.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map(function(movie) {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddFavorite={function() {
                    handleRemoveFavorite(movie);
                  }}
                  buttonLabel="Remove from Favorites"
                  isFavorite={true}
                  confirmMessage=""
                  successMessage={`${movie.title} removed from favorites!`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;