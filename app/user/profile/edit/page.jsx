"use client";
import Loading from "@/components/extras/Loading";
import { getUser } from "@/components/auth/getUser";
import { updateUser } from "@/components/auth/auth";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
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
    const data = await updateUser(formData);
    if (data) {
      alert("Profile updated successfully");
      setUser(data);
      setFormData(data);
      setImageUrl(null);
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
      //set only a few fields to the form data
      setFormData({
        id: data.id,
        name: data.name,
        email: data.email,
        username: data.username,
        bio: data.bio,
      });
    };
    if (user === null) {
      fetchData();
      setLoading(false);
      console.log(user);
    }
  }, []);
  if (user === null) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">You are not logged in.</h1>
        <Link href="/login">
          <h1 className="text-blue-500">Login</h1>
        </Link>
      </div>
    );
  } else
    return (
      <div>
        <div className="card flex flex-col">
          <div className="h-36 bg-gradient-to-r from-yellow-100 to-red-200"></div>
          <div className="mx-6 -mt-16">
            <div className="flex h-36 w-36 flex-col  overflow-hidden rounded-full border-4 border-white bg-white p-2">
              <img
                className="left-0 top-0 h-36 w-36 overflow-hidden rounded-full object-cover"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${user.profile_pic}`}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Fardeen Ehsan</h1>
              <h1 className="text-sm text-gray-500">@{user.username}</h1>
            </div>
          </div>
        </div>
        <form
          className="card mt-4 space-y-8 divide-y divide-gray-200 bg-white"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="m-6 space-y-8 divide-y divide-gray-200">
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
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                      defaultValue={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      {/* <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg> */}
                      <img
                        src={
                          imageUrl
                            ? `${imageUrl}`
                            : `${process.env.NEXT_PUBLIC_MEDIA_URL}${formData.profile_pic}`
                        }
                        alt=""
                      />
                    </span>
                    <button
                      type="button"
                      className="ml-5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
                    >
                      <input
                        type="file"
                        name="profile_pic"
                        className="bg-white"
                        onChange={handleImageUpload}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-1 focus:ring-accent-1 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 lg:mx-6">
            <div className="flex justify-end">
              <Link
                href="/user/profile"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}
