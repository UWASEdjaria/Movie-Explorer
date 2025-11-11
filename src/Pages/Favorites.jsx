import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Favorites({ favorites, removeFromFavorites }) {
  function handleRemoveFavorite(movie) {
    if (window.confirm(`Remove ${movie.name} from favorites?`)) {
      removeFromFavorites(movie.id);
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-orange-900 dark:text-orange-300">
          My Favorite Movies
        </h1>
        
        {favorites.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-xl text-gray-600 dark:text-gray-300">
              Your favorites list is empty.
            </p>
            <Link 
              to="/" 
              className="inline-block px-6 py-2 font-bold text-white transition-colors duration-300 rounded-lg bg-amber-600 hover:bg-amber-700"
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