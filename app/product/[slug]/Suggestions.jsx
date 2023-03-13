import Link from "next/link";

export default function Suggestions({ products }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-4 text-2xl font-bold">Similar Products</h2>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, key }) {
  return (
    <Link
      href={"/product/" + product.slug}
      className="grid grid-cols-3 gap-4 rounded-lg border-2 bg-white p-1 hover:border-accent-1"
      key={key}
    >
      <img
        src={product.image.href}
        alt={product.image.alt}
        className="my-auto rounded-md"
      />
      <div className="col-span-2 w-full rounded-b-md bg-white p-4">
        <h3 className="mb-2 text-sm font-medium md:text-xs">{product.name}</h3>
        <p className="text-xs font-bold ">Best Price: {product.best_price}</p>
      </div>
    </Link>
  );
}
