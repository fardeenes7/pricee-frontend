async function getData({ slug }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Product({ params }) {
  const { slug } = params;
  const data = await getData({ slug });

  return <div>{data.name}</div>;
}
