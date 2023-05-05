"use client";
import Header from "../components/navigation/header";
import Footer from "../components/navigation/footer";
import LoginModal from "../components/auth/loginModal";
import RegisterModal from "../components/auth/registerModal";
import ForgotPasswordModal from "../components/auth/forgotPasswordModal";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
export default function Layout({ children }) {
  const pathname = usePathname();

  const isManage = pathname.startsWith("/manage");
  const isProfile = pathname.startsWith("/user");

  if (isManage) {
    return <body>{children}</body>;
  } else {
    return <HomeLayout children={children} isProfile={isProfile} />;
  }
}

function HomeLayout({ children, isProfile }) {
  const [loginModalOpen, setLoginModalOpen] = useState(0);
  return (
    <body className="flex min-h-screen flex-col bg-secondary selection:bg-accent-1 selection:text-white">
      <Header
        setLoginModalOpen={() => setLoginModalOpen(1)}
        isProfilePage={isProfile}
      />
      <main className="w-full max-w-7xl px-2 py-4 lg:mx-auto">{children}</main>
      <LoginModal
        open={loginModalOpen}
        setClose={() => setLoginModalOpen(0)}
        setRegisterModalOpen={() => setLoginModalOpen(2)}
        setForgotPasswordModalOpen={() => setLoginModalOpen(3)}
      />
      <RegisterModal
        open={loginModalOpen}
        setClose={() => setLoginModalOpen(0)}
        setLoginModalOpen={() => setLoginModalOpen(1)}
      />
      <ForgotPasswordModal
        open={loginModalOpen}
        setClose={() => setLoginModalOpen(0)}
        setLoginModalOpen={() => setLoginModalOpen(1)}
        setRegisterModalOpen={() => setLoginModalOpen(2)}
      />

      <Footer />
    </body>
  );
}
