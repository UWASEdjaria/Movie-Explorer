import React from 'react';
import Search from '../components/Search';
import MovieCard from '../components/MovieCard';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieDetails from './MovieDetails';

function Home() {
  const { movies, loading, error } = useFetchMovies();

  const handleAddFavorite = (movie) => {
    console.log("Added to favorites:", movie.name);
  };

  return (
    <div className='flex flex-col justify-center items-center text-center'>
      <h1 className='text-4xl md:text-5xl font-bold text-orange-900 mb-4 mt-6 m-6'>
        Welcome to movie Explorer
      </h1>
      <p className='text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic leading-relaxed mt-5'>
        Discover popular movies, explore details, <br /> save your favorites — all in one place!
      </p>

      <Search />

      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
        {movies.map((Movie) => (
          <MovieCard
            key={Movie.id}
            name={Movie.name}
            image={Movie.image?.medium || "/images/default-movie.jpg"}
            AddFavorite={() => handleAddFavorite(Movie)}
            {...MovieDetails} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
