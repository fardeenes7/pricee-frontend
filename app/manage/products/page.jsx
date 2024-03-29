import Pagination from "@/components/pagination/pagination";

async function getData(page) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/products?page=${page}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Products({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const data = await getData(page);
  const totalPages = Math.ceil(data.count / 10);

  return (
    <div className="overflow-hidden">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Best Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Shops
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.results.map((product) => (
                    <tr key={product.name}>
                      <td className="pl-4 pr-3 font-bold text-gray-900">
                        <span className="text-xs">{product.id}</span>
                      </td>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={product.image.href}
                              alt=""
                            />
                          </div>
                          <div className="ml-4 max-w-md md:max-w-xl lg:max-w-3xl">
                            <div className="font-medium text-gray-900">
                              <p className="truncate">{product.name}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {product.best_price}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {product.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
