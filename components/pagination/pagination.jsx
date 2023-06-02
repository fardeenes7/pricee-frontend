"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function classnames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pagination = ({ currentPage, totalPages }) => {
  const baseUrl = usePathname();
  const [page, setPage] = useState(currentPage);
  const [goToPage, setGoToPage] = useState(page);
  const range = 2;
  const pages = [];

  for (
    let i = Math.max(2, page - range);
    i <= Math.min(totalPages - 1, page + range);
    i++
  ) {
    pages.push(i);
  }

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const prevPage = page === 1 ? 1 : page - 1;
  const nextPage = page === totalPages ? totalPages : page + 1;

  const activePage = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600";
  const defaultPage = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={`${baseUrl}?page=${prevPage}`}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          href={`${baseUrl}?page=${nextPage}`}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-700">Jump to page </span>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="number"
                className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min={1}
                max={totalPages}
                onChange={(e) => setGoToPage(e.target.value)}
                placeholder={page}
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <Link href={`${baseUrl}?page=${goToPage}`}>Go</Link>
            </button>
          </div>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              href={`${baseUrl}?page=${prevPage}`}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="">Previous</span>
            </Link>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {page > range - 2 && (
              <>
                <Link
                  href={`${baseUrl}?page=1`}
                  className={classnames(
                    "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                    page === 1 ? activePage : defaultPage
                  )}
                >
                  1
                </Link>
                {page > range + 2 && (
                  <a disabled>
                    <span className="relative inline-flex items-center border px-4 py-2 text-sm font-medium">
                      ...
                    </span>
                  </a>
                )}
              </>
            )}
            {pages.map((pageNumber) => (
              <Link
                href={`${baseUrl}?page=${pageNumber}`}
                className={classnames(
                  "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                  page === pageNumber ? activePage : defaultPage
                )}
                key={pageNumber}
              >
                {pageNumber}
              </Link>
            ))}

            {page < totalPages - range + 3 && totalPages != 1 && (
              <>
                {page < totalPages - range - 2 && (
                  <span className="relative inline-flex items-center border px-4 py-2 text-sm font-medium">
                    ...
                  </span>
                )}
                <Link
                  href={`${baseUrl}?page=${totalPages}`}
                  className={classnames(
                    "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                    page === totalPages ? activePage : defaultPage
                  )}
                >
                  {totalPages}
                </Link>
              </>
            )}

            <Link
              href={`${baseUrl}?page=${nextPage}`}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="">Next</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
