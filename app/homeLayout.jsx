"use client";
import Header from "../components/navigation/header";
import Footer from "../components/navigation/footer";
import LoginModal from "../components/auth/loginModal";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const pathname = usePathname();

  const isManage = pathname.startsWith("/manage");

  if (isManage) {
    return children;
  } else {
    return <HomeLayout children={children} />;
  }
}

function HomeLayout({ children }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <body className="flex min-h-screen flex-col bg-secondary selection:bg-accent-1 selection:text-white">
      <Header setLoginModalOpen={() => setLoginModalOpen(true)} />
      <main className="w-full max-w-7xl px-2 py-4 lg:mx-auto">{children}</main>
      <LoginModal
        open={loginModalOpen}
        setOpen={() => setLoginModalOpen(false)}
      />
      <Footer />
    </body>
  );
}
