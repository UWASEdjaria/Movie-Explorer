import React from "react";

export default function CategoryFilter() {
  return (
    <select className="border p-2 rounded-lg w-80 mt-4">
      <option>All Categories</option>
      <option>Drama</option>
      <option>Comedy</option>
      <option>Action</option>
      <option>Sci-Fi</option>
    </select>
  );
}
