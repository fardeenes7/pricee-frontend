import ProductGrid from "@/components/products/ProductGrid";

export default function ProductSubCategory({ params }) {
  const { subcategory } = params;

  return <ProductGrid subcategory={subcategory} />;
}
