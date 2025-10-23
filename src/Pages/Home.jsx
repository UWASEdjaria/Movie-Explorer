import React, { useState } from "react";
import Search from "../components/Search";
import MovieCard from "../components/MovieCard";
import CategoryFilter from "../components/CategoryFilter";
import { useFetchMovies } from "../hooks/useFetchMovies";
import useFavorites from "../hooks/useFavorite";

function Home() {
  const { movies, loading } = useFetchMovies();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addFavorite } = useFavorites();

  if (loading) return <p className="mt-10 text-xl">Loading movies...</p>;

  // When a search query exists, search across the whole dataset (name, genres,
  // summary, status, premiered). Otherwise apply the selected genre filter.
  const normalizedQuery = (searchQuery || "").trim().toLowerCase();

  const filteredMovies =
    normalizedQuery && normalizedQuery.length > 0
      ? movies.filter((movie) => {
        // Helper: normalize and strip diacritics
        const norm = (v) =>
          (v || "")
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/<[^>]+>/g, "");

        // Build a combined searchable string from many fields
        const parts = [];
        parts.push(norm(movie.name));
        parts.push(norm((movie.genres || []).join(" ")));
        parts.push(norm(movie.status));
        parts.push(norm(movie.premiered));
        parts.push(norm(movie.language));
        parts.push(norm(movie.officialSite));
        parts.push(norm(movie.network?.name));
        parts.push(norm(movie.webChannel?.name));
        parts.push(norm(movie.runtime));
        parts.push(norm(movie.type));
        parts.push(norm(movie.id));
        parts.push(norm(movie.externals?.imdb));
        parts.push(norm(movie.genres));
        parts.push(norm(movie.summary));

        const hay = parts.filter(Boolean).join(" ");
        return hay.includes(normalizedQuery);
      })
    : (
        selectedGenre === "All"
          ? movies
          : movies.filter((movie) => movie.genres.includes(selectedGenre))
      );

  return (
    <div className="bg-white flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4 mt-6 m-6">
        Welcome to Movie Explorer
      </h1>

      <p className="text-black  text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic leading-relaxed mt-5">
        Discover popular movies, explore details, <br />
        and save your favorites — all in one place!
      </p>

      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={setSearchQuery}
      />
      <CategoryFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            image={movie.image?.medium || ""}
            name={movie.name}
            onAddFavorite={() => addFavorite(movie)}
            confirmMessage={`Add "{title}" to favorites?`}
            successMessage={`"{title}" added to favorites.`}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
