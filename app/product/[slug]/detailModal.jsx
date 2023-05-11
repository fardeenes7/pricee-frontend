import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import RecordLinkClick from "./recordLinkClick";

// function goToShop(url) {
//   console.log(url);
//   window.open(url, "_blank");
// }

function goToShop(url, id) {
  RecordLinkClick({ id });
  console.log(url);
  window.open(url, "_blank");
}

export default function DetailModal({ link, show, onClose, title }) {
  const cancelButtonRef = useRef(null);
  console.log(link);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
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
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex w-full items-center justify-between p-4">
                  {/* <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  /> */}
                  <Image
                    src={link.shop.logo}
                    alt={link.shop.name}
                    width={100}
                    height={100}
                    className="greyscale invert"
                  />
                  <h1 className="text-xl font-bold">{link.shop.name}</h1>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-md font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <dl class="mt-4 grid grid-cols-1 gap-x-6 gap-y-0 px-8">
                    <div class="inline-flex items-center justify-start border-t border-gray-200 py-4">
                      <dt class="w-32 text-start text-sm font-medium text-gray-900">
                        Price
                      </dt>
                      <dd class="text-sm text-gray-500">{link.price} BDT</dd>
                    </div>
                    <div class="inline-flex items-center justify-start border-t border-gray-200 py-4">
                      <dt class="w-32 text-start text-sm font-medium text-gray-900">
                        Stock Status
                      </dt>
                      <dd class="text-sm text-gray-500">{link.status}</dd>
                    </div>
                    <div class="inline-flex items-center justify-start border-t border-gray-200 py-4">
                      <dt class="w-32 text-start text-sm font-medium text-gray-900">
                        Last Updated
                      </dt>
                      <dd class="text-sm text-gray-500">{link.last_updated}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-4 text-sm sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-accent-1 px-4 py-2 font-medium text-white shadow-sm hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => goToShop(link.href, link.id)}
                >
                  Go to {link.shop.name}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={() => onClose()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>{" "}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
