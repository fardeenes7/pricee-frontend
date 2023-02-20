import Link from "next/link";
import Image from "next/image";
import desktop from "./category/desktop-pc.png";
import laptop from "./category/laptop.png";
import monitor from "./category/monitor.png";
import accessories from "./category/adapter.png";
import networking from "./category/wifi.png";
import camera from "./category/camera.png";
import printer from "./category/printer.png";
import gaming from "./category/gaming.png";

const categories = [
  {
    name: "Desktop",
    slug: "desktop",
    image: desktop,
  },
  {
    name: "Laptop",
    slug: "laptop-tablet",
    image: laptop,
  },
  {
    name: "Gaming",
    slug: "gaming",
    image: gaming,
  },
  {
    name: "Monitor",
    slug: "monitor",
    image: monitor,
  },
  {
    name: "Networking",
    slug: "networking",
    image: networking,
  },
  {
    name: "Camera",
    slug: "camera",
    image: camera,
  },
  {
    name: "Printer",
    slug: "printer",
    image: printer,
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: accessories,
  },
];

export default function CategoryGrid() {
  return (
    <div className="category-grid mb-4">
      <h1 className="mb-4 text-2xl font-bold">Popular Categories</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {categories.map((category, id) => (
          <div className="col-span-1" key={id}>
            <Link
              href={`/category/${category.slug}`}
              className="category-card flex flex-col items-center justify-center gap-2 rounded-lg border-2 bg-secondary py-5 font-bold hover:border-accent-1"
            >
              <Image
                src={category.image}
                alt={category.name}
                className="w-14"
              />
              <h1 className="text-md">{category.name}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
