"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageDiv({ images }) {
  const [image, setImage] = useState(images[0].href);
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="flex flex-col gap-2">
        {images.slice(0, 4).map((img, id) => (
          <div
            className={` rounded-xl border-2 bg-white p-2 ${
              image === img.href && "border-accent-1"
            } `}
            onClick={() => setImage(img.href)}
            key={id}
          >
            <Image
              src={img.href}
              height="128"
              width="128"
              className="h-full w-full"
            ></Image>
          </div>
        ))}
      </div>
      <div className="aspect-square max-h-content col-span-4 rounded-xl border-2 bg-white p-8">
        <Image
          src={image}
          className="aspect-square h-full w-full object-contain object-center"
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          height="1024"
          width="1024"
        ></Image>
      </div>
    </div>
  );
}
