import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, onAddFavorite, isFavorite }) {
  return (
    <div className="p-4 text-center transition-colors duration-200 bg-white border rounded-lg shadow-lg border-g dark:bg-gray-800">
      <img
        src={movie.image}
        alt={movie.name}
        className="object-cover w-full mb-4 rounded-lg h-80"
      />
      <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{movie.name}</h2>
      <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">{movie.genres?.join(", ")}</p>
      <p className="mb-2 text-sm">⭐ {movie.rating || "N/A"}</p>

      <div className="flex flex-col mt-3 space-y-2">
        <Link
          to={`/movie/${movie.id}`}
          className="px-4 py-2 text-center text-white transition-colors bg-orange-900 rounded hover:bg-orange-700"
        >
          View Details
        </Link>
        <button
          onClick={(e) => {
            if (isFavorite) {
              const shouldRemove = window.confirm(`Remove "${movie.name}" from your favorites?`);
              if (!shouldRemove) {
                e.preventDefault();
                return;
              }
            } else {
              const shouldAdd = window.confirm(`Add "${movie.name}" to your favorites?`);
              if (!shouldAdd) {
                e.preventDefault();
                return;
              }
            }
            onAddFavorite();
          }}
          className={`px-4 py-2 text-white rounded ${
            isFavorite 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-orange-900 hover:bg-orange-800'
          } transition-colors`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
