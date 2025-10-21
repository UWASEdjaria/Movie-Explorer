;

function Search() {
  return (
    <div className="w-full max-w-md mt-6">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full text-white p-3 mb-5 rounded-lg outline-none 
                   bg-amber-800 border border-amber-800 
                   shadow-lg focus:ring-2 focus:ring-amber-500 
                   transition-transform duration-300 hover:scale-105"
      />

    </div>
  );
}

export default Search;
