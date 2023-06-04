"use client";
import Link from "next/link";
import React from "react";
import RenderPDF from "./renderPDF";
import { useState, useEffect, Fragment } from "react";
import { RadioGroup, Listbox, Transition, Switch } from "@headlessui/react";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_MANAGE_URL}/report/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const shops = [
  {
    id: 1,
    name: "Techland",
    description: "Last message sent an hour ago",
    logo: "https://www.techlandbd.com/image/cache/wp/gp/techland/logo/techland-white-logo-300x48.webp",
  },
  {
    id: 2,
    name: "Ryans",
    description: "Last message sent 2 weeks ago",
    logo: "https://www.ryanscomputers.com/assets/images/ryans-logo.svg",
  },
  {
    id: 3,
    name: "Startech",
    description: "Last message sent 4 days ago",
    logo: "https://www.startech.com.bd/image/catalog/logo.png",
  },
];

const years = [{ id: 2023, name: "2023" }];
const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Report() {
  const [selectedShop, setSelectedShop] = useState(shops[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [encryption, setEncryption] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <a
            href="#"
            className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
          >
            <i
              className="fa-solid fa-chevron-left -ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-500"
              aria-hidden="true"
            />
            Back
          </a>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link
                  href="/manage"
                  className="text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <i
                  className="fa-solid fa-chevron-right h-5 w-5 flex-shrink-0 text-gray-500"
                  aria-hidden="true"
                />
                <Link
                  href="/manage/reports"
                  className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
                >
                  Generate Report
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="">
        <div className="mx-auto mt-2 max-w-2xl">
          <div className="mt-4 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:truncate sm:text-3xl">
                Generate PDF Report
              </h2>
            </div>
          </div>
          <RadioGroup
            value={selectedShop}
            onChange={setSelectedShop}
            className="mt-4"
          >
            <RadioGroup.Label className="text-base font-medium text-gray-900">
              Select Shop
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {shops.map((shop) => (
                <RadioGroup.Option
                  key={shop.id}
                  value={shop}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? "border-transparent" : "border-gray-300",
                      active ? "border-accent-1 ring-2 ring-accent-1" : "",
                      "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      <div className="flex flex-1">
                        <div className="flex flex-col justify-between ">
                          <RadioGroup.Label
                            as="span"
                            className="block text-sm font-medium text-gray-900"
                          >
                            {shop.name}
                          </RadioGroup.Label>
                          <img src={shop.logo} className="mx-auto mt-4 w-24" />
                        </div>
                      </div>
                      <i
                        className={classNames(
                          !checked ? "invisible" : "",
                          "fa-solid fa-circle-check text-accent-2"
                        )}
                        aria-hidden="true"
                      />
                      <div
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-accent-1" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-lg"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Listbox value={selectedYear} onChange={setSelectedYear}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="text-md block font-medium text-gray-700">
                      Select Year
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-accent-1 focus:outline-none focus:ring-1 focus:ring-accent-1 sm:text-sm">
                        <span className="block truncate">
                          {selectedYear.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <i
                            className="fa-solid fa-arrows-up-down text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {years.map((year) => (
                            <Listbox.Option
                              key={year.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-accent-2 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={year}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {year.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-accent-2",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <i
                                        className="fa-solid fa-check"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div>
              <Listbox value={selectedMonth} onChange={setSelectedMonth}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="text-md block font-medium text-gray-700">
                      Select Month
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-accent-1 focus:outline-none focus:ring-1 focus:ring-accent-1 sm:text-sm">
                        <span className="block truncate">
                          {selectedMonth.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <i
                            className="fa-solid fa-arrows-up-down text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {months.map((month) => (
                            <Listbox.Option
                              key={month.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-accent-2 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={month}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {month.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-accent-2",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <i
                                        className="fa-solid fa-check"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="mt-2">
              <Switch.Group
                as="div"
                className="flex items-center justify-between"
              >
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">
                    Encryption
                  </span>
                </Switch.Label>
                <Switch
                  checked={encryption}
                  onChange={setEncryption}
                  className={classNames(
                    encryption ? "bg-accent-2" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      encryption ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                aria-describedby="email-description"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                {...(!encryption && { disabled: true })}
              />
            </div>
          </div>
          <RenderPDF
            shop={selectedShop}
            year={selectedYear}
            month={selectedMonth}
            encryption={encryption}
            password={password}
          />
        </div>
      </div>
    </div>
  );
}
