import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
    
  <Link to='/'> Home</Link>
  <Link to='/MovieDetails'> MovieDetails</Link>
  <Link to=' Favorites'> Favorites</Link>

    </nav>
  )
}

export default Navbar