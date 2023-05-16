"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("query"));
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };
  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 leading-5 placeholder-gray-500 focus:border-accent-1 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-1 sm:text-sm"
            placeholder="Search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className=" absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <i
              className="fa-solid fa-magnifying-glass text-gray-400"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </form>
    </div>
  );
}
