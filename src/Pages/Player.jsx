import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function Player() {
  const location = useLocation();
  const movie = location.state?.movie || null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!movie) return;
    // auto-start playing when component mounts with a movie
    setIsPlaying(true);
    setProgress(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [movie]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          const next = Math.min(100, p + 1);
          if (next >= 100 && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsPlaying(false);
          }
          return next;
        });
      }, 200); // progress every 200ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  if (!movie) return <p className="mt-10 text-xl">No movie selected.</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Now playing: {movie.name}</h1>
      <img
        src={
          movie.image?.original ||
          movie.image?.medium ||
          movie.image ||
          "/images/movie.jpg"
        }
        alt={movie.name}
        className="w-full max-w-xl h-auto rounded mb-4"
      />

      <div className="w-full max-w-xl bg-gray-200 p-6 rounded text-left">
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres?.join ? movie.genres.join(", ") : movie.genres}
        </p>
        <p>
          <strong>Status:</strong> {movie.status}
        </p>
        <p>
          <strong>Premiered:</strong> {movie.premiered}
        </p>
      </div>

      <div className="w-full max-w-xl mt-6">
        <div className="w-full bg-gray-300 rounded h-3 overflow-hidden">
          <div
            className="bg-amber-600 h-3"
            style={{ width: `${progress}%`, transition: "width 0.18s linear" }}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm text-gray-600">
            {Math.round((progress / 100) * 100)}%
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying((s) => !s)}
              className="bg-amber-600 text-white px-4 py-1 rounded"
            >
              {isPlaying ? "Pause" : progress >= 100 ? "Replay" : "Play"}
            </button>
            <button
              onClick={() => {
                setProgress(0);
                setIsPlaying(true);
              }}
              className="border px-3 py-1 rounded"
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
