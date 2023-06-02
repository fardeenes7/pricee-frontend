import Image from "next/image";
import One from "./one.webp";
import Two from "./two.webp";

async function getData() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banners`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "Content-Type",
  //   },
  //   next: {
  //     revalidate: 86400,
  //   },
  // });
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  // return res.json();

  const res = [
    {
      image: Two,
      title: "Yellow Minimalist Banner",
      slug: "yellow-minimalist-banner",
      size: "3x1",
    },
    {
      image: One,
      title: "10 Best Laptops Blog",
      slug: "10-best-laptops-blog",
      size: "1x1",
    },
  ];
  return res;
}

export default async function BannerGrid() {
  const data = await getData();
  return (
    <div className="bannergrid mb-4 grid grid-cols-3 gap-2 md:mx-0 md:grid-cols-4">
      {data.map((banner, id) => (
        <div
          key={id}
          className={`overflow-hidden rounded-xl ${
            banner.size === "3x1"
              ? "col-span-3 row-span-1 aspect-[3/1] lg:col-span-3"
              : "aspect-square col-span-3 row-span-1 md:col-span-1"
          }`}
        >
          <Image
            className="h-full w-full object-contain"
            src={banner.image}
            alt={banner.title}
            priority={true}
          />
        </div>
      ))}
    </div>
  );
}
