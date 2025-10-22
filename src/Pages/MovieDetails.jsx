import React from "react";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
  const Movie = [
    {
      id: 1,
      name: "Under the Dome",
      genres: "Drama,Science-Fiction,Thriller",
      status: "Ended",
      premiered: "2013-06-24",
    },
    {
      id: 2,
      name: "CBS",
      genres: "Action,Crime,Science-Fiction",
      status: "Ended",
      premiered: "2011-09-22",
    },
    {
      id: 2,
      name: "Bitten",
      genres: "Drama,Horror,Romance",
      status: "Ended",
      premiered: "2014-01-11",
    },
  ];

  const MovieDetail = [Movie];
  return (
    <div>
      <MovieCard key={Movie.id} {...MovieDetail} />
    </div>
  );
}

export default MovieDetails;
