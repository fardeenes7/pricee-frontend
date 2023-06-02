import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumb from "../../../components/navigation/breadcrumb";
export async function generateMetadata({ params }, parent) {
  const category = params.category;

  return {
    title: "Category: " + category,
    description: "Find the best deals for " + category + " only on Pricee",
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

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
