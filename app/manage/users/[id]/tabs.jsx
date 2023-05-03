"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Tabs({ id }) {
  const [tabs, setTabs] = useState([
    { name: "Profile", href: `/manage/users/${id}`, current: true },
    { name: "Edit", href: `/manage/users/${id}/edit`, current: false },
    {
      name: "Delete Account",
      href: `/manage/users/${id}/delete`,
      current: false,
    },
  ]);
  const router = useRouter();
  const handleTabClick = (id) => {
    const newTabs = tabs.map((tab, idx) => {
      if (idx === id) {
        tab.current = true;
      } else {
        tab.current = false;
      }
      return tab;
    });
    setTabs(newTabs);
    router.push(tabs[id].href);
  };
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, id) => (
              <button
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-pink-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
                onClick={(e) => handleTabClick(id)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
