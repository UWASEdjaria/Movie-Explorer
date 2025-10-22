
import React from "react";

function MovieCard({ image, name,AddFavorite }) {
  return (
    <div className="border animate-sping p-4 rounded-lg  shadow-amber-700 hover:shadow transition hover:scale-120  w-80 mb-6">
      <img src={image} alt={name} className="w-full h-96 object-cover rounded" />
      <h1 className="text-2xl font-bold text-orange-900 mt-4">{name}</h1>
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
