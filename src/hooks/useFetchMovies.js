import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext(); 

export function useFetchMovies() {

  const [movies, setMovies] = useState([]);     // start with empty array
  const [loading, setLoading] = useState(true); // start as true
  const [error, setError] = useState(null);     // handle fetch errors

  useEffect(() => {
    
    async function fetchMovies() {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        if (!response.ok) {
          throw new Error(`HTTP error! Status ${response.status}`);
        }

        const data = await response.json();
        setMovies(data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); 
      }
    }

    fetchMovies(); 
  }, []);

  return { movies, loading, error };
}
