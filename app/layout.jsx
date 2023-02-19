import Header from "../components/navigation/header";
import Footer from "../components/navigation/footer";
import "./globals.css";
import localFont from "@next/font/local";

// Font files can be colocated inside of `app`
const walsheim = localFont({
  src: "./GTWalsheimPro-Medium.woff2",
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
    <html lang="en" className={walsheim.className}>
      <head>
        {/* Fontawesome icons cracked */}
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.2.1/css/all.css"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header navigation={data} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
