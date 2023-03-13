import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumb from "../../../../components/navigation/breadcrumb";

export default function ProductSubCategory({ params }) {
  const { subcategory } = params;
  const cat = {
    name: params.category.replace(/-/g, " ").toUpperCase(),
    href: `/category/${params.category}`,
  };

  const sub = {
    name: subcategory.replace(/-/g, " ").toUpperCase(),
    href: `/category/${params.category}/${subcategory}`,
  };
  return (
    <>
      <Breadcrumb cat={cat} subcat={sub} />
      <ProductGrid subcategory={subcategory} />
    </>
  );
}
