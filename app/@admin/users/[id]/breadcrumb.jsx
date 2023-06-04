"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Breadcrumb({ name }) {
  const router = useRouter();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i
                className="fa-solid fa-home h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <i
              className="fa-solid fa-chevron-right h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => router.back()}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Users
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <i
              className="fa-solid fa-chevron-right h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              aria-current="page"
            >
              {name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
