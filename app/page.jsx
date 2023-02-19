import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.API_BASE_URL}/products/all/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return <main className="mx-auto w-full max-w-7xl px-4"></main>;
}
