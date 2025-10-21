import React from 'react'

function MovieCard() {
    const Shows = [
    {
      id: 1,
      name: "Under the Dome",
      image: "/images/default-movie.jpg",
      premiered: "2013-06-24",
      genres: ["Drama", "Sci-Fi", "Thriller"],
      rating: 6.5,
    },
    {
      id: 2,
      name: "Person of Interest",
      image: "/images/default-movie.jpg",
      premiered: "2011-09-22",
      genres: ["Action", "Crime", "Drama"],
      rating: 8.9,
    },
    {
      id: 3,
      name: "Breaking Bad",
      image: "/images/default-movie.jpg",
      premiered: "2008-01-20",
      genres: ["Crime", "Drama", "Thriller"],
      rating: 9.5,
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      
    <button className='border-2  border-amber-600 py-2 px-2 hover:bg-amber-600 rounded-lg font-bold transition-all hover:scale-105 duration-300'>Add to Favorites</button>  
    </div>
  )
}

export default MovieCard