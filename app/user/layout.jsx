"use client";
import "./style.css";

import Loading from "@/components/extras/Loading";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUser } from "@/components/auth/getUser";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    };
    if (user === null) {
      fetchData();
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else if (!user) {
    return noUser();
  } else {
    return User(user, children);
  }
}

function noUser() {
  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <h1>Please Log in</h1>
      </div>
    </div>
  );
}

const userMenu = [
  {
    name: "Profile",
    icon: "fa-user",
    link: "/user/profile",
  },
  {
    name: "My Blog Posts",
    icon: "fa-blog",
    link: "/user/blog",
  },
  {
    name: "Settings",
    icon: "fa-gear",
    link: "/user/settings",
  },
  {
    name: "Logout",
    icon: "fa-right-from-bracket",
    link: "/user/logout",
  },
];

function User(user, children) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
      <div className="relative">
        <div className="card sticky top-20">
          <div className="flex flex-row justify-between md:flex-col ">
            {userMenu.map((item) => (
              <Link
                href={item.link}
                className="group flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-200"
              >
                <div className="flex h-8 w-8 flex-col items-center justify-center rounded-full  group-hover:bg-white ">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h1
                  className={`text-sm font-medium group-hover:text-black ${
                    pathname === item.link
                      ? "font-bold text-black"
                      : "text-gray-500"
                  }`}
                >
                  {item.name}
                </h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:col-span-3 lg:col-span-4">
        {children}
      </div>
    </div>
  );
}
