import Link from "next/link";
import BannerGrid from "components/landing/bannergrid";
import CategoryGrid from "@/components/landing/CategoryGrid";
import ProductGrid from "components/products/ProductGrid";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/landing`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Home() {
  const data = await getData();

  return (
    <div className="">
      <BannerGrid data={data.bannerAds} />
      <CategoryGrid data={data.categories} />
      <ProductGrid products={data.products} />
    </div>
  );
}
