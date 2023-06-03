import Link from "next/link";
export default function NotFound() {
  return (
    <div class="my-16 grid place-content-center px-4">
      <div class="text-center">
        <h1 class="text-9xl font-black text-gray-600">404</h1>

        <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p class="mt-4 text-gray-500">We can't find that page.</p>

        <Link
          href="/"
          class="mt-6 inline-block rounded bg-accent-1 px-5 py-3 text-sm font-medium text-white hover:bg-accent-2 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
