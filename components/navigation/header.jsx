"use client";

import "./nav.css";
import React, { useState, useEffect, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import LogoText from "../../public/priceetextlogo.svg";
import Logo from "../../public/pricee.svg";
import Link from "next/link";
import { Logout } from "../auth/auth";
import { getUser } from "../auth/getUser";
import Search from "../search/Search";
import { refreshToken } from "../auth/auth";
import MobileMenu from "./mobile-menu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = {
  categories: [
    {
      name: "Accessories",
      slug: "accessories",
      sub_categories: [
        {
          name: "Bluetooth Receiver",
          slug: "bluetooth-receiver",
        },
        {
          name: "Sound Card",
          slug: "sound-card",
        },
        {
          name: "USB HUB",
          slug: "usb-hub",
        },
        {
          name: "Power Strip",
          slug: "power-strip",
        },
        {
          name: "Presenter",
          slug: "presenter",
        },
        {
          name: "Capture Card",
          slug: "capture-card",
        },
        {
          name: "Portable Speaker",
          slug: "portable-speaker",
        },
        {
          name: "Wifi-Adapter",
          slug: "wifi-adapter",
        },
        {
          name: "Power Bank",
          slug: "power-bank",
        },
        {
          name: "Cable & convertor",
          slug: "cable-convertor",
        },
        {
          name: "Headphone",
          slug: "headphone",
        },
        {
          name: "Backpack",
          slug: "backpack",
        },
        {
          name: "Drones",
          slug: "drones",
        },
        {
          name: "Microphone",
          slug: "microphone",
        },
        {
          name: "Hubs & Docks",
          slug: "hubs-docks",
        },
        {
          name: "Bluetooth Speakers",
          slug: "bluetooth-speakers",
        },
        {
          name: "Speakers",
          slug: "speakers",
        },

        {
          name: "Mouse Pad",
          slug: "mouse-pad",
        },
        {
          name: "Networking Cable",
          slug: "networking-cable",
        },
        {
          name: "Mouse",
          slug: "mouse",
        },
        {
          name: "Sewing Machine",
          slug: "sewing-machine",
        },
        {
          name: "Smart Watch",
          slug: "smart-watch",
        },
        {
          name: "Daily Lifestyle",
          slug: "daily-lifestyle",
        },
        {
          name: "Ear Phone",
          slug: "ear-phone",
        },
        {
          name: "Speaker",
          slug: "speaker",
        },
      ],
    },
    {
      name: "Camera",
      slug: "camera",
      sub_categories: [
        {
          name: "Digital Camera",
          slug: "digital-camera",
        },
        {
          name: "WebCam",
          slug: "webcam",
        },
        {
          name: "DSLR",
          slug: "dslr",
        },
        {
          name: "Action Camera",
          slug: "action-camera",
        },
        {
          name: "DSLR Cameras",
          slug: "dslr-cameras",
        },
        {
          name: "WiFi Camera",
          slug: "wifi-camera",
        },
        {
          name: "Mirrorless Camera",
          slug: "mirrorless-camera",
        },
        {
          name: "Handycam",
          slug: "handycam",
        },
        {
          name: "Video Camera",
          slug: "video-camera",
        },
        {
          name: "PTZ Camera",
          slug: "ptz-camera",
        },
        {
          name: "Portable WiFi Camera",
          slug: "portable-wifi-camera",
        },
        {
          name: "Camera Flash",
          slug: "camera-flash",
        },
        {
          name: "Webcam",
          slug: "webcam",
        },
        {
          name: "Tripod",
          slug: "tripod",
        },
        {
          name: "Camera Tripod",
          slug: "camera-tripod",
        },
        {
          name: "Camera Lenses",
          slug: "camera-lenses",
        },
        {
          name: "Dash Cam",
          slug: "dash-cam",
        },
        {
          name: "Gimbal",
          slug: "gimbal",
        },
        {
          name: "Prime Lens",
          slug: "prime-lens",
        },
        {
          name: "Zoom Lens",
          slug: "zoom-lens",
        },
        {
          name: "Tamron",
          slug: "tamron",
        },
        {
          name: "Lens Filter",
          slug: "lens-filter",
        },
        {
          name: "Camera Bag",
          slug: "camera-bag",
        },
        {
          name: "Camera Battery",
          slug: "camera-battery",
        },
        {
          name: "Lens Hood",
          slug: "lens-hood",
        },
        {
          name: "Camera Accessories",
          slug: "camera-accessories",
        },
        {
          name: "Conferencing Camera",
          slug: "conferencing-camera",
        },
        {
          name: "Sigma",
          slug: "sigma",
        },
      ],
    },
    {
      name: "Desktop",
      slug: "desktop",
      sub_categories: [
        {
          name: "Pc Power",
          slug: "pc-power",
        },
        {
          name: "Power supply",
          slug: "power-supply",
        },
        {
          name: "Graphics card",
          slug: "graphics-card",
        },
        {
          name: "Casing Fan",
          slug: "casing-fan",
        },
        {
          name: "Component",
          slug: "component",
        },
        {
          name: "Motherboard",
          slug: "motherboard",
        },
        {
          name: "All-in-One PC",
          slug: "all-in-one-pc",
        },
        {
          name: "Components",
          slug: "components",
        },
        {
          name: "Desktop",
          slug: "desktop",
        },
        {
          name: "Fantech",
          slug: "fantech",
        },
        {
          name: "Cpu cooler",
          slug: "cpu-cooler",
        },
        {
          name: "Desktop ram",
          slug: "desktop-ram",
        },
        {
          name: "Thermal Paste",
          slug: "thermal-paste",
        },
        {
          name: "Desktop Accessories",
          slug: "desktop-accessories",
        },
      ],
    },
    {
      name: "Gaming Zone",
      slug: "gaming-zone",
      sub_categories: [
        {
          name: "Gaming Gears",
          slug: "gaming-gears",
        },
        {
          name: "Gaming Chair",
          slug: "gaming-chair",
        },
        {
          name: "Games",
          slug: "games",
        },
        {
          name: "VR",
          slug: "vr",
        },
        {
          name: "Gaming Console",
          slug: "gaming-console",
        },
      ],
    },
    {
      name: "Laptop & Tablet",
      slug: "laptop-tablet",
      sub_categories: [
        {
          name: "Laptop",
          slug: "laptop",
        },
        {
          name: "Smartphone",
          slug: "smartphone",
        },
        {
          name: "Laptop Ram",
          slug: "laptop-ram",
        },
        {
          name: "Laptop Battery",
          slug: "laptop-battery",
        },
        {
          name: "Laptop Accessories",
          slug: "laptop-accessories",
        },
        {
          name: "Touch",
          slug: "touch",
        },
        {
          name: "Ultra-Slim",
          slug: "ultra-slim",
        },
        {
          name: "Executive",
          slug: "executive",
        },
        {
          name: "Professional",
          slug: "professional",
        },
        {
          name: "Gaming Laptop",
          slug: "gaming-laptop",
        },
        {
          name: "Graphics Tablet",
          slug: "graphics-tablet",
        },
        {
          name: "Tablet PC",
          slug: "tablet-pc",
        },
        {
          name: "Laptop Cooler",
          slug: "laptop-cooler",
        },
        {
          name: "Amazon",
          slug: "amazon",
        },
        {
          name: "All Laptop",
          slug: "all-laptop",
        },
        {
          name: "Gaming Laptops",
          slug: "gaming-laptops",
        },
        {
          name: "Stylus",
          slug: "stylus",
        },
        {
          name: "HUAWEI",
          slug: "huawei",
        },
        {
          name: "Realme",
          slug: "realme",
        },
        {
          name: "Apple",
          slug: "apple",
        },
        {
          name: "iPad Mini",
          slug: "ipad-mini",
        },
        {
          name: "iPod",
          slug: "ipod",
        },
        {
          name: "iPad Pro",
          slug: "ipad-pro",
        },
      ],
    },
    {
      name: "Monitor",
      slug: "monitor",
      sub_categories: [
        {
          name: "AOC",
          slug: "aoc",
        },
        {
          name: "Asus",
          slug: "asus",
        },
        {
          name: "Dell",
          slug: "dell",
        },
        {
          name: "ReDragon",
          slug: "redragon",
        },
        {
          name: "ViewSonic",
          slug: "viewsonic",
        },
        {
          name: "MSI",
          slug: "msi",
        },
        {
          name: "Corsair",
          slug: "corsair",
        },
        {
          name: "Enter",
          slug: "enter",
        },
        {
          name: "Walton",
          slug: "walton",
        },
        {
          name: "Acer",
          slug: "acer",
        },
        {
          name: "Uniview",
          slug: "uniview",
        },
        {
          name: "Lenovo",
          slug: "lenovo",
        },
        {
          name: "Esonic",
          slug: "esonic",
        },
        {
          name: "Philips",
          slug: "philips",
        },
        {
          name: "Aptech",
          slug: "aptech",
        },
        {
          name: "LG ",
          slug: "lg",
        },
        {
          name: "Gigabyte",
          slug: "gigabyte",
        },
        {
          name: "BenQ",
          slug: "benq",
        },
        {
          name: "Huawei",
          slug: "huawei",
        },
        {
          name: "Huntkey",
          slug: "huntkey",
        },
        {
          name: "UNIVISION",
          slug: "univision",
        },
        {
          name: "Value Top",
          slug: "value-top",
        },
        {
          name: "StarEx",
          slug: "starex",
        },
        {
          name: "GIGABYTE",
          slug: "gigabyte",
        },
        {
          name: "ASRock",
          slug: "asrock",
        },
        {
          name: "Univision",
          slug: "univision",
        },
        {
          name: "HP",
          slug: "hp",
        },
        {
          name: "PHILIPS",
          slug: "philips",
        },
        {
          name: "LG",
          slug: "lg",
        },
        {
          name: "Viewsonic",
          slug: "viewsonic",
        },
        {
          name: "XIAOMI",
          slug: "xiaomi",
        },
        {
          name: "innovtech",
          slug: "innovtech",
        },
        {
          name: "Sony",
          slug: "sony",
        },
        {
          name: "GameMax",
          slug: "gamemax",
        },
        {
          name: "Hikvision",
          slug: "hikvision",
        },
        {
          name: "Samsung",
          slug: "samsung",
        },
      ],
    },
    {
      name: "Networking",
      slug: "networking",
      sub_categories: [
        {
          name: "Access Point",
          slug: "access-point",
        },
        {
          name: "Receiver",
          slug: "receiver",
        },
        {
          name: "Accessories",
          slug: "accessories",
        },
        {
          name: "Network Switch",
          slug: "network-switch",
        },
        {
          name: "Qnap",
          slug: "qnap",
        },
        {
          name: "Connector",
          slug: "connector",
        },
        {
          name: "Server",
          slug: "server",
        },
        {
          name: "Patch Cord",
          slug: "patch-cord",
        },
        {
          name: "Workstation",
          slug: "workstation",
        },
        {
          name: "LAN Card",
          slug: "lan-card",
        },
        {
          name: "Splicer Machine",
          slug: "splicer-machine",
        },
        {
          name: "Network Accessories",
          slug: "network-accessories",
        },
        {
          name: "Router",
          slug: "router",
        },
        {
          name: "ONU",
          slug: "onu",
        },
        {
          name: "Faceplate",
          slug: "faceplate",
        },
        {
          name: "Modem",
          slug: "modem",
        },
        {
          name: "Crimping Tool",
          slug: "crimping-tool",
        },
        {
          name: "Patch Panel",
          slug: "patch-panel",
        },
        {
          name: "Network Transceivers",
          slug: "network-transceivers",
        },
        {
          name: "Synology",
          slug: "synology",
        },
        {
          name: "Server Rack",
          slug: "server-rack",
        },
        {
          name: "Network Extender",
          slug: "network-extender",
        },
        {
          name: "Cisco",
          slug: "cisco",
        },
        {
          name: "Netgear",
          slug: "netgear",
        },
        {
          name: "Mercusys",
          slug: "mercusys",
        },
        {
          name: "Mikrotik",
          slug: "mikrotik",
        },
        {
          name: "Asustor",
          slug: "asustor",
        },
      ],
    },
    {
      name: "Office Items",
      slug: "office-items",
      sub_categories: [
        {
          name: "Projector",
          slug: "projector",
        },
        {
          name: "Fax",
          slug: "fax",
        },
        {
          name: "Photocopier",
          slug: "photocopier",
        },
        {
          name: "IP Phone/PABX",
          slug: "ip-phonepabx",
        },
        {
          name: "PA SYSTEM",
          slug: "pa-system",
        },
        {
          name: "Signage",
          slug: "signage",
        },
        {
          name: "Paper Shredder",
          slug: "paper-shredder",
        },
        {
          name: "Weight Scale",
          slug: "weight-scale",
        },
        {
          name: "Cartridge",
          slug: "cartridge",
        },
        {
          name: "Measurement Machine",
          slug: "measurement-machine",
        },
        {
          name: "Binding Machine",
          slug: "binding-machine",
        },
        {
          name: "Interactive Board",
          slug: "interactive-board",
        },
        {
          name: "Cutter Blade",
          slug: "cutter-blade",
        },
        {
          name: "Print Head",
          slug: "print-head",
        },
        {
          name: "Kiosk",
          slug: "kiosk",
        },
        {
          name: "IP Phone",
          slug: "ip-phone",
        },
        {
          name: "Conference Systems",
          slug: "conference-systems",
        },
        {
          name: "Ribbon",
          slug: "ribbon",
        },
        {
          name: "Cash Drawer",
          slug: "cash-drawer",
        },
        {
          name: "Telephone Set",
          slug: "telephone-set",
        },
        {
          name: "Laminating Machine",
          slug: "laminating-machine",
        },
      ],
    },
    {
      name: "Printer",
      slug: "printer",
      sub_categories: [
        {
          name: "Scanner",
          slug: "scanner",
        },
        {
          name: "Printer",
          slug: "printer",
        },
        {
          name: "Dot Matrix Printer",
          slug: "dot-matrix-printer",
        },
        {
          name: "ID Card Printer",
          slug: "id-card-printer",
        },
        {
          name: "Brother",
          slug: "brother",
        },
        {
          name: "Ink Bottle",
          slug: "ink-bottle",
        },
        {
          name: "Printer Drum",
          slug: "printer-drum",
        },
        {
          name: "POS Printer",
          slug: "pos-printer",
        },
        {
          name: "Large Format Printer",
          slug: "large-format-printer",
        },
        {
          name: "Toner",
          slug: "toner",
        },
        {
          name: "Barcode Scanner",
          slug: "barcode-scanner",
        },
        {
          name: "Toner & Cartridge",
          slug: "toner-cartridge",
        },
        {
          name: "Printers",
          slug: "printers",
        },
        {
          name: "Label Printer",
          slug: "label-printer",
        },
        {
          name: "Yealink",
          slug: "yealink",
        },
        {
          name: "D-link",
          slug: "d-link",
        },
        {
          name: "Document Printer",
          slug: "document-printer",
        },
        {
          name: "Tp-link",
          slug: "tp-link",
        },
      ],
    },
    {
      name: "Security",
      slug: "security",
      sub_categories: [
        {
          name: "CC Camera",
          slug: "cc-camera",
        },
        {
          name: "NVR",
          slug: "nvr",
        },
        {
          name: "Security Software",
          slug: "security-software",
        },
        {
          name: "DVR",
          slug: "dvr",
        },
        {
          name: "Smart Door Bell",
          slug: "smart-door-bell",
        },
        {
          name: "KVM Switch",
          slug: "kvm-switch",
        },
        {
          name: "DVR / NVR Machine",
          slug: "dvr-nvr-machine",
        },
        {
          name: "Door Lock",
          slug: "door-lock",
        },
        {
          name: "IP Camera",
          slug: "ip-camera",
        },
      ],
    },
    {
      name: "Software",
      slug: "software",
      sub_categories: [
        {
          name: "MS Office",
          slug: "ms-office",
        },
        {
          name: "AutoDesk",
          slug: "autodesk",
        },
        {
          name: "Windows",
          slug: "windows",
        },
        {
          name: "Operating System",
          slug: "operating-system",
        },
        {
          name: "Office Application",
          slug: "office-application",
        },
        {
          name: "Cloud Solutions",
          slug: "cloud-solutions",
        },
        {
          name: "Mail Server Solution",
          slug: "mail-server-solution",
        },
        {
          name: "Adobe",
          slug: "adobe",
        },
        {
          name: "Antivirus",
          slug: "antivirus",
        },
        {
          name: "VMware",
          slug: "vmware",
        },
      ],
    },
    {
      name: "Storage",
      slug: "storage",
      sub_categories: [
        {
          name: "Pen Drive",
          slug: "pen-drive",
        },
        {
          name: "Memory Card",
          slug: "memory-card",
        },
        {
          name: "Internal ssd",
          slug: "internal-ssd",
        },
        {
          name: "HDD-SSD Enclosure",
          slug: "hdd-ssd-enclosure",
        },
        {
          name: "NAS Storage",
          slug: "nas-storage",
        },
        {
          name: "SAN Storage",
          slug: "san-storage",
        },
        {
          name: "Internal hdd",
          slug: "internal-hdd",
        },
      ],
    },
    {
      name: "UPS",
      slug: "ups",
      sub_categories: [
        {
          name: "Offline UPS",
          slug: "offline-ups",
        },
        {
          name: "Online UPS",
          slug: "online-ups",
        },
        {
          name: "Maxgreen",
          slug: "maxgreen",
        },
        {
          name: "MaxGreen",
          slug: "maxgreen",
        },
        {
          name: "UPS Battery",
          slug: "ups-battery",
        },
        {
          name: "IPS",
          slug: "ips",
        },
        {
          name: "Voltage Stabilizer",
          slug: "voltage-stabilizer",
        },
        {
          name: "Mini UPS",
          slug: "mini-ups",
        },
        {
          name: "Kstar",
          slug: "kstar",
        },
        {
          name: "Tronix",
          slug: "tronix",
        },
      ],
    },
  ],
  shops: [
    {
      name: "Ryans",
      href: "https://www.ryanscomputers.com/",
      logo: "https://www.ryanscomputers.com/assets/images/ryans-logo.svg",
      slug: "ryans",
    },
    {
      name: "Startech",
      href: "https://www.startech.com.bd/",
      logo: "https://www.startech.com.bd/image/catalog/logo.png",
      slug: "startech",
    },
    {
      name: "Techland",
      href: "https://www.techlandbd.com/",
      logo: "https://www.techlandbd.com/image/cache/catalog/techland/logo/techland-white-logo-300x48.png",
      slug: "techland",
    },
  ],
};

