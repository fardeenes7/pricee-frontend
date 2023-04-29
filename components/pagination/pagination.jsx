"use client";
import { useState } from "react";
import Link from "next/link";

function classnames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
  const [page, setPage] = useState(currentPage);
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

  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="mt-4 flex justify-center">
      <nav className="block">
        <ul className="flex list-none flex-wrap rounded pl-0">
          {!isFirstPage && (
            <li>
              <Link
                href={`${baseUrl}?page=${prevPage}`}
                className="rounded-l-lg border-l border-t border-gray-300 bg-gray-200 px-3 py-2 hover:bg-gray-300"
              >
                Prev
              </Link>
            </li>
          )}

          {page > range + 1 && (
            <>
              <li>
                <Link
                  href={`${baseUrl}?page=1`}
                  className="border-l border-t border-gray-300 bg-gray-200 px-3 py-2 hover:bg-gray-300"
                >
                  1
                </Link>
              </li>
              {page > range + 2 && (
                <li>
                  <span className="border-l border-t border-gray-300 px-3 py-2">
                    ...
                  </span>
                </li>
              )}
            </>
          )}

          {pages.map((pageNumber) => (
            <li key={pageNumber}>
              <Link
                href={`${baseUrl}?page=${pageNumber}`}
                className={classnames(
                  "border-l border-t border-gray-300 px-3 py-2",
                  {
                    "bg-blue-500 font-bold text-white": pageNumber === page,
                    "hover:bg-blue-500 hover:text-white": pageNumber !== page,
                  }
                )}
              >
                {pageNumber}
              </Link>
            </li>
          ))}

          {page < totalPages - range && (
            <>
              {page < totalPages - range - 1 && (
                <li>
                  <span className="border-l border-t border-gray-300 px-3 py-2">
                    ...
                  </span>
                </li>
              )}
              <li>
                <Link
                  href={`${baseUrl}?page=${totalPages}`}
                  className="border-l border-t border-gray-300 bg-gray-200 px-3 py-2 hover:bg-gray-300"
                >
                  {totalPages}
                </Link>
              </li>
            </>
          )}

          {!isLastPage && (
            <li>
              <Link href={`${baseUrl}?page=${nextPage}`} className="rounded-r-lg border-l border-t border-gray-300 bg-gray-200 px-3 py-2 hover:bg-gray-300">
                  Next
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
