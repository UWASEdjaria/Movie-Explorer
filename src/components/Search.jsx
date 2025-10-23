import React from "react";

function Search({ value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)} // updates parent state
          placeholder="Search movies..."
          className="flex-1 text-white p-3 rounded-lg outline-none 
                     bg-amber-800 border border-amber-800 
                     shadow-lg focus:ring-2 focus:ring-amber-500 
                     transition-transform duration-300 hover:scale-105"
        />
      </div>
    </form>
  );
}

export default Search;