export default function Header({ setLoginModalOpen, isProfilePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const logout = async () => {
    await Logout();
    setUser(null);
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString && JSON.parse(userDataString);
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
    };
    if (user === null) {
      fetchData();
    }
    const token = localStorage.getItem("refresh_token");
    const interval = setInterval(() => {
      if (token) refreshToken();
    }, 58 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Disclosure as="nav" className="sticky top-0 z-10 bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="navbar flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <Link className="flex flex-shrink-0 items-center" href="/">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src={Logo}
                    alt="Pricee"
                  ></Image>
                  <Image
                    className="hidden h-8 w-auto lg:block"
                    src={LogoText}
                    alt="Pricee"
                  ></Image>
                </Link>
                {user && (
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    <Link
                      href="/user/profile"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/user/settings"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Settings
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <Search />
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-1"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <i
                      className="fa-solid fa-x block h-6 w-6"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-bars block h-6 w-6"
                      aria-hidden="true"
                    ></i>
                  )}
                </Disclosure.Button>
              </div>
              <div className="z-20 hidden lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {user && (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          //src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${user.profile_pic}`}
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
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Home Page
                            </Link>
                          )}
                        </Menu.Item>

                        {user.is_staff && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/manage"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Admin Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {!user.is_staff && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        {!user.is_staff && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/settings"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full px-4 py-2 text-start text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                {!user && (
                  <Link
                    href="/auth/login"
                    className="rounded-md bg-accent-1 px-4 py-2 text-xs font-semibold text-secondary hover:bg-accent-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden bg-gray-50 lg:block">
            {!isProfilePage && categoryMenu()}
          </div>

          {mobileMenuOpen && <MobileMenu user={user} navigation={navigation} />}
        </>
      )}
    </Disclosure>
  );
}

function categoryMenu() {
  return (
    <div className="mx-auto flex w-full max-w-7xl justify-between px-2 text-sm  font-medium sm:px-4 lg:px-8">
      {navigation.categories.map((category, id) => (
        <div key={id} className="space-y-1 px-2 pb-3 pt-2">
          <Menu as="div" className="relative flex-shrink-0">
            <div>
              <Menu.Button className="flex rounded-sm text-sm text-gray-700 hover:text-black focus:outline-none focus:ring-1 focus:ring-accent-1 focus:ring-offset-2">
                <span className="px-1">{category.name}</span>
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
              <Menu.Items
                className={`absolute left-0 mt-2 ${
                  category.sub_categories.length > 10
                    ? "grid w-96 grid-cols-2 "
                    : "w-48"
                } origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={`/category/${category.slug}`}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      All {category.name}
                    </Link>
                  )}
                </Menu.Item>
                {category.sub_categories.map((subcategory) => (
                  <Menu.Item key={category.name}>
                    {({ active }) => (
                      <Link
                        href={`/category/${category.slug}/${subcategory.slug}`}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {subcategory.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ))}
    </div>
  );
}
