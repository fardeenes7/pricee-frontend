import { notFound } from "next/navigation";
// import { useEffect } from "react";
import Breadcrumb from "../../../components/navigation/breadcrumb";
import ImageSection from "./ImageSection";
import TitleSection from "./TitleSection";
import InfoSection from "./InfoSection";
import Suggestions from "./Suggestions";
import RecordProductView from "./recordView";
// import dynamic from "next/dynamic";

async function getData({ slug }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    }
  );
  console.log(res.status);
  if (!res.ok) return undefined;
  return res.json();
}

export async function generateMetadata({ params }) {
  const product = await getData({ slug: params.slug });

  if (!product) {
    return {
      title: "Product Not Found",
      openGraph: {
        title: "Product Not Found",
      },
    };
  } else {
    return {
      title: product.name + " | Pricee",
      openGraph: {
        title: product.name + " | Pricee",
        images: [
          {
            url: `${process.env.HOST}/api/og/product?title=${product.name}&image=${product.images[0].href}`,
            alt: product.name,
            height: 630,
            width: 1200,
          },
        ],
      },
    };
  }
}

export default async function Product({ params }) {
  const { slug } = params;
  const data = await getData({ slug });
  if (!data) {
    notFound();
  }
  const cat = [
    {
      name: data.sub_category.category,
      href: `/category/${data.sub_category.category_slug}`,
    },
    {
      name: data.sub_category.name,
      href: `/category/${data.sub_category.category_slug}/${data.sub_category.slug}`,
    },
    {
      name: data.name,
      href: `/product/${slug}`,
    },
  ];
  if (data)
    return (
      <div className="flex h-full w-full flex-col gap-4">
        <RecordProductView id={data.id} />
        <Breadcrumb cat={cat[0]} subcat={cat[1]} product={cat[2]} />
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <ImageSection images={data.images} />
          </div>
          <div className="md:col-span-2">
            <TitleSection
              name={data.name}
              best_price={data.best_price}
              links={data.links}
              brand={data.brand}
              model={data.model}
            />
          </div>
          <div className="md:col-span-3">
            <InfoSection features={data.features} />
          </div>
          <div>
            <Suggestions products={data.suggestions} />
          </div>
        </div>
      </div>
    );
}
