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

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3">
        <div>
          <img
            src={data.images[0].href}
            className="h-full w-full"
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          ></img>
        </div>
        <div className="col-span-2">
          <h1 className="text-md font-bold">{data.name}</h1>
          <h2>{data.best_price}</h2>
        </div>
        <div></div>
      </div>
    </div>
  );
}
