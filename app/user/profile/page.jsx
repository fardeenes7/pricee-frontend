"use client";
import Loading from "@/components/extras/Loading";
import { getUser } from "@/components/auth/getUser";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      setUser(data);
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
        <div className="card-p-0 relative">
          <div className="absolute bottom-0 right-0 m-4">
            <div className="flex flex-row gap-2">
              <Link href="/user/profile/edit" className="btn ">
                Edit
              </Link>
              <Link
                href="/user/settings#delete_account"
                className="btn bg-red-500 hover:bg-red-600 active:bg-red-600"
              >
                Delete
              </Link>
            </div>
          </div>
          <div className="h-36 bg-gradient-to-r from-yellow-100 to-red-200"></div>
          <div className="mx-6 -mt-16 mb-6">
            <div className="aspect-square flex h-36 w-36 flex-col overflow-hidden rounded-full border-4 border-white bg-white p-2">
              <img
                className="h-full w-full overflow-hidden rounded-full object-cover"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${user.profile_pic}`}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {user.name ? user.name : user.username}
              </h1>
              <h1 className="text-md text-gray-500">@{user.username}</h1>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="card">
              <h1 className="text-xl font-bold">About</h1>
              <h1 className="text-gray-500">{user.bio}</h1>

              <div className="mt-2 flex flex-col gap-2">
                <div className="">
                  <h1 className="text-sm font-medium text-gray-500">Bio</h1>
                  <h1 className="text-sm font-bold">
                    {user.bio ? user.bio : "..."}
                  </h1>
                </div>
                <div className="">
                  <h1 className="text-sm font-medium text-gray-500">Email</h1>
                  <h1 className="text-sm font-bold">{user.email}</h1>
                </div>
                <div className="">
                  <h1 className="text-sm font-medium text-gray-500">
                    Account Type
                  </h1>
                  <h1 className="text-sm font-bold">{user.account_type}</h1>
                </div>
                <div className="">
                  <h1 className="text-sm font-medium text-gray-500">
                    Account Created
                  </h1>
                  <h1 className="text-sm font-bold">
                    {new Date(user.date_joined).toLocaleString("en-GB")}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            {!user.activity ? (
              <div className="card">
                <h1 className="text-xl font-bold">Activity</h1>
                <h1 className="text-gray-500">
                  You have not done anything yet.
                </h1>
              </div>
            ) : (
              <div className="card">
                <h1 className="text-xl font-bold">Activity</h1>
                <h1 className="text-gray-500">
                  You have not done anything yet.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
