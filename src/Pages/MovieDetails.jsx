import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Debug helper
const debug = (message, data) => {
  console.log(`[DEBUG] ${message}`, data);
  return data;
};

const API_URL = 'https://api.tvmaze.com/shows';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/600x900?text=No+Image';

export default function MovieDetails({ onToggleFavorite, favorites = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('useEffect triggered with id:', id);
    
    const fetchMovie = async () => {
      if (!id) {
        console.error('No ID provided in URL');
        setError('No movie ID provided');
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching movie with ID:', id);
        const response = await axios.get(`${API_URL}/${id}`);
        console.log('API Response:', response);
        
        if (!response.data) {
          throw new Error('No data received from API');
        }
        
        setMovie(debug('Movie data:', response.data));
        setError('');
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError(`Error: ${err.message || 'Failed to load movie details'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie().catch(err => {
      console.error('Unhandled error in fetchMovie:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    });
  }, [id]);

  const handleFavoriteClick = (e) => {
    try {
      console.log('Favorite button clicked', { movieId: movie?.id, favorites });
      
      if (!movie || !movie.id) {
        console.error('No movie data available');
        return;
      }
      
      if (!onToggleFavorite) {
        console.error('onToggleFavorite is not defined');
        return;
      }
      
      const isCurrentlyFavorite = favorites.some(fav => fav.id === movie.id);
      
      if (!isCurrentlyFavorite && !window.confirm('Add this movie to your favorites?')) {
        e?.preventDefault();
        return;
      }
      
      onToggleFavorite(movie);
    } catch (err) {
      console.error('Error in handleFavoriteClick:', err);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating / 2) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  console.log('Rendering MovieDetails', { loading, error, movie: movie?.id });
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-t-2 border-b-2 rounded-full animate-spin border-amber-500"></div>
        <p>Loading movie details...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="p-8 text-center">
      <div className="max-w-md p-6 mx-auto border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <h3 className="mb-2 text-lg font-medium text-red-800 dark:text-red-200">Something went wrong</h3>
        <p className="mb-6 text-red-600 dark:text-red-400">{error}</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 text-white transition-colors rounded bg-amber-600 hover:bg-amber-700"
          >
            Try Again
          </button>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
  if (!movie) return <div className="p-8 text-center">
    <p>Movie not found.</p>
    <Link to="/" className="inline-block px-4 py-2 mt-4 text-white rounded bg-amber-600 hover:bg-amber-700">
      Back to Home
    </Link>
  </div>;

  const { name, image, rating, runtime, premiered, genres, summary, network, schedule, status, language } = movie;
  const imageUrl = image?.original || image?.medium || PLACEHOLDER_IMAGE;
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-auto rounded-lg shadow-lg"
            onError={(e) => e.target.src = PLACEHOLDER_IMAGE}
          />
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={handleFavoriteClick}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-600 hover:bg-amber-700'
              } text-white`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Back
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
          
          <div className="flex items-center mb-6">
            {rating?.average && (
              <div className="flex items-center mr-4">
                <div className="flex">{renderStars(rating.average)}</div>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {rating.average.toFixed(1)}/10
                </span>
              </div>
            )}
            
            {runtime && <span className="mr-4 text-gray-600 dark:text-gray-400">{runtime} min</span>}
            {premiered && <span className="text-gray-600 dark:text-gray-400">{new Date(premiered).getFullYear()}</span>}
          </div>

          {genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map((genre, i) => (
                <span key={i} className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {summary && (
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="mb-2 text-xl font-semibold">Overview</h3>
              <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: summary }} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            {network && (
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Network</h3>
                <p className="text-gray-700 dark:text-gray-300">{network.name}</p>
              </div>
            )}

            {schedule?.days && (
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Schedule</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {schedule.days.join(', ')} {schedule.time && `at ${schedule.time}`}
                </p>
              </div>
            )}

            {status && (
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Status</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.status}
                </p>
              </div>
            )}

            {movie.language && (
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Language</h3>
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