"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import PriceeLogo from "@/public/priceetextlogo.svg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    setLoading(true);
  };

  return (
    <div className="mx-auto transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:px-12 sm:py-6 sm:align-middle">
      <div className="w-full sm:flex sm:items-center">
        <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-center">
          <div className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900">
            <span>Reset your Password for </span>
            <Image
              src={PriceeLogo}
              width="100"
              className="w-18 h-6"
              alt="Pricee"
            ></Image>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          {errorMessage ? (
            <div className="relative px-4 pb-3 text-xs text-red-600">
              <strong className="font-bold">Error: </strong>
              <span className="block font-medium sm:inline">
                {errorMessage}
              </span>
            </div>
          ) : null}
          <button
            onClick={resetPassword}
            className=" flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              </div>
            ) : null}
            Reset Password
          </button>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-accent-1 hover:text-accent-2"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
