"use client";

import Product from "@/components/products/Product";
import { useState, useEffect } from "react";
import Loading from "@/components/products/ProductLoader";
import Link from "next/link";
import Pagination from "./Pagination";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const search = searchParams.get("query") || "";
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [ordering, setOrdering] = useState(searchParams.get("ordering") || "");
  const [status, setStatus] = useState({
    startproduct: 0,
    endproduct: 0,
    totalproducts: 0,
  });
  useEffect(() => {
    setLoading(true);
    setProducts([]);
    fetchData();
  }, [page, search, filter, ordering]);

  const handleUrlChange = (hpage, hsearch, hfilter, hordering) => {
    const params = new URLSearchParams();
    if (hpage != 1) {
      params.append("page", hpage);
    }
    if (hsearch != "") {
      params.append("query", hsearch);
    }
    if (hfilter != "") {
      params.append("filter", hfilter);
    }
    if (hordering != "") {
      params.append("ordering", hordering);
    }
    router.push("search" + "?" + params.toString());
  };

  const handlePageChange = (hpage) => {
    setPage(hpage);
    handleUrlChange(hpage, search, filter, ordering);
  };

  const handleQueryChange = (e) => {
    e.preventDefault();
    handleUrlChange(1, query, filter, ordering);
  };

  const handleFilterChange = (hfilter) => {
    handleUrlChange(1, search, hfilter, ordering);
  };

  const handleOrderingChange = (hordering) => {
    setOrdering(hordering);
    handleUrlChange(1, search, filter, hordering);
  };

  const fetchData = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}&ordering=${ordering}&search=${search}&filter=${filter}`;
    try {
      const response = await fetch(
        endpoint,
        {
          method: "GET",
        },
        {
          next: {
            cache: "no-store",
          },
        }
      );
      const { count, next, results } = await response.json();
      setTotalPages(Math.ceil(count / 20));
      setProducts(results);
      setStatus({
        startproduct: (page - 1) * 20 + 1,
        endproduct: (page - 1) * 20 + results.length,
        totalproducts: count,
      });
      setLoading(false);

      if (next === null) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching: " + error);
    }
  };

  return (
    <div className="product-grid">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <h1 className="my-2 text-2xl font-bold">
          Search Results For: {search.replace(/-/g, " ").toUpperCase()}
        </h1>
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <form onSubmit={handleQueryChange}>
            <div className="relative">
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 leading-5 placeholder-gray-500 focus:border-accent-1 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-1 sm:text-sm"
                placeholder="Search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
        <div className="flex items-center gap-4">
          <label
            htmlFor="location"
            className="block w-full text-end text-sm font-medium text-gray-700"
          >
            Order By
          </label>
          <select
            id="location"
            name="location"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue="Default"
            onChange={(e) => handleOrderingChange(e.target.value)}
          >
            <option>Default</option>
            <option value="name">Name (Ascending)</option>
            <option value="-name">Name (Descending)</option>
            <option value="best_price">Price (Ascending)</option>
            <option value="-best_price">Price (Descending)</option>
          </select>
        </div>
      </div>
      {loading && Loading()}
      {!loading && products.length == 0 && (
        <div className="my-6 w-full text-center font-semibold lg:text-lg">
          <h4>No products found</h4>
        </div>
      )}
      {products.length != 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, id) => (
            <Link
              href={`/product/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border-2 bg-white/50"
              key={id}
            >
              <Product product={product} id={id} />
            </Link>
          ))}
        </div>
      )}
      <Pagination
        status={status}
        totalPages={totalPages}
        setPage={(page) => handlePageChange(page)}
      />
    </div>
  );
}
