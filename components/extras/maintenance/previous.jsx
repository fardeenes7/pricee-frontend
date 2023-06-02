"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Previous() {
  const router = useRouter();
  const path = usePathname();
  let home = "/";
  if (path.startsWith("/manage")) {
    home = "/manage";
  }
  return (
    <div className="mt-6 flex justify-between md:justify-evenly">
      <button
        type="button"
        className="text-base font-medium text-accent-1 hover:text-accent-2"
        onClick={() => router.back()}
      >
        <span aria-hidden="true"> &larr;</span> Go to previous
      </button>
      <Link
        href={home}
        type="button"
        className="text-base font-medium text-accent-1 hover:text-accent-2"
      >
        Go back home<span aria-hidden="true"> &rarr;</span>
      </Link>
    </div>
  );
}
