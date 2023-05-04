"use client";

import "./style.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "./modal";
export default function NewUser() {
  const [imageUrl, setImageUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    username: false,
    profile_pic: false,
    is_superuser: false,
    account_type: false,
    password: false,
    password2: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profile_pic: null,
    is_superuser: false,
    account_type: "user",
    password: "",
    password2: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [e.target.name]: file,
    });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/users/new`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    if (res.status != 201) {
      setLoading(false);
      setShowModal(true);
      alert(data.message);
    } else {
      setLoading(false);
      alert(data.message);
      // alert("User created successfully");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        handleFormSubmit={handleSubmit}
      />
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mx-auto w-full space-y-8 divide-y divide-gray-200 lg:max-w-3xl"
        >
          <div>
            <div>
              <nav className="sm:hidden" aria-label="Back">
                <Link
                  href="/manage/users"
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <i
                    className="fa-solid fa-chevron-right -ml-1 mr-1 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Back
                </Link>
              </nav>
              <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div className="flex">
                      <Link
                        href="/manage"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        <i className="fa-solid fa-home" />
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <i
                        className="fa-solid fa-chevron-right -ml-1 mr-1 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <Link
                        href="/manage/users"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Users
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <i
                        className="fa-solid fa-chevron-right -ml-1 mr-1 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        aria-current="page"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Create New
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mt-4 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                  Create New User
                </h2>
              </div>
              <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
                <Link
                  href="/manage/users"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-complement focus:ring-offset-2"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-8 divide-y divide-gray-200 pt-6">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full rounded-md shadow-sm sm:text-sm"
                      pattern="[A-Za-z ,.'-]{3,}"
                      focused={focus.name}
                      onFocus={() => setFocus({ ...focus, name: true })}
                      onBlur={() => setFocus({ ...focus, name: true })}
                      onChange={(e) => onChange(e)}
                    />
                    <span className="text-xs font-medium text-red-500">
                      Name must be at least 3 characters and can contain only
                      letters, and [ ,.'-']
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address <strong className="text-red-500">*</strong>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-complement focus:ring-complement sm:text-sm"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}$"
                      focused={focus.name}
                      onFocus={() => setFocus({ ...focus, name: true })}
                      onBlur={() => setFocus({ ...focus, name: true })}
                      onChange={(e) => onChange(e)}
                      required
                    />
                    <span className="text-xs font-medium text-red-500">
                      Enter a valid email address
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-complement focus:ring-complement sm:text-sm"
                      pattern="[A-Za-z0-9_.]{3,}"
                      focused={focus.name}
                      onFocus={() => setFocus({ ...focus, name: true })}
                      onBlur={() => setFocus({ ...focus, name: true })}
                      onChange={(e) => onChange(e)}
                    />
                    <span className="text-xs font-medium text-red-500">
                      Username must be at least 3 characters and can contain
                      only letters, numbers, and the characters '_', '.'
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-complement focus:ring-complement sm:text-sm"
                      placeholder="Write a few sentences about yourself."
                      defaultValue={""}
                      focused={focus.name}
                      onFocus={() => setFocus({ ...focus, name: true })}
                      onBlur={() => setFocus({ ...focus, name: true })}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="profile_pic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl ? imageUrl : image}
                          className="h-full w-full"
                          alt=""
                        />
                      ) : (
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="file"
                      id="profile_pic"
                      name="profile_pic"
                      className="ml-5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-complement focus:ring-offset-2"
                      accept=".jpg, .jpeg, .png , .gif, .svg"
                      maxLength="2000000"
                      focused={focus.name}
                      onFocus={() => setFocus({ ...focus, name: true })}
                      onBlur={() => setFocus({ ...focus, name: true })}
                      onChange={handleFileChange}
                    />
                    <span className="text-xs font-medium text-red-500">
                      Max file size: 2MB and accepted file types: jpg, jpeg,
                      png, gif, svg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 divide-y divide-gray-200 pt-6">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Authentication and Authorization
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password <strong className="text-red-500">*</strong>
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-complement focus:ring-complement sm:text-sm"
                        focused={focus.name}
                        onFocus={() => setFocus({ ...focus, name: true })}
                        onBlur={() => setFocus({ ...focus, name: true })}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password Again <strong className="text-red-500">*</strong>
                    </label>
                    <div className="mt-1">
                      <input
                        id="password2"
                        name="password2"
                        type="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-complement focus:ring-complement sm:text-sm"
                        pattern={formData.password}
                        focused={focus.name}
                        onFocus={() => setFocus({ ...focus, name: true })}
                        onBlur={() => setFocus({ ...focus, name: true })}
                        onChange={(e) => onChange(e)}
                        required
                      />
                      <span></span>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="account_type"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Account Type
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        id="account_type"
                        name="account_type"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-complement focus:ring-complement sm:max-w-xs sm:text-sm"
                        focused={focus.name}
                        onFocus={() => setFocus({ ...focus, name: true })}
                        onBlur={() => setFocus({ ...focus, name: true })}
                        onChange={(e) => onChange(e)}
                      >
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="user" selected>
                          User
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="is_superuser"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Superuser Status
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <select
                        id="is_superuser"
                        name="is_superuser"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-complement focus:ring-complement sm:max-w-xs sm:text-sm"
                        focused={focus.name}
                        onFocus={() => setFocus({ ...focus, name: true })}
                        onBlur={() => setFocus({ ...focus, name: true })}
                        onChange={(e) => onChange(e)}
                      >
                        <option value="False" selected>
                          False
                        </option>
                        <option value="True">True</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-complement focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-complement focus:ring-offset-2"
                {...(loading && "disabled")}
              >
                {loading && (
                  <i class="fa-solid fa-spinner-third fa-spin my-auto mr-2"></i>
                )}
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
