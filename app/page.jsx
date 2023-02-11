import Link from 'next/link';
async function getData() {
  const res = await fetch(`${process.env.API_BASE_URL}/products/all/`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}


export default async function Home() {
  const data = await getData();

  return (
    <main className="mx-auto w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="p-4 flex justify-between items-center">
              <p className="text-xl font-bold">${product.price}</p>
              <Link href={`/${product.slug}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
