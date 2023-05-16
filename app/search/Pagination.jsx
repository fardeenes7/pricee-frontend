"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function classnames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pagination = ({ status, totalPages, setPage }) => {
  const baseUrl = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [goToPage, setGoToPage] = useState(currentPage);
  const range = 2;
  const pages = [];
  const page = currentPage;

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
    <div className="flex items-center justify-between border-t border-gray-200  py-3">
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
              onClick={() => setPage(goToPage)}
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {/* <Link href={`${baseUrl}?page=${goToPage}`}>Go</Link> */}
              Go
            </button>
          </div>
        </div>

        <div className="text-sm">
          Showing{" "}
          <span className="font-medium">
            <span className="font-medium">{status.startproduct}</span> to{" "}
            {status.endproduct}
          </span>{" "}
          of <span className="font-medium">{status.totalproducts}</span>{" "}
          products.
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => setPage(prevPage)}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="">Previous</span>
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {page > range - 2 && (
              <>
                <button
                  onClick={() => setPage(1)}
                  className={classnames(
                    "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                    page === 1 ? activePage : defaultPage
                  )}
                >
                  1
                </button>
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
              <button
                onClick={() => setPage(pageNumber)}
                className={classnames(
                  "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                  page === pageNumber ? activePage : defaultPage
                )}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            ))}

            {page < totalPages - range + 3 && totalPages != 1 && (
              <>
                {page < totalPages - range - 2 && (
                  <span className="relative inline-flex items-center border px-4 py-2 text-sm font-medium">
                    ...
                  </span>
                )}
                <button
                  onClick={() => setPage(totalPages)}
                  className={classnames(
                    "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                    page === totalPages ? activePage : defaultPage
                  )}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              // href={`${baseUrl}?page=${nextPage}`}
              onClick={() => setPage(nextPage)}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="">Next</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
