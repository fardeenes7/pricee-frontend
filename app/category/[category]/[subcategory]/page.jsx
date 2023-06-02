import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumb from "../../../../components/navigation/breadcrumb";

export async function generateMetadata({ params }, parent) {
  const category = params.subcategory;

  return {
    title: "Category: " + category,
    description: "Find the best deals for " + category + " only on Pricee",
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

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
