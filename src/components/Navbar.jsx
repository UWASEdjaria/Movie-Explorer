import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  // Theme state, stored in localStorage
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  // Apply dark/light mode
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      {/*ignore*/}
    }

    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch {
        {/*ignore*/}
    }
  }, [theme]);

  return (
    <nav
      className="flex flex-row flex-wrap justify-between w-full px-4 py-4 space-x-2 transition-all duration-300 ease-in-out rounded-lg shadow-lg border-amber-600 hover:scale-105 bg-amber-900"
    >
      <p className="text-2xl italic font-bold text-white transition-all duration-300 sm:text-2xl md:text-4xl lg:text-4xl hover:text-orange-500">
        Movies
      </p>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-white transition-colors duration-300 hover:text-orange-500 hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/MovieDetails"
          className="text-white transition-colors duration-300 hover:text-orange-500 hover:scale-105"
        >
          MovieDetails
        </Link>
        <Link
          to="/Favorites"
          className="text-white transition-colors duration-300 hover:text-orange-500 hover:scale-105"
        >
          Favorites
        </Link>

        {/* Dark/Light Toggle Button */}
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="px-3 py-1 ml-4 text-white transition border rounded hover:opacity-90"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
