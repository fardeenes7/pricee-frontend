"use client";

import Product from "../products/Product";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./ProductLoader";
import Link from "next/link";
import { refreshToken } from "../auth/auth";

export default function ProductGrid(props) {
  const [products, setProducts] = useState(
    props.products ? props.products : []
  );
  const [page, setPage] = useState(props.products ? 2 : 1);
  const [hasMore, setHasMore] = useState(true);
  const category = props.category ? "&category=" + props.category : "";
  const subcategory = props.subcategory
    ? "&sub_category=" + props.subcategory
    : "";

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setTimeout(() => {
        fetchDataLoggedIn(access_token);
      }, 2000);
    } else {
      setTimeout(() => {
        fetchData();
      }, 2000);
    }
  }, [page]);

  const fetchData = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}${category}${subcategory}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
      });
      const { results, next } = await response.json();
      const data = [...products].concat(results);
      if (next === null) {
        setHasMore(false);
      }
      setProducts(data);
    } catch (error) {
      console.log("Error fetching: " + error);
    }
  };

  const fetchDataLoggedIn = async (access_token) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}${category}${subcategory}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status != 200) {
        new error(response.status);
      }
      const { results, next } = await response.json();
      const data = [...products].concat(results);
      if (next === null) {
        setHasMore(false);
      }
      setProducts(data);
    } catch (error) {
      try {
        refreshToken();
        fetchDataLoggedIn(access);
      } catch (error) {
        fetchData();
      }
    }
  };

  return (
    <div className="product-grid">
      <h1 className="my-2 text-2xl font-bold">
        {props.category && `${props.category.replace(/-/g, " ").toUpperCase()}`}
        {props.subcategory &&
          ` ${props.subcategory.replace(/-/g, " ").toUpperCase()}`}
        {props.search &&
          `Search For:  ${props.search.replace(/-/g, " ").toUpperCase()}`}
        {!props.category &&
          !props.subcategory &&
          !props.search &&
          "Products You May Like"}
      </h1>
      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={Loading()}
        endMessage={endMessage()}
      >
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
      </InfiniteScroll>
    </div>
  );
}

function endMessage() {
  return (
    <div className="my-6 w-full text-center font-semibold lg:text-lg">
      <h4>Nothing more to show</h4>
    </div>
  );
}
