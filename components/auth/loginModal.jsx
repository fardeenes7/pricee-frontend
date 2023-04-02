/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";

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

import { loginwithEmail, loginwithSocial } from "./auth";

export default function LoginModal({ open, setOpen }) {
  // 0=login, 1=signup, 2=forgot password
  const [loginState, setLoginState] = useState(0);
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      loginwithSocial(result.user.accessToken);
      setOpen;
    } catch (error) {
      console.log(error);
    }
  };

  const facebookProvider = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      loginwithSocial(result.user.accessToken);
      setOpen;
    } catch (error) {
      setError(error.message);
    }
  };

  const emailLogin = async () => {
    try {
      loginwithEmail(email, password);
      setOpen;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
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
          <Transition
            show={loginState === 0}
            as={Fragment}
            enter="ease-out duration-300 delay-300"
            enterFrom="opacity-0 -translate-x-0 sm:scale-95"
            enterTo="opacity-100 translate-x-0 sm:scale-100"
            leave="ease-out duration-300"
            leaveFrom="opacity-100 translate-x-0 sm:scale-100"
            leaveTo="opacity-0 -translate-x-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:px-12 sm:py-6 sm:align-middle">
              <div>
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
                    onClick={setOpen}
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
                      <Image
                        src={GoogleIcon}
                        className="h-4 w-4"
                        alt="Google"
                      />
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
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
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
                  <div>
                    <div className="mt-4 flex items-center justify-end">
                      <div className="text-xs">
                        <button
                          onClick={() => {
                            setLoginState(2);
                          }}
                          className="font-medium text-accent-1 hover:text-accent-2"
                        >
                          Forgot your password?
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={emailLogin}
                      className=" flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95"
                    >
                      Sign in
                    </button>

                    <div className="mt-4 text-center text-sm">
                      <p className="text-gray-600">
                        Don't have an account?{" "}
                        <button
                          onClick={() => {
                            setLoginState(1);
                          }}
                          className="font-medium text-accent-1 hover:text-accent-2"
                        >
                          Sign up
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition
            show={loginState === 1}
            as={Fragment}
            enter="ease-out duration-300 delay-300"
            enterFrom="opacity-0 translate-x-0 sm:scale-95"
            enterTo="opacity-100 translate-x-0 sm:scale-100"
            leave="ease-out duration-300"
            leaveFrom="opacity-100 translate-x-0 sm:scale-100"
            leaveTo="opacity-0 translate-x-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:px-12 sm:py-6 sm:align-middle">
              <div>
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
                    onClick={setOpen}
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
                      <span>Create an account on</span>
                      <Image
                        src={PriceeLogo}
                        width="100"
                        className="w-18 h-6"
                        alt="Pricee"
                      ></Image>
                    </Dialog.Title>

                    <p className="mt-2 text-sm text-gray-500">
                      Sign up to access full features.
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full items-center justify-center sm:flex sm:flex-col">
                  <button onClick={googleLogin} className="mt-2 w-full">
                    <div className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95">
                      <Image
                        src={GoogleIcon}
                        className="h-4 w-4"
                        alt="Google"
                      />
                      <span className="ml-2">Sign up with Google</span>
                    </div>
                  </button>
                  <button onClick={facebookLogin} className="mt-2 w-full">
                    <div className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95">
                      <Image
                        src={FacebookIcon}
                        className="h-4 w-4"
                        alt="Facebook"
                      />
                      <span className="ml-2">Sign up with Facebook</span>
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
                      />
                    </div>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-4 flex items-center justify-end">
                      <div className="text-xs">
                        <button
                          onClick={() => {
                            setLoginState(2);
                          }}
                          className="font-medium text-accent-1 hover:text-accent-2"
                        >
                          Forgot your password?
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className=" flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95"
                    >
                      Sign in
                    </button>

                    <div className="mt-4 text-center text-sm">
                      <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                          onClick={() => {
                            setLoginState(0);
                          }}
                          className="font-medium text-accent-1 hover:text-accent-2"
                        >
                          Sign up
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

