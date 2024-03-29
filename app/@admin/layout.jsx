"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import TextLogo from "@/public/priceewhitetextlogo.svg";
import { getUser } from "@/components/auth/getUser";
import { checkPermission } from "@/components/manage/checkPermission";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/extras/Loading";
import Image from "next/image";
import Link from "next/link";

import NextNProgress from "nextjs-progressbar";

const navigation = [
  {
    name: "Dashboard",
    href: "/manage",
    icon: "fa solid fa-bell",
    current: true,
  },
  {
    name: "Users",
    href: "/manage/users",
    icon: "fa solid fa-bell",
    current: false,
  },
  {
    name: "Products",
    href: "/manage/products",
    icon: "fa solid fa-bell",
    current: false,
  },
  {
    name: "Blog",
    href: "/manage/blog",
    icon: "fa solid fa-bell",
    current: false,
  },
  {
    name: "Documents",
    href: "/manage/documents",
    icon: "fa solid fa-bell",
    current: false,
  },
  {
    name: "Reports",
    href: "/manage/reports",
    icon: "fa solid fa-bell",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ManageLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [is_staff, setIsStaff] = useState(false);
  let userNavigation = [
    { name: "Your Profile", href: "/manage/users" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  useEffect(() => {
    const check_permission = async () => {
      const staff = await checkPermission();
      if (staff) {
        setIsStaff(staff);
      }
    };
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    };
    if (!is_staff) {
      check_permission();
    }
    if (user === null) {
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString && JSON.parse(userDataString);
      setUser(userData);
      if (user === null) {
        fetchData();
      }
      setLoading(false);
    }
    userNavigation[0].href = "/manage/users/" + user?.id;
  }, [is_staff]);

  if (loading) {
  }
  if (loading) {
    return <Loading />;
  } else if (!user) {
    return noPermission();
  } else {
    return (
      <>
        <div className="fixed top-0 z-50 w-full">
          <NextNProgress />
        </div>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-40 flex md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 flex-col items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <i
                          className="fa-solid fa-x  text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Image className="h-8 w-auto" src={TextLogo} alt="Pricee" />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === "/manage" && pathname === "/manage"
                              ? "bg-gray-900 text-white"
                              : (item.href != "/manage") ===
                                pathname.startsWith(item.href)
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          <i
                            className={classNames(
                              pathname.startsWith(item.href)
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              `ml-2 mr-3 flex-shrink-0 ${item.icon}`
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
              <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                <Image
                  className="h-8 w-auto"
                  // src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  src={TextLogo}
                  alt="Pricee"
                />
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex-1 space-y-1 px-2 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.href === "/manage" && pathname === "/manage"
                          ? "bg-gray-900 text-white"
                          : (item.href != "/manage") ===
                            pathname.startsWith(item.href)
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                      )}
                    >
                      <i
                        className={classNames(
                          pathname.startsWith(item.href)
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          `ml-2 mr-3 flex-shrink-0 ${item.icon} text-sm`
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:pl-64">
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <i className="fa-solid fa-bars h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between px-4">
                <div className="flex flex-1">
                  <div className="flex h-full w-full  flex-col items-start justify-center md:ml-0">
                    <h1 className="text-md font-bold">
                      Hi, {user.name ? user.name : user.username}
                    </h1>
                  </div>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <i
                      className="fa-solid fa-bell h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 lg:rounded-md lg:px-2 lg:py-1 lg:hover:bg-gray-50">
                        <img
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${user.profile_pic}`}
                          className="h-6 w-6 rounded-full"
                          alt=""
                        />
                        <span className="ml-3 hidden text-sm font-bold text-gray-700 lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {user.name ? user.name : user.username}
                        </span>
                        <i
                          className="fa-solid fa-chevron-down ml-2 hidden flex-shrink-0 text-gray-400 lg:block"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm font-medium text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <main className="flex-1">
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                  {/* Replace with your content */}
                  {children}
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
}
function noPermission() {
  return (
    <div>
      <h1>You don't have permission to view this page.</h1>
    </div>
  );
}
