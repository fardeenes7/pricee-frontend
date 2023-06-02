import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/priceetextlogo.svg";
import Previous from "./previous";
export default function Maintenance() {
  return (
    <main className="mx-auto my-32 flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-shrink-0 justify-center">
        <Link href="/" className="inline-flex">
          <span className="sr-only">Logo</span>
          <Image className="h-12 w-auto" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-1">
            Coming soon!
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Page under development
          </h1>
          <p className="mt-2 text-base text-gray-500">
            This feature is still under development. Please check back later.
          </p>

          <Previous />
        </div>
      </div>
    </main>
  );
}
