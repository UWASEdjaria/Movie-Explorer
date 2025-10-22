import React from "react";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const movies = [
    {
      id: 1,
      name: "Under the Dome",
      genres: "Drama, Science-Fiction, Thriller",
      status: "Ended",
      premiered: "2013-06-24",
      image: "/images/default-movie.jpg",
    },
    {
      id: 2,
      name: "CBS",
      genres: "Action, Crime, Science-Fiction",
      status: "Ended",
      premiered: "2011-09-22",
      image: "/images/default-movie.jpg",
    },
    {
      id: 3,
      name: "Bitten",
      genres: "Drama, Horror, Romance",
      status: "Ended",
      premiered: "2014-01-11",
      image: "/images/default-movie.jpg",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-10">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col items-center">
          <MovieCard
            image={movie.image}
            name={movie.name}
            onAddFavorite={() => alert(`${movie.name} added to favorites`)}
          />
          <div className="text-left mt-2">
            <p><strong>Genres:</strong> {movie.genres}</p>
            <p><strong>Status:</strong> {movie.status}</p>
            <p><strong>Premiered:</strong> {movie.premiered}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;
