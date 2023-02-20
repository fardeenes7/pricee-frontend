import Product from "../products/Product";

export default function ProductGrid({ data }) {
  return (
    <div className="product-grid">
      <h1 className="mb-4 text-2xl font-bold">Popular Products</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {data.map((product, id) => (
          <Product product={product} key={id} />
        ))}
      </div>
    </div>
  );
}
