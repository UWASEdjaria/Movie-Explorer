const BASE = "https://api.tvmaze.com";
export const fetchAllMovies = async () => (await fetch(`${BASE}/shows`)).json();
export const fetchMovieById = async (id) => (await fetch(`${BASE}/shows/${id}`)).json();
export const searchMovies = async (q) => (await fetch(`${BASE}/search/shows?q=${encodeURIComponent(q)}`)).json().then(d => d.map(i => i.show));
export const getMovieImage = (m) => m.image?.medium || "/images/default-movie.jpg";
export const formatGenres = (g) => g?.join(", ") || "Unknown";
