import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="w-full flex flex-row justify-between text-white flex-wrap  py-4  space-x-2  bg-amber-900 border-amber-600 rounded-lg shadow-lg  transition-all hover:scale-105 duration-300 ease-in-out  bg-amber-400shadow-lg px-4">
    <p className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic font-bold hover:text-orange-500 transition-all duration-300">Movies</p>
  <Link to='/'className="'hover:text-orange-500 transition-colors duration-300   hover:text-orange-500 hover:scale-105"> Home</Link>
  <Link to='/MovieDetails'className="hover:text-orange-300 transition-colors duration-300  hover:text-orange-500  hover:scale-105"> MovieDetails</Link>
  <Link to='/Favorites' className="hover:text-orange-500 transition-colors duration-300 hover:scale-105"> Favorites</Link>

    </nav>
  )
}

export default Navbar