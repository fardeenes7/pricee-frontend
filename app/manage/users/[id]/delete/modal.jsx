"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Modal({ showModal, setShowModal, id }) {
  const [status, setStatus] = useState("error");
  const router = useRouter();
  useEffect(() => {
    if (showModal) {
      setStatus("confirm");
    }
  }, [showModal]);
  const handleDelete = async () => {
    setStatus("loading");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MANAGE_URL}/users/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    if (res.status != 200) {
      setStatus("error");
      return;
    }
    if (res.status == 200) {
      setStatus("success");
      //wait for a second
      await new Promise((r) => setTimeout(r, 3000));
      router.push("/manage/users");
      return;
    }
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setShowModal}
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
            <Dialog.Overlay className="backdrop-blur-xs fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
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
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <Content
                status={status}
                setShowModal={() => setShowModal()}
                handleDelete={() => handleDelete()}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Content({ status, setShowModal, handleDelete }) {
  switch (status) {
    case "loading":
      return <Loading />;
    case "error":
      return (
        <Error
          setShowModal={() => setShowModal()}
          handleDelete={() => handleDelete()}
        />
      );
    case "success":
      return <Success />;
    default:
      return (
        <Confirm
          setShowModal={() => setShowModal()}
          handleDelete={() => handleDelete()}
        />
      );
  }
}
function Loading() {
  return (
    <div className="loading">
      <p>Loading...</p>
    </div>
  );
}

function Error({ setShowModal, handleDelete }) {
  return (
    <div className="">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <i
            className="fa-solid fa-triangle-exclamation my-auto text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Error
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Couldn't process your request. Please try again later.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
          onClick={() => handleDelete()}
        >
          Try Again
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
          onClick={() => setShowModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className="">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <i
            className="fa-solid fa-check my-auto text-green-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            User Deleted Successfully
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Redirecting you to users list in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Confirm({ setShowModal, handleDelete }) {
  const [confirm, setConfirm] = useState("");
  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <i
            className="fa-solid fa-triangle-exclamation  text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Delete account
          </title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this account? All of the data
              associated with this account will be permanently removed from our
              servers forever. This action cannot be undone.
              <br />
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please type <strong>DELETE</strong> below to confirm.
            </p>
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-2 focus:ring-accent-2 sm:text-sm"
              placeholder="DELETE"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          {...(confirm === "DELETE" ? { disabled: false } : { disabled: true })}
          onClick={() => handleDelete()}
        >
          Confirm Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => setShowModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
