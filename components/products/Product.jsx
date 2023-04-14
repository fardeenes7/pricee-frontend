"use client";
import Link from "next/link";
import { useState } from "react";

export default function Product(props) {
  const { product, key } = props;
  const [isFav, setIsFav] = useState(false);
  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white">
        <img
          className="h-full w-full object-contain object-center transition-all duration-500 group-hover:scale-110 lg:h-full lg:w-full"
          src={product.image.href}
          alt=""
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-6 p-4 ">
        <h1 className="text-xs font-medium transition-all duration-500 group-hover:text-complement md:text-sm">
          {product.name}
        </h1>
        <div className="flex items-end justify-between">
          <div>
            <h6 className="text-xs font-bold text-gray-700 ">Best Price</h6>
            <h5 className="group-hover:text-md text-sm font-bold">
              {product.best_price} BDT
            </h5>
          </div>
          <div>
            <button>
              <i
                className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
