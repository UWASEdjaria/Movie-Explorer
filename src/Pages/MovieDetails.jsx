import React from "react";
import { Link, useLocation } from "react-router-dom";
// recently-viewed removed

function MovieDetails() {
  const location = useLocation();
  const movie = location.state?.movie || null;
  // recently-viewed removed

  return (
    <div className="flex flex-col items-center px-4 mt-10">
      <h1 className="mb-4 text-3xl font-bold">Movie Details</h1>

      {/* recently-viewed removed */}

      {movie ? (
        <div className="flex flex-col items-center w-full max-w-4xl">
          <h2 className="mb-2 text-2xl font-bold">{movie.name}</h2>
          <img
            src={
              movie.image?.original ||
              movie.image?.medium ||
              movie.image ||
              "/images/movie.jpg"
            }
            alt={movie.name}
            className="w-full h-auto mb-4 rounded"
          />

          {/* Details block */}
          <div className="w-full p-6 text-left bg-gray-200 rounded dark:bg-gray-800">
            <div className="mb-4">
              <strong>Genres:</strong>{" "}
              {movie.genres?.join ? movie.genres.join(", ") : movie.genres}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {movie.status || "-"}
            </div>
            <div className="mb-2">
              <strong>Premiered:</strong> {movie.premiered || "-"}
            </div>
            <div className="mb-2">
              <strong>Language:</strong> {movie.language || "-"}
            </div>
            <div className="mb-4">
              <strong>Runtime:</strong>{" "}
              {movie.runtime ? `${movie.runtime} min` : "-"}
            </div>

            {/* Summary: render HTML from API but sanitize with DOMParser first */}
            {movie.summary ? (
              <div className="prose max-w-none dark:prose-invert">
                <SanitizedHtml html={movie.summary} />
              </div>
            ) : (
              <p>No summary available.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-xl">
          Select a movie to see details or use the Recently viewed section.
        </p>
      )}
    </div>
  );
}

// Component: safely parse and render HTML from API summary using DOMParser
function SanitizedHtml({ html }) {
  if (!html) return null;

  // Basic sanitization via DOM APIs: remove script/style and on* attributes
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // remove scripts/styles
    doc.querySelectorAll("script, style").forEach((el) => el.remove());

    // remove event handler attributes and javascript: URIs
    const elements = doc.querySelectorAll("*");
    elements.forEach((el) => {
      // copy attributes to avoid live mutation during iteration
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const val = attr.value || "";
        if (name.startsWith("on")) {
          el.removeAttribute(attr.name);
        }
        if (
          (name === "href" || name === "src") &&
          val.trim().toLowerCase().startsWith("javascript:")
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });

    const safe = doc.body.innerHTML;
    return <div dangerouslySetInnerHTML={{ __html: safe }} />;
  } catch {
    // fallback: render plain text
    return <div>{html.replace(/<[^>]+>/g, "")}</div>;
  }
}

export default MovieDetails;