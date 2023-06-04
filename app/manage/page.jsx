import Link from "next/link";
import Chart from "./Chart";
// import LinkClickChart from "./linkClickChart";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/dashboard/`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export default async function Manage() {
  const data = await getData();

  return (
    <div>
      <Stats data={data.stats} />
      <div class="mt-10  grid grid-cols-1 gap-4 sm:mt-4 lg:grid-cols-2">
        {data.charts.map((chart) => (
          <div className="w-full rounded-lg border bg-white p-4 shadow-lg">
            <h2 className="mb-4 mt-2 text-center text-xl font-bold">
              {chart.title}
            </h2>
            <Chart data={chart} />
          </div>
        ))}
      </div>
    </div>
  );
}
function Stats({ data }) {
  return (
    <div>
      <h3 class="text-lg font-medium leading-6 text-gray-900">Statistics</h3>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt class="truncate text-sm font-medium text-gray-500">
            Total Users
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {data.totalUsers}
          </dd>
        </div>

        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt class="truncate text-sm font-medium text-gray-500">
            Total Products
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {data.totalProducts}
          </dd>
        </div>

        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt class="truncate text-sm font-medium text-gray-500">
            Total Product Views
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {data.totalProductViews}
          </dd>
        </div>
      </dl>
    </div>
  );
}
