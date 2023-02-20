import Header from "../components/navigation/header";
import Footer from "../components/navigation/footer";
import "./globals.css";
import localFont from "@next/font/local";

// Font files can be colocated inside of `app`
const walsheim = localFont({
  src: [
    {
      path: "./GTWalsheimPro-Light.woff2",
      weight: "300",
      style: "thin",
    },
    {
      path: "./GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./GTWalsheimPro-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./GTWalsheimPro-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-walsheim",
  display: "swap",
});

async function getData() {
  const res = await fetch(`${process.env.API_BASE_URL}/navigation/`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function RootLayout({ children }) {
  const data = await getData();

  return (
    <html lang="en" className={`${walsheim.variable}`}>
      <head>
        {/* Fontawesome icons cracked */}
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.2.1/css/all.css"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header navigation={data} />
        <div className="mx-4 w-full max-w-7xl py-4 lg:mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
