import ProductGrid from "@/components/products/ProductGrid";

export default function ProductCategory({ params }) {
  const { category } = params;
  if (category === "all") {
    return <ProductGrid />;
  }

  return <ProductGrid category={category} />;
}
