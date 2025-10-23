import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }

    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch {
      /* ignore for SSR */
    }
  }, [theme]);

  const navStyle = { backgroundColor: "var(--nav-bg)" };

  return (
    <nav
      style={navStyle}
      className={`w-full flex flex-row justify-between flex-wrap py-4 space-x-2 border-amber-600 rounded-lg shadow-lg transition-all hover:scale-105 duration-300 ease-in-out px-4`}
    >
      <p className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl italic font-bold text-white hover:text-orange-500 transition-all duration-300">
        Movies
      </p>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-white hover:text-orange-500 transition-colors duration-300 hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/MovieDetails"
          className="text-white hover:text-orange-500 transition-colors duration-300 hover:scale-105"
        >
          MovieDetails
        </Link>
        <Link
          to="/Favorites"
          className="text-white hover:text-orange-500 transition-colors duration-300 hover:scale-105"
        >
          Favorites
        </Link>

        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="ml-4 border px-3 py-1 rounded text-white"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
