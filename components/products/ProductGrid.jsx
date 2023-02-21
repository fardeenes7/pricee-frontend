"use client";

import Product from "../products/Product";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// async function getData({ page = 1 }) {
//   // const res = await fetch(`${process.env.API_BASE_URL}/products?page=${page}`);
//   const res = await fetch(`http://127.0.0.1:8000/api/v2/products?page=${page}`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   console.log(res.json().results);

//   return res.json().results;
// }

export default function ProductGrid(props) {
  const [products, setProducts] = useState(
    props.products ? props.products : []
  );
  const [page, setPage] = useState(props.products ? 2 : 1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}&category=${props.category}&sub_category=${props.subcategory}`;
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

  return (
    <div className="product-grid">
      <h1 className="my-2 text-2xl font-bold">
        {props.category && `${props.category.toUpperCase()}`}
        {props.subcategory && ` ${props.subcategory.toUpperCase()}`}
        {props.search && `Search For:  ${props.search.toUpperCase()}`}
        {!props.category &&
          !props.subcategory &&
          !props.search &&
          "Products You May Like"}
      </h1>
      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={endMessage()}
      >
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, id) => (
            <Product product={product} key={id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

function endMessage() {
  return <h4>Nothing more to show</h4>;
}
