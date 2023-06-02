import Link from "next/link";
import BannerGrid from "components/landing/bannergrid";
import CategoryGrid from "@/components/landing/CategoryGrid";
import ProductGrid from "components/products/ProductGrid";

export const metadata = {
  title: "Pricee: Find the Best Deals",
  description:
    "Pricee is your go-to platform for comparing prices, saving money, and making informed purchasing decisions.",
};

export default async function Home() {
  return (
    <div className="">
      <BannerGrid />
      <CategoryGrid />
      <ProductGrid />
    </div>
  );
}
