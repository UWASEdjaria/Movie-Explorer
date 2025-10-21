import React from 'react'
import Search from '../components/Search'

function Home() {
  return (
    <div
      className='flex flex-col justify-center items-center text-center'
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-4 mt-6 gap-6">
        Welcome to Movie Explorer 🎬
      </h1>

      <p className='text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic leading-relaxed mt-5'>
        Discover popular movies, explore details, <br />
        and save your favorites — all in one place!
      </p>

      <Search />
      
    </div>
  )
}

export default Home
