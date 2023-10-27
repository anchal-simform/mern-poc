import { useRouter } from "next/router";
import React, { useState } from "react";

export default function HeaderDropdown() {
  const [open, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="fixed top-0 right-44 mt-4 mr-4 dropdown inline-block z-50">
      <button
        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        onClick={() => {
          setIsOpen((flag) => !flag);
        }}
      >
        <span className="mr-1">My data</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
        </svg>
      </button>
      <ul
        className={`dropdown-menu absolute text-gray-700 pt-1 ${
          !open ? "hidden" : ""
        }`}
      >
        <li
          onClick={() => {
            router.push("/me/profile");
          }}
          className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
        >
          profile
        </li>
        <li
          onClick={() => {
            router.push("/me/orders");
          }}
          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
        >
          orders
        </li>
      </ul>
    </div>
  );
}
