"use client";
import Link from "next/link";
import { useCallback, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import FacebookIcon from "../facebook.svg";
import GoogleIcon from "../google.svg";
import PriceeLogo from "@/public/priceetextlogo.svg";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";

import { loginwithSocial } from "../auth";
import { getUser } from "../getUser";
import { useRouter } from "next/navigation";

// import { toast } from "react-hot-toast";
import Toast from "@/components/Toast";

export default function LoginModal() {
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
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.back();
    router.reload();
  }, [router]);

  const successToast = () => {
    Toast("Successfully logged in", "success", "", "reload");
  };

  const errorToast = () => {
    Toast("Something bad happened!", "error", "Please try again");
  };

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
    if (errorMessage != "") {
    }
  }, [email, password]);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      loginwithSocial(result.user.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const facebookProvider = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      loginwithSocial(result.user.accessToken);
      successToast();
    } catch (error) {
      setErrorMessage(error.message);
      errorToast();
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
        successToast();
        onDismiss();
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="mx-auto transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:px-12 sm:py-6 sm:align-middle">
      <div className="w-full sm:flex sm:items-center">
        <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-center">
          <div
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
          </div>

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
            <Image src={FacebookIcon} className="h-4 w-4" alt="Facebook" />
            <span className="ml-2">Sign in with Facebook</span>
          </div>
        </button>
      </div>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
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
              <Link
                href="/auth/forgot-password"
                className="font-medium text-accent-1 hover:text-accent-2"
              >
                Forgot your password?
              </Link>
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
              <Link
                href="/auth/register"
                className="font-medium text-accent-1 hover:text-accent-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
