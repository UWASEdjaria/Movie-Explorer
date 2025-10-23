import React from "react";
import { useNavigate } from "react-router-dom";

// MovieCard supports optional confirm and success messages
function MovieCard({
  movie,
  image,
  name,
  onAddFavorite,
  confirmMessage,
  successMessage,
  buttonLabel = "Add to Favorites",
}) {
  const navigate = useNavigate();
  // recently-viewed feature removed
  const handleClick = () => {
    // if a confirm message is provided, show confirm dialog
    if (confirmMessage) {
      const ok = window.confirm(confirmMessage.replace("{title}", name));
      if (!ok) return;
    }

    // call callback
    onAddFavorite && onAddFavorite();

    // show success if provided
    if (successMessage) {
      window.alert(successMessage.replace("{title}", name));
    }
  };
  const displayImage = image || movie?.image || movie?.image?.medium || "";

  const handleDetails = (e) => {
    e.stopPropagation();
    if (!movie?.id) return;
    // Navigate to the MovieDetails page and pass the movie in location state
    navigate(`/MovieDetails`, { state: { movie } });
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition w-80 mb-6">
      <img
        src={displayImage}
        alt={name || movie?.name}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-2xl font-bold text-orange-900 mt-4">
        {name || movie?.name}
      </h1>

      <div className="flex gap-3 mt-2">
        <button
          onClick={handleDetails}
          className="bg-amber-600 text-white py-2 px-4 rounded font-bold hover:opacity-90"
        >
          Details
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="border-2 border-amber-600 py-2 px-4 rounded-lg font-bold hover:bg-amber-600 transition-all hover:scale-105 duration-300"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
