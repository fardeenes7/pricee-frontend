"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Logo from "@/public/pricee.svg";
import TextLogo from "@/public/priceewhitetextlogo.svg";
import { getUser } from "@/components/auth/getUser";
import { checkPermission } from "@/components/manage/checkPermission";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/extras/Loading";
import Image from "next/image";

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
  { name: "Documents", href: "#", icon: "fa solid fa-bell", current: false },
  {
    name: "Reports",
    href: "/manage/reports",
    icon: "fa solid fa-bell",
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
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

  useEffect(() => {
    const check_permission = async () => {
      const staff = await checkPermission();
      if (staff) {
        setIsStaff(staff);
      } else {
        router.push("/user/profile");
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
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href.startsWith(pathname)
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          <i
                            className={classNames(
                              item.href.startsWith(pathname)
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              `ml-2 mr-3 flex-shrink-0 ${item.icon}`
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
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
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                      )}
                    >
                      <i
                        className={classNames(
                          item.href.startsWith(pathname)
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          `ml-2 mr-3 flex-shrink-0 ${item.icon} text-sm`
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
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
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${user.profile_pic}`}
                          // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
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
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
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
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Admin Dashboard
                  </h1>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
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
