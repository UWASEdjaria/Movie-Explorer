import React, { useState } from "react";
import Search from "../components/Search";
import MovieCard from "../components/MovieCard";
import { useFetchMovies } from "../hooks/useFetchMovies";

function Home() {
  const { movies, loading, error } = useFetchMovies();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddFavorite = (movie) => {
    console.log("Add to favorites:", movie.name);
  };

  if (loading) return <p className="mt-10 text-xl">Loading movies...</p>;
  if (error) return <p className="mt-10 text-xl text-red-500">{error.message}</p>;

  // Filter movies by search term (case-insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4 mt-6 m-6">
        Welcome to Movie Explorer
      </h1>
      <p className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic leading-relaxed mt-5">
        Discover popular movies, explore details, <br />
        and save your favorites — all in one place!
      </p>

      {/* Search using your exact styled component */}
      <Search value={searchTerm} onChange={setSearchTerm} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              image={movie.image?.medium || "/images/default-movie.jpg"}
              name={movie.name}
              onAddFavorite={() => handleAddFavorite(movie)}
            />
          ))
        ) : (
          <p className="mt-10 text-xl text-gray-700">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
