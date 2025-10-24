import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

// Available categories
const categories = [
  { id: 'action', name: 'Action' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
  { id: 'horror', name: 'Horror' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'animation', name: 'Animation' },
  { id: 'adventure', name: 'Adventure' },
];

function CategoryFilter({ addToFavorites, favorites }) {
  const { category = 'action' } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Function to fetch movies by category from TVMaze API
  async function fetchMoviesByCategory() {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would use a proper API endpoint
      // This is a workaround using the TVMaze API search endpoint
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${category}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      
      // Transform the API response to match our movie format
      const formattedMovies = data
        .map(item => item.show)
        .filter(show => show.image?.medium) // Only include shows with images
        .map(show => ({
          id: show.id,
          name: show.name,
          image: show.image.medium,
          rating: show.rating?.average || 0,
          summary: show.summary,
          genres: show.genres || []
        }));
      
      setMovies(formattedMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchMoviesByCategory();
  }, [category]);

  function handleCategoryChange(newCategory) {
    navigate(`/category/${newCategory}`);
  }

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading {category} movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <button
          onClick={fetchMoviesByCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">
        {category} Movies
      </h1>
      
      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                category === cat.id
                  ? 'bg-orange-700 text-white hover:bg-orange-800'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddFavorite={() => addToFavorites(movie)}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              buttonLabel={favorites.some(fav => fav.id === movie.id) ? "In Favorites" : "Add to Favorites"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            No {category} movies found. Try another category.
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
