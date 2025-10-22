import React from "react";
import MovieCard from "../components/MovieCard";

function Favorites({ favorites, setFavorites }) {
  const handleRemoveFavorite = (movie) => {
    setFavorites(favorites.filter((fav) => fav.id !== movie.id)); // update state
  };

  if (favorites.length === 0)
    return <p className="mt-10 text-xl">No favorite movies yet.</p>;

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-orange-900 mb-6">Your Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            image={movie.image?.medium || "/images/default-movie.jpg"}
            name={movie.name}
            onAddFavorite={() => handleRemoveFavorite(movie)} // reuse button to remove
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
