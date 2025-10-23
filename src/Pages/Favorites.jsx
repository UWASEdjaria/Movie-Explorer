import React from "react";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorite";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (movie) => {
    removeFavorite(movie.id);
  };

  if (!favorites || favorites.length === 0)
    return <p className="mt-10 text-xl">No favorite movies yet.</p>;

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-orange-900 mb-6">
        Your Favorites
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            image={movie.image?.medium || "/images/default-movie.jpg"}
            name={movie.name}
            onAddFavorite={() => handleRemoveFavorite(movie)} // reuse button to remove
            confirmMessage={`Remove "{title}" from favorites?`}
            successMessage={`"{title}" removed from favorites.`}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
