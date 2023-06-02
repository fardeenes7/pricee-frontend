"use client";
import Image from "next/image";
import { useState } from "react";

export default function Product(props) {
  const { product, id } = props;
  const [isFav, setIsFav] = useState(false);
  return (
    <>
      <div className="aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-md bg-white">
        <Image
          className="h-full w-full object-contain object-center transition-all duration-500 group-hover:scale-110 lg:h-full lg:w-full"
          src={product.image.href}
          alt={product.name}
          fill
          blurDataURL={product.image.href}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-3 p-4 ">
        <h1 className="text-xs font-medium transition-all duration-500 group-hover:text-complement md:text-sm">
          {product.name}
        </h1>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-gray-700 ">Best Price</span>
            <p className="group-hover:text-md text-sm font-bold">
              {product.best_price} BDT
            </p>
          </div>
          <div>
            <button id={`wishlist-${id}`} aria-label="Add to Wishlist">
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
