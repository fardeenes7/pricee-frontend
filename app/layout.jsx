import "./globals.css";
import localFont from "next/font/local";
import Layout from "./homeLayout";

const walsheim = localFont({
  src: [
    {
      path: "./font/GTWalsheimPro-Light.woff2",
      weight: "300",
      style: "thin",
    },
    {
      path: "./font/GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/GTWalsheimPro-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./font/GTWalsheimPro-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-walsheim",
  display: "swap",
});

export default async function RootLayout({ children, ...props }) {
  console.log(props.router);
  const isManage = ["/manage"].includes(props.pathname);
  return (
    <html lang="en" className={`${walsheim.variable}`}>
      <head>
        {/* Fontawesome icons cracked */}
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.2.1/css/all.css"
        />
      </head>
      <Layout children={children} />
    </html>
  );
}
