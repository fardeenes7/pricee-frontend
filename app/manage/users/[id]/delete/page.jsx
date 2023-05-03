"use client";

import { useState } from "react";
import DeleteModal from "./modal";

export default function DeleteUser() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <DeleteModal
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
      />
      <div className="my-4 bg-white shadow sm:rounded-lg lg:mx-8">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Delete this account
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Once you delete this account, user will lose all data associated
              with it.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
              onClick={() => setShowModal(true)}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
