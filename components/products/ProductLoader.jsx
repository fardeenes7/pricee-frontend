export default function ProductLoader() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(5)].map((e) => (
        <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border-2 shadow-lg">
          <div className="flex-shrink-0">
            <div className="h-48 w-full bg-gray-300"></div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-4 bg-white p-4">
            <div className="h-4 w-full rounded-md bg-gray-300"></div>

            <div className="flex items-center justify-between">
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-24 rounded-md bg-gray-300"></div>
                <div className="h-4 w-12 rounded-md bg-gray-300"></div>
              </div>
              <div className="h-8 w-8 rounded-md bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
