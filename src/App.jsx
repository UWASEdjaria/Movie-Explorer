import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './index.css'
import './App.css'
import Home from './Pages/Home'
import MovieDetails from './Pages/MovieDetails'
import Favorites from './Pages/Favorites'
import Navbar from './components/Navbar'


function App() {
 
  return (
    <nav>
   <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/MovieDetails' element={<MovieDetails/>} />
      <Route path='/Favorites' element={<Favorites/>} />
    </Routes>
   </Router>
    </nav>
  )
}

export default App
