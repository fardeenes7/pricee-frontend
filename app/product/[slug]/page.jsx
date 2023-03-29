import Breadcrumb from "../../../components/navigation/breadcrumb";
import ImageSection from "./ImageSection";
import TitleSection from "./TitleSection";
import InfoSection from "./InfoSection";
import Suggestions from "./Suggestions";

async function getData({ slug }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const product = await getData({ slug: params.slug });
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

export default async function Product({ params }) {
  const { slug } = params;
  const data = await getData({ slug });
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

  return (
    <div className="flex flex-col gap-4">
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
