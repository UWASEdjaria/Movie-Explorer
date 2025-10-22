import React from "react";

function MovieCard({ image, name, genres, AddFavorite }) {
  return (
    <div className="border p-4 rounded-lg shadow-amber-700 hover:shadow transition hover:scale-105 w-80 mb-6">
      <img
        src={image || "/images/default-movie.jpg"}
        alt={name}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-2xl font-bold text-orange-900 mt-4">{name}</h1>

      {genres && genres.length > 0 && (
        <p className="text-sm text-gray-700 mt-2">{genres.join(", ")}</p>
      )}

      <button
        onClick={AddFavorite}
        className="border-2 border-amber-600 py-2 px-4 mt-2 rounded-lg font-bold hover:bg-amber-600 transition-all hover:scale-105 duration-300"
      >
        Add to Favorites
      </button>
    </div>
  );
}

export default MovieCard;
