import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumb from "../../../components/navigation/breadcrumb";

export default function ProductCategory({ params }) {
  const { category } = params;
  const cat = {
    name: category.replace(/-/g, " ").toUpperCase(),
    href: `/category/${category}`,
  };
  if (category === "all") {
    return <ProductGrid />;
  }

  return (
    <>
      <Breadcrumb cat={cat} />
      <ProductGrid category={category} />
    </>
  );
}
