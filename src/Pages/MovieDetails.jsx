import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function MovieDetails({ onToggleFavorite, favorites }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="p-8 text-center">
        <p>Movie not found.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const imageUrl = movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/600x900?text=No+Image';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Movie Poster */}
        <div className="w-full lg:w-1/3">
          <img
            src={imageUrl}
            alt={movie.name}
            className="w-full h-auto rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x900?text=No+Image';
            }}
          />
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={(e) => {
                if (!isFavorite) {
                  const isConfirmed = window.confirm('Add this movie to your favorites?');
                  if (!isConfirmed) {
                    e.preventDefault();
                    return;
                  }
                }
                onToggleFavorite(movie);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
          </div>
        </div>

        {/* Movie Details */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {movie.name}
          </h1>
          
          <div className="flex items-center mb-6">
            {movie.rating?.average && (
              <div className="flex items-center mr-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(movie.rating.average / 2)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {movie.rating.average.toFixed(1)}/10
                </span>
              </div>
            )}
            
            {movie.runtime && (
              <span className="text-gray-600 dark:text-gray-400 mr-4">
                {movie.runtime} min
              </span>
            )}
            
            {movie.premiered && (
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(movie.premiered).getFullYear()}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.map((genre, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          {movie.summary && (
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <div 
                className="text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: movie.summary }}
              />
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {movie.network && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Network</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.network.name}
                </p>
              </div>
            )}

            {movie.schedule && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Schedule</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.schedule.days?.join(', ')} at {movie.schedule.time || 'N/A'}
                </p>
              </div>
            )}

            {movie.status && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Status</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.status}
                </p>
              </div>
            )}

            {movie.language && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Language</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.language}
                </p>
              </div>
            )}
          </div>

          {movie.officialSite && (
            <div className="mt-8">
              <a
                href={movie.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:underline"
              >
                Visit Official Website
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default MovieDetails;