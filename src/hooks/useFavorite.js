import { useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);

  const saveFavorites = (list) => {
    localStorage.setItem("favorites", JSON.stringify(list));
    setFavorites(list);
  };

  const addFavorite = (movie) => saveFavorites([...favorites, movie]);
  const removeFavorite = (id) => saveFavorites(favorites.filter(m => m.id !== id));

  return { favorites, addFavorite, removeFavorite };
}
