"use client";
/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
const page = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

export default function Breadcrumb(props) {
  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 md:space-x-4">
        <li>
          <div>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <i
                className="fa-solid fa-house h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              ></i>
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        <li key={props.cat.name}>
          <div className="flex items-center">
            <i
              className="fa-solid fa-chevron-right h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            ></i>
            <Link
              href={props.subcat ? props.cat.href : "#"}
              className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-4"
              aria-current={props.subcat ? "page" : undefined}
            >
              {props.cat.name}
            </Link>
          </div>
        </li>
        {props.subcat && (
          <li key={props.subcat.name}>
            <div className="flex items-center">
              <i
                className="fa-solid fa-chevron-right h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              ></i>
              <Link
                href={props.product ? props.subcat.href : "#"}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-4"
                aria-current={props.product ? "page" : undefined}
              >
                {props.subcat.name}
              </Link>
            </div>
          </li>
        )}
        {props.product && (
          <li key={props.product.name}>
            <div className="flex items-center">
              <i
                className="fa-solid fa-chevron-right h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              ></i>
              <Link
                href="#"
                className="ml-2 overflow-clip text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-4"
                aria-current={props.product ? "page" : undefined}
              >
                {props.product.name}
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}
