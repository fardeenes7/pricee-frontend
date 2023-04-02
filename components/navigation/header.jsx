"use client";

import "./nav.css";
import React, { useState, useEffect, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import LogoText from "../../public/priceetextlogo.svg";
import Logo from "../../public/pricee.svg";
import Link from "next/link";
import { Logout } from "../auth/auth";

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
          name: "Vention",
          slug: "vention",
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
          name: "Combo",
          slug: "combo",
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
          name: "Bluetooth",
          slug: "bluetooth",
        },
        {
          name: "Apple Pencil",
          slug: "apple-pencil",
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
          name: "Media Converter",
          slug: "media-converter",
        },
        {
          name: "Floor Mat",
          slug: "floor-mat",
        },
        {
          name: "Console Converter",
          slug: "console-converter",
        },
        {
          name: "Cable & convertor",
          slug: "cable-convertor",
        },
        {
          name: "Mouse pad",
          slug: "mouse-pad",
        },
        {
          name: "Neckband",
          slug: "neckband",
        },
        {
          name: "Keyboard",
          slug: "keyboard",
        },
        {
          name: "Converter & Cable",
          slug: "converter-cable",
        },
        {
          name: "Headphone",
          slug: "headphone",
        },
        {
          name: "Gamepad",
          slug: "gamepad",
        },
        {
          name: "Backpack",
          slug: "backpack",
        },
        {
          name: "Calculator",
          slug: "calculator",
        },
        {
          name: "LED Strip",
          slug: "led-strip",
        },
        {
          name: "Smart Band",
          slug: "smart-band",
        },
        {
          name: "Drones",
          slug: "drones",
        },
        {
          name: "Studio Equipment",
          slug: "studio-equipment",
        },
        {
          name: "Earbuds",
          slug: "earbuds",
        },
        {
          name: "Stream Deck",
          slug: "stream-deck",
        },
        {
          name: "Wrist Pad",
          slug: "wrist-pad",
        },
        {
          name: "Keyboard Keycaps",
          slug: "keyboard-keycaps",
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
          name: "Targus",
          slug: "targus",
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
          name: "Exclusive",
          slug: "exclusive",
        },
        {
          name: "Splitter",
          slug: "splitter",
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
          name: "Vivanco",
          slug: "vivanco",
        },
        {
          name: "Qgeem",
          slug: "qgeem",
        },
        {
          name: "Blower",
          slug: "blower",
        },
        {
          name: "Daily Lifestyle",
          slug: "daily-lifestyle",
        },
        {
          name: "Bag",
          slug: "bag",
        },
        {
          name: "Ear Phone",
          slug: "ear-phone",
        },
        {
          name: "Rosenberger",
          slug: "rosenberger",
        },
        {
          name: "Speaker",
          slug: "speaker",
        },
        {
          name: "Digital X",
          slug: "digital-x",
        },
        {
          name: "Baseus",
          slug: "baseus",
        },
        {
          name: "Fiesta",
          slug: "fiesta",
        },
        {
          name: "Redragon",
          slug: "redragon",
        },
        {
          name: "Tucano",
          slug: "tucano",
        },
        {
          name: "Dahua",
          slug: "dahua",
        },
        {
          name: "Microsoft",
          slug: "microsoft",
        },
        {
          name: "Yuanxin",
          slug: "yuanxin",
        },
        {
          name: "Energizer",
          slug: "energizer",
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

export default function Header({ setLoginModalOpen }) {
  const userDataString = window.sessionStorage.getItem("userData");
  const userData = userDataString && JSON.parse(userDataString);
  const [user, setUser] = useState(userData);

  const logout = async () => {
    await Logout();
    setUser(null);
  };

  useEffect(() => {
    const getUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (accessToken && refreshToken) {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;
        fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              // If the response is not OK, try to refresh the access token
              return fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/token/refresh`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ refresh: refreshToken }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  localStorage.setItem("access_token", data.access);
                  const newRequestOptions = {
                    headers: { Authorization: `Bearer ${data.access}` },
                  };
                  return fetch(url, newRequestOptions).then((response) =>
                    response.json()
                  );
                });
            }
          })
          .then((data) => {
            if (data.email) {
              setUser(data);
              window.sessionStorage.setItem("userData", JSON.stringify(data));
            } else {
              setUser(null);
              window.sessionStorage.removeItem("userData");
            }
          })
          .catch((error) => console.error(error));
      }
    }
    if (user === null) {
      getUserData();
    }
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
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    PC Builder
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Collections
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Wishlist
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <i
                        class="fa-solid fa-magnifying-glass h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-accent-1 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-1 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-1">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <i
                      class="fa-solid fa-x block h-6 w-6"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i
                      class="fa-solid fa-bars block h-6 w-6"
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
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
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
                  <button
                    onClick={setLoginModalOpen}
                    className="rounded-md bg-accent-1 px-4 py-2 text-xs font-semibold text-secondary hover:bg-accent-2"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="hidden bg-gray-50 lg:block">
            <div className="mx-auto flex w-full max-w-7xl justify-between px-2 text-sm  font-medium sm:px-4 lg:px-8">
              {navigation.categories.map((category) => (
                <div key={category.slug} className="space-y-1 px-2 pb-3 pt-2">
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
                      <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-accent-1 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-accent-1 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user ? user.name : "Anonymous"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user ? user.email : ""}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <i class="fa-solid fa-bell h-6 w-6" aria-hidden="true"></i>
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// function NavItem({ name, categories, ...props }) {
//   return (
//     <Menu as="div" className="relative ml-4 flex-shrink-0">
//       <div>
//         <Menu.Button className="flex rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2">
//           <a className="px-4 py-1">
//             <span className="font mr-2 text-sm">{name}</span>
//             <i className={props.icon}></i>{" "}
//           </a>
//         </Menu.Button>
//       </div>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           {categories.map((category) => (
//             <Menu.Item key={category.name}>
//               {({ active }) => (
//                 <NavItem2
//                   icon="fa-solid fa-caret-down"
//                   name={category.name}
//                   category={category.slug}
//                   subcategories={category.sub_categories}
//                   className={classNames(
//                     active ? "bg-gray-100" : "",
//                     "block px-4 py-2 text-sm text-gray-700"
//                   )}
//                   active={active}
//                 ></NavItem2>
//               )}
//             </Menu.Item>
//           ))}
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }
// function NavItem2({ name, category, subcategories, ...props }) {
//   return (
//     <Menu as="div" className="relative ml-4 flex-shrink-0">
//       <div>
//         <Menu.Button
//           className={classNames(
//             props.active ? "bg-gray-100" : "",
//             "block px-4 py-2 text-sm text-gray-700"
//           )}
//         >
//           {name}
//         </Menu.Button>
//       </div>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute left-48 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           {subcategories.map((subcategory) => (
//             <Menu.Item key={subcategory.name}>
//               {({ active }) => (
//                 <Link
//                   href={`/category/${category}/${subcategory.slug}`}
//                   className={classNames(
//                     active ? "bg-gray-100" : "",
//                     "block px-4 py-2 text-sm text-gray-700"
//                   )}
//                 >
//                   {subcategory.name}
//                 </Link>
//               )}
//             </Menu.Item>
//           ))}
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }
