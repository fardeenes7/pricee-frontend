/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import FacebookIcon from "./facebook.svg";
import GoogleIcon from "./google.svg";
import PriceeLogo from "../../public/priceetextlogo.svg";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";

import { loginwithSocial } from "./auth";
import { getUser } from "./getUser";

export default function LoginModal({
  open,
  setClose,
  setRegisterModalOpen,
  setForgotPasswordModalOpen,
}) {
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  );
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // check and validate email
    if (email.length == 0) {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }

    // check and validate password

    //set error if any of the fields are invalid
    if (emailError != "" || passwordError != "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [email, password]);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      loginwithSocial(result.user.accessToken);
      setClose;
    } catch (error) {
      console.log(error);
    }
  };

  const facebookProvider = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      loginwithSocial(result.user.accessToken);
      setClose;
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const emailLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (!data.tokens) {
        setLoading(false);
        if (data.email) {
          throw new Error(data.email);
        } else if (data.password) {
          throw new Error(data.password);
        } else {
          throw new Error(data.error);
        }
      } else {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);
        getUser();
        setLoading(false);
        window.location.reload();
      }
      setClose();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Transition.Root show={open == 1} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 "
            enterFrom="opacity-0 -translate-x-0 sm:scale-95"
            enterTo="opacity-100 translate-x-0 sm:scale-100"
            leave="ease-out duration-300"
            leaveFrom="opacity-100 translate-x-0 sm:scale-100"
            leaveTo="opacity-0 -translate-x-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:px-12 sm:py-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
                  onClick={setClose}
                >
                  <span className="sr-only">Close</span>
                  <i class="fa-solid fa-x h-6 w-6" aria-hidden="true"></i>
                </button>
              </div>
              <div className="w-full sm:flex sm:items-center">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-center">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900"
                  >
                    <span>Sign in to</span>
                    <Image
                      src={PriceeLogo}
                      width="100"
                      className="w-18 h-6"
                      alt="Pricee"
                    ></Image>
                  </Dialog.Title>

                  <p className="mt-2 text-sm text-gray-500">
                    Sign in to access full features.
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full items-center justify-center sm:flex sm:flex-col">
                <button onClick={googleLogin} className="mt-2 w-full">
                  <div className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95">
                    <Image src={GoogleIcon} className="h-4 w-4" alt="Google" />
                    <span className="ml-2">Sign in with Google</span>
                  </div>
                </button>
                <button onClick={facebookLogin} className="mt-2 w-full">
                  <div className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95">
                    <Image
                      src={FacebookIcon}
                      className="h-4 w-4"
                      alt="Facebook"
                    />
                    <span className="ml-2">Sign in with Facebook</span>
                  </div>
                </button>
              </div>
              <div className="relative my-4">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    or continue with email
                  </span>
                </div>
              </div>
              <div>
                <div className="mt-1">
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
                <div className="mt-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <div className="flex items-center justify-end text-xs">
                      <button
                        onClick={setForgotPasswordModalOpen}
                        className="font-medium text-accent-1 hover:text-accent-2"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setPassword(e.target.value);
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
                    onClick={emailLogin}
                    className=" flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      </div>
                    ) : null}
                    Sign in
                  </button>

                  <div className="mt-4 text-center text-sm">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={setRegisterModalOpen}
                        className="font-medium text-accent-1 hover:text-accent-2"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
