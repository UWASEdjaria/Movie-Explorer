import React from "react";

export default function CategoryFilter({ selectedGenre, setSelectedGenre }) {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      className="border p-2 rounded-lg w-80 mt-4 dark:bg-gray-800 dark:text-white"
    >
      <option value="All">All Categories</option>
      <option value="Drama">Drama</option>
      <option value="Comedy">Comedy</option>
      <option value="Action">Action</option>
      <option value="Sci-Fi">Sci-Fi</option>
    </select>
  );
}
