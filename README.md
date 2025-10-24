# 🎬 Movie Explorer

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive web application for exploring and discovering movies. Built with React, Vite, and Tailwind CSS, featuring dark/light mode support and a clean, intuitive user interface.

## ✨ Features

- 🎥 Browse and discover movies
- 🔍 Search functionality with instant results
- 🏷️ Filter movies by categories and genres
- ❤️ Add movies to favorites (persists in localStorage)
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ⚡ Fast and optimized performance with Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher) or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Project Structure

```
src/
├── pages/                 # Page components
│   ├── Home.jsx          # Home page with movie grid
│   ├── MovieDetails.jsx  # Detailed movie view
│   └── Favorites.jsx     # Saved favorites page
│
├── components/           # Reusable UI components
│   ├── MovieCard.jsx     # Movie card component
│   ├── Navbar.jsx        # Navigation bar
│   ├── SearchBar.jsx     # Search functionality
│   └── CategoryFilter.jsx# Genre filter component
│
├── hooks/                # Custom React hooks
│   ├── useFetchMovies.js # Data fetching logic
│   └── useFavorites.js   # Favorites management
│
├── context/              # React context providers
│   └── ThemeContext.jsx  # Theme management
│
├── utils/                # Utility functions
│   └── api.js            # API service
│
├── assets/               # Static assets
├── App.jsx               # Main app component
└── main.jsx              # Application entry point
```

## 🛠️ Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Router](https://reactrouter.com/) - For client-side routing
- [TVMaze API](https://www.tvmaze.com/api) - For movie and TV show data

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TVMaze](https://www.tvmaze.com/) for their amazing free API
- All the open-source libraries used in this project
- The React and Vite communities