import React, { useEffect, useState } from "react";

function FetchMovie() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const FetchMovie = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    FetchMovie();
  }, []);
  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}
export default FetchMovie;