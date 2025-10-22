import React from 'react'

function MovieCard(image,name) {

  
  return (
    <>
        <img 
        src={image}
        alt={name}
        className='w-full h-96 object-cover'/>
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
   
      <h1 className='text-4xl md:text-5xl font-bold text-orange-900 mb-4 mt-6'>{name}</h1>
     
    <button className='border-2  border-amber-600 py-2 px-2 hover:bg-amber-600 rounded-lg font-bold transition-all hover:scale-105 duration-300'>Add to Favorites</button>  
    </div>
    </>
  )
}

export default MovieCard