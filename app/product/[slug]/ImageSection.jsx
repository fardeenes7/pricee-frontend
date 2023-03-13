"use client";
import { useState } from "react";

export default function ImageDiv({ images }) {
  const [image, setImage] = useState(images[0].href);
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="flex flex-col gap-2">
        {images.slice(0, 4).map((img, id) => (
          <div
            className=" rounded-xl border-2 bg-white p-2"
            onClick={() => setImage(img.href)}
            key={id}
          >
            <img src={img.href} className="h-full w-full"></img>
          </div>
        ))}
      </div>
      <div className="aspect-square max-h-content col-span-4 rounded-xl border-2 bg-white p-8">
        <img
          src={image}
          className="aspect-square h-full w-full object-contain object-center"
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        ></img>
      </div>
    </div>
  );
}
