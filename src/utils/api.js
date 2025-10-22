// utils/api.js
import axios from "axios";

export const fetchMovies = async () => {
  const response = await axios.get("https://api.tvmaze.com/shows");
  return response.data;
};
