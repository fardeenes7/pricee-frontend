"use client";
/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect } from "react";

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

import { loginwithEmail, loginwithSocial, registerwithEmail } from "../auth";
import Link from "next/link";

export default function RegisterModal() {
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const nameRegex = RegExp(/^[a-z ,.'-]+$/i);
  const emailRegex = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  );
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [error, setError] = useState(false);

  const [name, setName] = useState("");

  useEffect(() => {
    // check and validate name
    if (name.length == 0) {
      setNameError("");
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters long");
    } else if (!nameRegex.test(name)) {
      setNameError("Enter a valid name");
    } else {
      setNameError("");
    }

    // check and validate email
    if (email.length == 0) {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }

    // check and validate password
    if (password.length == 0) {
      setPasswordError("");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }

    // check and validate password again
    if (passwordAgain != password) {
      setPasswordAgainError("Passwords do not match");
    } else {
      setPasswordAgainError("");
    }

    //set error if any of the fields are invalid
    return () => {
      if (
        nameError == "" &&
        emailError == "" &&
        passwordError == "" &&
        passwordAgainError == "" &&
        name.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        passwordAgain.length > 0
      ) {
        setError(false);
      }
    };
  }, [name, email, password, passwordAgain, error]);

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
      setError(error.message);
    }
  };

  const emailRegister = async () => {
    if (
      nameError == "" &&
      emailError == "" &&
      passwordError == "" &&
      passwordAgainError == "" &&
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      passwordAgain.length > 0
    ) {
      setError(false);
    } else {
      setError(true);
    }

    if (name == "") {
      setNameError("Name cannot be empty");
    }
    if (email == "") {
      setEmailError("Email cannot be empty");
    }
    if (password == "") {
      setPasswordError("Password cannot be empty");
    }
    if (passwordAgain == "") {
      setPasswordAgainError("Passwords do not match");
    }

    console.log(nameError, emailError, passwordError, passwordAgainError);
    if (
      nameError == "" &&
      emailError == "" &&
      passwordError == "" &&
      passwordAgainError == "" &&
      !error
    ) {
      try {
        console.log("registering");
        registerwithEmail(email, password, name);
        setClose;
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <div className="mx-auto transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:px-12 sm:py-6 sm:align-middle">
      <div className="mx-auto">
        <div className="w-full sm:flex sm:items-center">
          <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-center">
            <div className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900">
              <span>Create an account on</span>
              <Image
                src={PriceeLogo}
                width="100"
                className="w-18 h-6"
                alt="Pricee"
              ></Image>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Sign up to access full features.
            </p>
          </div>
        </div>

        <div>
          <div className="mt-4">
            <div className="flex content-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <span>
                {nameError ? (
                  <p className="text-xs font-medium italic text-red-500">
                    {nameError}
                  </p>
                ) : null}
              </span>
            </div>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                placeholder="Enter your Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="mt-1">
            <div className="flex content-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email address
              </label>
              <span>
                {emailError ? (
                  <p className="text-xs font-medium italic text-red-500">
                    {emailError}
                  </p>
                ) : null}
              </span>
            </div>
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
                required
              />
            </div>
          </div>
          <div className="mt-1">
            <div className="flex content-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <span>
                {passwordError ? (
                  <p className="text-xs font-medium italic text-red-500">
                    {passwordError}
                  </p>
                ) : null}
              </span>
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
                required
              />
            </div>
          </div>
          <div className="mt-1">
            <div className="flex content-center justify-between">
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-600"
              >
                Password Again
              </label>
              <span>
                {passwordAgainError ? (
                  <p className="text-xs font-medium italic text-red-500">
                    {passwordAgainError}
                  </p>
                ) : null}
              </span>
            </div>
            <div className="mt-1">
              <input
                type="password"
                name="password2"
                id="password2"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                placeholder="Enter your password again"
                onChange={(e) => {
                  setPasswordAgain(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div className="mt-4 flex items-center justify-start">
              <div className="text-xs font-medium text-red-600">
                {error ? "Please fill up all the fields." : null}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={emailRegister}
              className=" flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95"
            >
              Sign Up
            </button>

            <div className="mt-4 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-accent-1 hover:text-accent-2"
                >
                  Log in
                </Link>
              </p>
            </div>
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
                or continue with Google or Facebook
              </span>
            </div>
          </div>
          <div className="mt-4 w-full items-center justify-center gap-4 sm:flex">
            <button onClick={googleLogin} className="mt-2 w-full">
              <div className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95">
                <Image src={GoogleIcon} className="h-4 w-4" alt="Google" />
                <span className="ml-2">Google</span>
              </div>
            </button>
            <button onClick={facebookLogin} className="mt-2 w-full">
              <div className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 active:scale-95">
                <Image src={FacebookIcon} className="h-4 w-4" alt="Facebook" />
                <span className="ml-2">Facebook</span>
              </div>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="text-xs">
              <p className="text-gray-600">
                By signing up, you agree to our{" "}
                <a className="font-medium text-accent-1 hover:text-accent-2">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="font-medium text-accent-1 hover:text-accent-2">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
