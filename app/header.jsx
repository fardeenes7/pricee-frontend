"use client";

import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition, Menu } from "@headlessui/react";
import Link from 'next/link';



const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

const navigation2 = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Sleep", href: "#" },
        { name: "Swimwear", href: "#" },
        { name: "Underwear", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Underwear", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Significant Other", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

// const navigation = {
//   "categories": [
//     {
//       "name": "Laptop & Tablet",
//       "slug": "laptop-tablet",
//       "subcategories": [
//         {
//           "name": "Laptop Ram",
//           "slug": "laptop-ram"
//         },
//         {
//           "name": "Tablet PC",
//           "slug": "tablet-pc"
//         },
//         {
//           "name": "Laptop",
//           "slug": "laptop"
//         },
//         {
//           "name": "Laptop Battery",
//           "slug": "laptop-battery"
//         },
//         {
//           "name": "Laptop Accessories",
//           "slug": "laptop-accessories"
//         },
//         {
//           "name": "Laptop Cooler",
//           "slug": "laptop-cooler"
//         },
//         {
//           "name": "Graphics Tablet",
//           "slug": "graphics-tablet"
//         },
//         {
//           "name": "Gaming Laptops",
//           "slug": "gaming-laptops"
//         }
//       ]
//     },
//     {
//       "name": "Accessories",
//       "slug": "accessories",
//       "subcategories": [
//         {
//           "name": "WebCam",
//           "slug": "webcam"
//         },
//         {
//           "name": "Combo",
//           "slug": "combo"
//         },
//         {
//           "name": "Pen Drive",
//           "slug": "pen-drive"
//         },
//         {
//           "name": "HDD-SSD Enclosure",
//           "slug": "hdd-ssd-enclosure"
//         },
//         {
//           "name": "Power Bank",
//           "slug": "power-bank"
//         },
//         {
//           "name": "Cable & convertor",
//           "slug": "cable-convertor"
//         },
//         {
//           "name": "Casing Fan",
//           "slug": "casing-fan"
//         },
//         {
//           "name": "Keyboard",
//           "slug": "keyboard"
//         },
//         {
//           "name": "Mouse",
//           "slug": "mouse"
//         },
//         {
//           "name": "Mouse pad",
//           "slug": "mouse-pad"
//         },
//         {
//           "name": "Memory Card",
//           "slug": "memory-card"
//         },
//         {
//           "name": "Apple Pencil",
//           "slug": "apple-pencil"
//         },
//         {
//           "name": "Gpu Vertical Mount",
//           "slug": "gpu-vertical-mount"
//         },
//         {
//           "name": "Sound Card",
//           "slug": "sound-card"
//         },
//         {
//           "name": "Capture Card",
//           "slug": "capture-card"
//         },
//         {
//           "name": "USB HUB",
//           "slug": "usb-hub"
//         },
//         {
//           "name": "Presenter",
//           "slug": "presenter"
//         },
//         {
//           "name": "Bluetooth Receiver",
//           "slug": "bluetooth-receiver"
//         },
//         {
//           "name": "Power Strip",
//           "slug": "power-strip"
//         },
//         {
//           "name": "Mouse Bungee",
//           "slug": "mouse-bungee"
//         },
//         {
//           "name": "Thermal Paste",
//           "slug": "thermal-paste"
//         },
//         {
//           "name": "LED Strip",
//           "slug": "led-strip"
//         },
//         {
//           "name": "Keyboard Keycaps",
//           "slug": "keyboard-keycaps"
//         },
//         {
//           "name": "Floor Mat",
//           "slug": "floor-mat"
//         },
//         {
//           "name": "Wrist Pad",
//           "slug": "wrist-pad"
//         },
//         {
//           "name": "RGB Controller",
//           "slug": "rgb-controller"
//         },
//         {
//           "name": "Splitter",
//           "slug": "splitter"
//         },
//         {
//           "name": "VGA Holder",
//           "slug": "vga-holder"
//         },
//         {
//           "name": "Gamepad",
//           "slug": "gamepad"
//         },
//         {
//           "name": "Hubs & Docks",
//           "slug": "hubs-docks"
//         }
//       ]
//     },
//     {
//       "name": "Components",
//       "slug": "components",
//       "subcategories": [
//         {
//           "name": "Storage",
//           "slug": "storage"
//         },
//         {
//           "name": "Desktop Ram",
//           "slug": "desktop-ram"
//         },
//         {
//           "name": "Motherboard",
//           "slug": "motherboard"
//         },
//         {
//           "name": "Graphics Card",
//           "slug": "graphics-card"
//         },
//         {
//           "name": "Computer Case",
//           "slug": "computer-case"
//         },
//         {
//           "name": "Power Supply",
//           "slug": "power-supply"
//         },
//         {
//           "name": "CPU Cooler",
//           "slug": "cpu-cooler"
//         },
//         {
//           "name": "Combo",
//           "slug": "combo"
//         },
//         {
//           "name": "Processor",
//           "slug": "processor"
//         },
//         {
//           "name": "MB/Processor Combo",
//           "slug": "mbprocessor-combo"
//         },
//         {
//           "name": "Custom Cooling Kit",
//           "slug": "custom-cooling-kit"
//         }
//       ]
//     },
//     {
//       "name": "Office Equipment",
//       "slug": "office-equipment",
//       "subcategories": [
//         {
//           "name": "IP Phone/PABX",
//           "slug": "ip-phonepabx"
//         },
//         {
//           "name": "PA SYSTEM",
//           "slug": "pa-system"
//         },
//         {
//           "name": "Printers",
//           "slug": "printers"
//         },
//         {
//           "name": "Toner & Cartridge",
//           "slug": "toner-cartridge"
//         },
//         {
//           "name": "Signage",
//           "slug": "signage"
//         },
//         {
//           "name": "Interactive Board",
//           "slug": "interactive-board"
//         },
//         {
//           "name": "Paper Shredder",
//           "slug": "paper-shredder"
//         },
//         {
//           "name": "Conference Systems",
//           "slug": "conference-systems"
//         },
//         {
//           "name": "Scanner",
//           "slug": "scanner"
//         },
//         {
//           "name": "Barcode Scanner",
//           "slug": "barcode-scanner"
//         },
//         {
//           "name": "POS Printer",
//           "slug": "pos-printer"
//         },
//         {
//           "name": "Photocopier",
//           "slug": "photocopier"
//         },
//         {
//           "name": "Cutter Blade",
//           "slug": "cutter-blade"
//         },
//         {
//           "name": "Print Head",
//           "slug": "print-head"
//         },
//         {
//           "name": "Label Printer",
//           "slug": "label-printer"
//         },
//         {
//           "name": "Weight Scale",
//           "slug": "weight-scale"
//         },
//         {
//           "name": "Laminating Machine",
//           "slug": "laminating-machine"
//         },
//         {
//           "name": "Binding Machine",
//           "slug": "binding-machine"
//         },
//         {
//           "name": "Ink Bottle",
//           "slug": "ink-bottle"
//         },
//         {
//           "name": "Measurement Machine",
//           "slug": "measurement-machine"
//         },
//         {
//           "name": "Cash Drawer",
//           "slug": "cash-drawer"
//         }
//       ]
//     },
//     {
//       "name": "TV & Speaker",
//       "slug": "tv-speaker",
//       "subcategories": [
//         {
//           "name": "TV-Box",
//           "slug": "tv-box"
//         },
//         {
//           "name": "Speakers",
//           "slug": "speakers"
//         },
//         {
//           "name": "Portable Speaker",
//           "slug": "portable-speaker"
//         },
//         {
//           "name": "Wall Mount",
//           "slug": "wall-mount"
//         },
//         {
//           "name": "Television",
//           "slug": "television"
//         }
//       ]
//     },
//     {
//       "name": "Gadgets",
//       "slug": "gadgets",
//       "subcategories": [
//         {
//           "name": "Smart Watch & Gadget",
//           "slug": "smart-watch-gadget"
//         }
//       ]
//     },
//     {
//       "name": "Cameras",
//       "slug": "cameras",
//       "subcategories": [
//         {
//           "name": "Action Camera",
//           "slug": "action-camera"
//         },
//         {
//           "name": "DSLR Cameras",
//           "slug": "dslr-cameras"
//         },
//         {
//           "name": "Digital Camera",
//           "slug": "digital-camera"
//         },
//         {
//           "name": "Camera Accessories",
//           "slug": "camera-accessories"
//         },
//         {
//           "name": "Conferencing Camera",
//           "slug": "conferencing-camera"
//         }
//       ]
//     },
//     {
//       "name": "Router & Network",
//       "slug": "router-network",
//       "subcategories": [
//         {
//           "name": "Receiver",
//           "slug": "receiver"
//         },
//         {
//           "name": "Wifi-Adapter",
//           "slug": "wifi-adapter"
//         },
//         {
//           "name": "Network Switch",
//           "slug": "network-switch"
//         },
//         {
//           "name": "Access Point",
//           "slug": "access-point"
//         },
//         {
//           "name": "Router",
//           "slug": "router"
//         },
//         {
//           "name": "Network Extender",
//           "slug": "network-extender"
//         },
//         {
//           "name": "LAN Card",
//           "slug": "lan-card"
//         },
//         {
//           "name": "Network Accessories",
//           "slug": "network-accessories"
//         },
//         {
//           "name": "Modem",
//           "slug": "modem"
//         }
//       ]
//     },
//     {
//       "name": "Monitor",
//       "slug": "monitor",
//       "subcategories": [
//         {
//           "name": "Acer",
//           "slug": "acer"
//         },
//         {
//           "name": "ViewSonic",
//           "slug": "viewsonic"
//         },
//         {
//           "name": "AOC",
//           "slug": "aoc"
//         },
//         {
//           "name": "Aptech",
//           "slug": "aptech"
//         },
//         {
//           "name": "Asus",
//           "slug": "asus"
//         },
//         {
//           "name": "Monitor Holder",
//           "slug": "monitor-holder"
//         },
//         {
//           "name": "Benq",
//           "slug": "benq"
//         },
//         {
//           "name": "Monitor Light",
//           "slug": "monitor-light"
//         },
//         {
//           "name": "Corsair",
//           "slug": "corsair"
//         },
//         {
//           "name": "Dell",
//           "slug": "dell"
//         },
//         {
//           "name": "Monitor Mount Offer",
//           "slug": "monitor-mount-offer"
//         },
//         {
//           "name": "Enter",
//           "slug": "enter"
//         },
//         {
//           "name": "Esonic",
//           "slug": "esonic"
//         },
//         {
//           "name": "Fantech",
//           "slug": "fantech"
//         },
//         {
//           "name": "Gigabyte",
//           "slug": "gigabyte"
//         },
//         {
//           "name": "Huawei",
//           "slug": "huawei"
//         },
//         {
//           "name": "Huntkey",
//           "slug": "huntkey"
//         },
//         {
//           "name": "Hikvision",
//           "slug": "hikvision"
//         },
//         {
//           "name": "HP",
//           "slug": "hp"
//         },
//         {
//           "name": "innovtech",
//           "slug": "innovtech"
//         },
//         {
//           "name": "Lenovo",
//           "slug": "lenovo"
//         },
//         {
//           "name": "LG",
//           "slug": "lg"
//         },
//         {
//           "name": "MSI",
//           "slug": "msi"
//         }
//       ]
//     },
//     {
//       "name": "Gaming Zone",
//       "slug": "gaming-zone",
//       "subcategories": [
//         {
//           "name": "Gaming Gears",
//           "slug": "gaming-gears"
//         },
//         {
//           "name": "Gaming Chair",
//           "slug": "gaming-chair"
//         }
//       ]
//     },
//     {
//       "name": "Gaming Chair & Table",
//       "slug": "gaming-chair-table",
//       "subcategories": [
//         {
//           "name": "Gaming Chair",
//           "slug": "gaming-chair"
//         },
//         {
//           "name": "Gaming Desk",
//           "slug": "gaming-desk"
//         },
//         {
//           "name": "Gaming Sofa",
//           "slug": "gaming-sofa"
//         }
//       ]
//     },
//     {
//       "name": "Projector and Screen",
//       "slug": "projector-and-screen",
//       "subcategories": [
//         {
//           "name": "Projectors",
//           "slug": "projectors"
//         },
//         {
//           "name": "Projector Screen",
//           "slug": "projector-screen"
//         }
//       ]
//     },
//     {
//       "name": "Computers",
//       "slug": "computers",
//       "subcategories": [
//         {
//           "name": "Desktop",
//           "slug": "desktop"
//         }
//       ]
//     },
//     {
//       "name": "City IT Mega Fair",
//       "slug": "city-it-mega-fair",
//       "subcategories": []
//     },
//     {
//       "name": "IDB PC Offer",
//       "slug": "idb-pc-offer",
//       "subcategories": []
//     },
//     {
//       "name": "UPS",
//       "slug": "ups",
//       "subcategories": [
//         {
//           "name": "Offline UPS",
//           "slug": "offline-ups"
//         },
//         {
//           "name": "Online UPS",
//           "slug": "online-ups"
//         },
//         {
//           "name": "UPS Battery",
//           "slug": "ups-battery"
//         },
//         {
//           "name": "IPS",
//           "slug": "ips"
//         }
//       ]
//     },
//     {
//       "name": "Software",
//       "slug": "software",
//       "subcategories": [
//         {
//           "name": "Security Software",
//           "slug": "security-software"
//         },
//         {
//           "name": "MS Office",
//           "slug": "ms-office"
//         },
//         {
//           "name": "Windows",
//           "slug": "windows"
//         }
//       ]
//     },
//     {
//       "name": "Gaming Gears",
//       "slug": "gaming-gears",
//       "subcategories": [
//         {
//           "name": "Mouse Pad",
//           "slug": "mouse-pad"
//         }
//       ]
//     },
//     {
//       "name": "Home Appliance",
//       "slug": "home-appliance",
//       "subcategories": [
//         {
//           "name": "Air Conditioner",
//           "slug": "air-conditioner"
//         },
//         {
//           "name": "Washing Machine",
//           "slug": "washing-machine"
//         }
//       ]
//     }
//   ],
//   "shops": [
//     {
//         name: "Techland",
//         href: "techland"
//     },
//     {
//         name: "Ryans",
//         href: "ryans"
//     },
//     {
//         name: "Startech",
//         href: "startech"
//     }
//   ]
// }


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({navigation}) {
    const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
        
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setOpen}
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
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
            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <i className="fa-solid fa-xmark h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {navigation2.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-900",
                            "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation2.categories.map((category, categoryIdx) => (
                    <Tab.Panel
                      key={category.name}
                      className="space-y-12 px-4 pt-10 pb-6"
                    >
                      <div className="grid grid-cols-1 items-start gap-y-10 gap-x-6">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p
                              id={`mobile-featured-heading-${categoryIdx}`}
                              className="font-medium text-gray-900"
                            >
                              Featured
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                              className="mt-6 space-y-6"
                            >
                              {category.featured.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p
                              id="mobile-categories-heading"
                              className="font-medium text-gray-900"
                            >
                              Categories
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-categories-heading"
                              className="mt-6 space-y-6"
                            >
                              {category.categories.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                          <div>
                            <p
                              id="mobile-collection-heading"
                              className="font-medium text-gray-900"
                            >
                              Collection
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-collection-heading"
                              className="mt-6 space-y-6"
                            >
                              {category.collection.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p
                              id="mobile-brand-heading"
                              className="font-medium text-gray-900"
                            >
                              Brands
                            </p>
                            <ul
                              role="list"
                              aria-labelledby="mobile-brand-heading"
                              className="mt-6 space-y-6"
                            >
                              {category.brands.map((item) => (
                                <li key={item.name} className="flex">
                                  <a href={item.href} className="text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {navigation2.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Create an account
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {/* Currency selector */}
                <form>
                  <div className="inline-block">
                    <label htmlFor="mobile-currency" className="sr-only">
                      Currency
                    </label>
                    <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                      <select
                        id="mobile-currency"
                        name="currency"
                        className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="h-5 w-5 text-gray-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6 8l4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Currency selector */}
              <form className="hidden lg:block lg:flex-1">
                <div className="flex">
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className="h-5 w-5 text-gray-300"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6 8l4 4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                Get free delivery on orders over $100
              </p>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Create an account
                </a>
                <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link href="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    
                    <Popover.Group className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        <Menu as="div" className="relative inline-block text-left my-auto">
                            <div>
                            <Menu.Button className="inline-flex w-full justify-center items-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                Categories           
                                <i
                                className="fa-solid fa-chevron-down py-auto ml-2 -mr-1 h-full w-5 text-violet-800 hover:text-violet-600"
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
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    {navigation.categories.map((category, categoryIdx) => (
                                        <Menu.Item  key={categoryIdx}   >
                                            {({ active }) => (
                                            <Menu as="div" className="w-full relative inline-block text-left my-auto">
                                                <div>
                                                <Menu.Button className={`${
                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm bg-opacity-20 font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                    {category.name}              
                                                    <i
                                                    className="h-full fa-solid fa-chevron-right py-auto ml-auto -mr-1 w-5 text-violet-800 hover:text-violet-600"
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
                                                    <Menu.Items className={`${category.subcategories.length<10 ? 'w-56':'w-96' } absolute left-[100%] top-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                                                        <div className={`${category.subcategories.length<10 ? '':'grid grid-cols-2' }  px-1 py-1`}>
                                                            {category.subcategories.map((item, itemIdx) => (
                                                                <Menu.Item key={itemIdx}>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            className={`${
                                                                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                            href={`/products/${encodeURIComponent(category.slug)}/${encodeURIComponent(item.slug)}`}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                                
                            </Menu.Items>
                            </Transition>
                        </Menu>

                        {navigation.shops.map((page) => (
                          <Link
                            key={page.name}
                            href={`/shop/${encodeURIComponent(page.href)}`}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <i className="fa-solid fa-bars h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a
                      href="#"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <i className="fa-solid fa-magnifying-glass h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    <img
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Search</span>
                            <i
                              className="fa-solid fa-magnifying-glass h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>

                        <div className="flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Account</span>
                            <i className="fa-solid fa-user h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <a
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <i
                            className="fa-solid fa-heart h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}