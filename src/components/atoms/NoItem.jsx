import React from "react";
import { FaSearch } from "react-icons/fa";

export default function NoItem() {
  return (
    <ul
      className="
      flex flex-col items-center justify-center 
      my-12 mx-auto gap-4 
      w-[90%] max-w-75
      text-center 
      text-textSecondary dark:text-textSecondaryDark 
      opacity-70
    "
    >
      <FaSearch className="text-5xl opacity-50 mb-2" />
      <h3 className="font-normal text-base leading-relaxed">
        Tidak ada tugas yang tercatat
      </h3>
    </ul>
  );
}
