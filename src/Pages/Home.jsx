import React from 'react'
import Search from '../components/Search'
import MovieCard from '../components/MovieCard'

function Home() {
  return (
    <div className='flex flex-col justify-center items-center text-center'>
      <h1 className='   <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4 mt-6 m-6">Welcome to Movie Explorer 🎬</h1>'>Welcome to movie Explorer</h1>
   <p className='text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic leading-relaxed mt-5'> Discover popular movies, explore details, 
    and <br></br>save your favorites — all in one place!</p>
   
    <Search/>
     <MovieCard/>
    </div>
  )
}

export default Home