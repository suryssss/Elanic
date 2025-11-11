import React from "react";
import { useSearchParams } from "react-router";

const SortOptions = () => {
  const [search, setSearch] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

   search.set("sortBy",sortBy)
   setSearch(search)

  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        onChange={handleSortChange}
        value={search.get("sortBy") || ""}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ratingDesc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;
