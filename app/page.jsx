import Link from "next/link";
import BannerGrid from "components/landing/bannergrid";
import CategoryGrid from "@/components/landing/CategoryGrid";
import ProductGrid from "components/products/ProductGrid";

// const data = {
//   bannerAds: [
//     {
//       image: "/media/bannerads/Coming_Soon.png",
//       title: "Welcome dark",
//       slug: "welcome-dark",
//       size: "3x1",
//     },
//     {
//       image: "/media/bannerads/www.pricee.com.bd_1.png",
//       title: "Coming Soon",
//       slug: "coming-soon",
//       size: "1x1",
//     },
//   ],
//   categories: [
//     {
//       name: "Home Appliances",
//       slug: "home-appliances",
//     },
//     {
//       name: "Gaming Zone",
//       slug: "gaming-zone",
//     },
//     {
//       name: "Camera",
//       slug: "camera",
//     },
//     {
//       name: "Home Appliance",
//       slug: "home-appliance",
//     },
//     {
//       name: "Monitor",
//       slug: "monitor",
//     },
//     {
//       name: "Smartwatch",
//       slug: "smartwatch",
//     },
//     {
//       name: "Software",
//       slug: "software",
//     },
//     {
//       name: "Printer",
//       slug: "printer",
//     },
//   ],
//   products: [
//     {
//       name: "Meetion MT-MC13 Gaming Microphone with RGB Light",
//       slug: "meetion-mt-mc13-gaming-microphone-with-rgb-light",
//       sub_category: {
//         name: "Others",
//         slug: "others",
//         category: "Others",
//         category_slug: "others",
//       },
//       best_price: 1100,
//       brand: "Meetion",
//       model: "MT-MC13",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Microphone/meetion/mt-mc13.jpg",
//       },
//     },
//     {
//       name: "Seagate Barracuda 5400RPM 6TB  Desktop Hard disk #ST6000DM003",
//       slug: "seagate-barracuda-5400rpm-6tb-desktop-hard-disk-st6000dm003",
//       sub_category: {
//         name: "All Brands",
//         slug: "all-brands",
//         category: "Others",
//         category_slug: "others",
//       },
//       best_price: 16300,
//       brand: "Seagate",
//       model: "BARRACUDA ST6000DM003",
//       image: {
//         href: "https://www.cloud.ryanscomputers.com/cdn/products/main/seagate-barracuda-6tb-35-inch-sata-5400rpm-11575780783.webp",
//       },
//     },
//     {
//       name: "Safeway CE278A/CB435A/CB436A/CB285A/CRG-325/328 Universal Black Compatible Toner",
//       slug: "safeway-ce278acb435acb436acb285acrg-325328-universal-black-compatible-toner",
//       sub_category: {
//         name: "Toner",
//         slug: "toner",
//         category: "Printer",
//         category_slug: "printer",
//       },
//       best_price: 850,
//       brand: "Safeway",
//       model: "CE278A/CB435A/CB436A/CB285A/CRG-325/328",
//       image: {
//         href: "https://www.cloud.ryanscomputers.com/cdn/products/main/safeway-ce278acb435acb436acb285acrg-325328-11674544778.webp",
//       },
//     },
//     {
//       name: "Dareu A87 Alpha Tenkeyless Mechanical Keyboard (Black)",
//       slug: "dareu-a87-alpha-tenkeyless-mechanical-keyboard-black",
//       sub_category: {
//         name: "Keyboard",
//         slug: "keyboard",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 5800,
//       brand: "Dareu",
//       model: "A87 ALPHA",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Keyboard/Dareu/A87%20Alpha/dareu-a87-alpha-tenkeyless-mechanical-keyboard-1.jpg",
//       },
//     },
//     {
//       name: "Baseus CAMLT-ZY09 3 in 1 Little Octopus Retractable Cable",
//       slug: "baseus-camlt-zy09-3-in-1-little-octopus-retractable-cable",
//       sub_category: {
//         name: "Cable & convertor",
//         slug: "cable-convertor",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 1100,
//       brand: "Baseus",
//       model: "CAMLT-ZY09",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Gadget/mobile-phone-accessories/Baseus%20CAMLT-ZY09%203%20in%201/Baseus%20CAMLT-ZY09%203%20in%201%202.png",
//       },
//     },
//     {
//       name: "A4Tech FB35C Dual Mode Rechargable Mouse",
//       slug: "a4tech-fb35c-dual-mode-rechargable-mouse",
//       sub_category: {
//         name: "Mouse",
//         slug: "mouse",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 1350,
//       brand: "A4Tech",
//       model: "FB35C",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/mouse/A4-tech/FB35C-%20FB35CS/fb35,cng.jpg",
//       },
//     },
//     {
//       name: "HAVIT H682 1M 2.0A TYPE-C DATA & CHARGING CABLE",
//       slug: "havit-h682-1m-20a-type-c-data-charging-cable",
//       sub_category: {
//         name: "Smart Watch & Gadget",
//         slug: "smart-watch-gadget",
//         category: "Others",
//         category_slug: "others",
//       },
//       best_price: 250,
//       brand: "Havit",
//       model: "H682",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/GADGET/Charging%20Pad/Havit/0008428_havit-h680-.jpeg",
//       },
//     },
//     {
//       name: "Grandstream GXP2160 6-line Enterprise IP Phone",
//       slug: "grandstream-gxp2160-6-line-enterprise-ip-phone",
//       sub_category: {
//         name: "IP Phone/PABX",
//         slug: "ip-phonepabx",
//         category: "Office Items",
//         category_slug: "office-items",
//       },
//       best_price: 13800,
//       brand: "Grandstream",
//       model: "GXP2160",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Ip%20phone/Grandstream/gxp-2160/gxp2160.jpg",
//       },
//     },
//     {
//       name: "HP Laser MFP 135a printer",
//       slug: "hp-laser-mfp-135a-printer",
//       sub_category: {
//         name: "Printers",
//         slug: "printers",
//         category: "Printer",
//         category_slug: "printer",
//       },
//       best_price: 18999,
//       brand: "HP",
//       model: "MFP 135A",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/printer/Hp%20Printer/mep-135a/mep-135a.jpg",
//       },
//     },
//     {
//       name: "A4TECH FG20 Fstyler 2.4G Wireless Mouse",
//       slug: "a4tech-fg20-fstyler-24g-wireless-mouse",
//       sub_category: {
//         name: "Mouse",
//         slug: "mouse",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 925,
//       brand: "A4Tech",
//       model: "FG20",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Mouse/A4%20Tech/FG20/FG20.jpg",
//       },
//     },
//     {
//       name: "Meetion MT-MC15 RGB Conference Gaming Microphone",
//       slug: "meetion-mt-mc15-rgb-conference-gaming-microphone",
//       sub_category: {
//         name: "Others",
//         slug: "others",
//         category: "Others",
//         category_slug: "others",
//       },
//       best_price: 1350,
//       brand: "Meetion",
//       model: "MT-MC15",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Microphone/meetion/mc15/mc15.jpg",
//       },
//     },
//     {
//       name: "Imice X6-3200 Rgb Gaming Usb Mouse - Black",
//       slug: "imice-x6-3200-rgb-gaming-usb-mouse-black",
//       sub_category: {
//         name: "Mouse",
//         slug: "mouse",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 700,
//       brand: "IMICE",
//       model: "X6-3200",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Mouse/iMice%20/x6-3200/x6-3200.jpg",
//       },
//     },
//     {
//       name: "GoPro Hero 9 20MP 5K Ultra HD Touch Screen Waterproof Action Camera (Black)",
//       slug: "gopro-hero-9-20mp-5k-ultra-hd-touch-screen-waterproof-action-camera-black",
//       sub_category: {
//         name: "Action Camera",
//         slug: "action-camera",
//         category: "Camera",
//         category_slug: "camera",
//       },
//       best_price: 41000,
//       brand: "GoPro",
//       model: "HERO 9",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Camera/Action%20Camera/go-pro/hero-9/hero-9-01-500x500.jpg",
//       },
//     },
//     {
//       name: "Xtrike Me GMP-290 6D colors Backlight Gaming Mouse & Mouse Pad Combo",
//       slug: "xtrike-me-gmp-290-6d-colors-backlight-gaming-mouse-mouse-pad-combo",
//       sub_category: {
//         name: "Mouse",
//         slug: "mouse",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 750,
//       brand: "Xtrike Me",
//       model: "GMP-290",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Combo/mouse-mousepad/6d-gmp290.jpg",
//       },
//     },
//     {
//       name: "Thermaltake Level 20 RGB Titanium Cherry MX Speed Silver Gaming Keyboard",
//       slug: "thermaltake-level-20-rgb-titanium-cherry-mx-speed-silver-gaming-keyboard",
//       sub_category: {
//         name: "Keyboard",
//         slug: "keyboard",
//         category: "Accessories",
//         category_slug: "accessories",
//       },
//       best_price: 16000,
//       brand: "Thermaltake",
//       model: "LEVEL 20 RGB TITANIUM",
//       image: {
//         href: "https://www.techlandbd.com/image/catalog/Keyboard/Thermaltake/level-20-rgb-titanium/thermaltake-level-20-rgb-titanium-3.jpg",
//       },
//     },
//     {
//       name: "TP-Link TL-WR841N 300Mbps Wireless Router",
//       slug: "tp-link-tl-wr841n-300mbps-wireless-router",
//       sub_category: {
//         name: "Router",
//         slug: "router",
//         category: "Networking",
//         category_slug: "networking",
//       },
//       best_price: 1500,
//       brand: "TP-Link",
//       model: "TP-LINK TL-WR841N",
//       image: {
//         href: "https://www.startech.com.bd/image/cache/catalog/router/tp-link/tl-wr850n/wr841n-500x500.jpg",
//       },
//     },
//     {
//       name: "Canon imageCLASS LBP623Cdw Single Function Color Laser Printer",
//       slug: "canon-imageclass-lbp623cdw-single-function-color-laser-printer",
//       sub_category: {
//         name: "Canon",
//         slug: "canon",
//         category: "Others",
//         category_slug: "others",
//       },
//       best_price: 80000,
//       brand: "Canon",
//       model: "IMAGECLASS LBP623CDW",
//       image: {
//         href: "https://www.cloud.ryanscomputers.com/cdn/products/main/canon-imageclass-lbp623cdw-single-function-color-11640238812.webp",
//       },
//     },
//     {
//       name: "Canon imageCLASS LBP325x Single Function Mono Laser Printer",
//       slug: "canon-imageclass-lbp325x-single-function-mono-laser-printer",
//       sub_category: {
//         name: "Document Printer",
//         slug: "document-printer",
//         category: "Printer",
//         category_slug: "printer",
//       },
//       best_price: 75000,
//       brand: "Canon",
//       model: "IMAGECLASS LBP325X",
//       image: {
//         href: "https://www.cloud.ryanscomputers.com/cdn/products/main/canon-imageclass-lbp325x-single-function-mono-11610967359.webp",
//       },
//     },
//     {
//       name: "Asus EX-B660M-V5 D4 DDR4 12th/13th Gen Intel LGA1700 Socket Motherboard",
//       slug: "asus-ex-b660m-v5-d4-ddr4-12th13th-gen-intel-lga1700-socket-motherboard",
//       sub_category: {
//         name: "Motherboard",
//         slug: "motherboard",
//         category: "Desktop",
//         category_slug: "desktop",
//       },
//       best_price: 13400,
//       brand: "Asus",
//       model: "EX-B660M-V5 D4",
//       image: {
//         href: "https://www.cloud.ryanscomputers.com/cdn/products/main/asus-ex-b660m-v5-d4-ddr4-12th-gen-intel-lga1700-11646482002.webp",
//       },
//     },
//     {
//       name: "Toten 9U 600x450 Glass Door Wal Mount Rack with 1x 6port PDU",
//       slug: "toten-9u-600x450-glass-door-wal-mount-rack-with-1x-6port-pdu",
//       sub_category: {
//         name: "All Brands",
//         slug: "all-brands",
//         category: "Others",
//         category_slug: "others",
//       },
//       best_price: 13000,
//       brand: "Toten",
//       model: "TOTEN 9U 600X450",
//       image: {
//         href: "https://www.cloud.ryanscomputers.com/cdn/products/main/toten-9u-600x450-glass-door-wal-mount-rack-with-11551510368.webp",
//       },
//     },
//   ],
// };

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/landing`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Home() {
  const data = await getData();

  return (
    <div className="">
      <BannerGrid data={data.bannerAds} />
      <CategoryGrid data={data.categories} />
      <ProductGrid products={data.products} />
    </div>
  );
}
