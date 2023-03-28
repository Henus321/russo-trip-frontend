import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
    } else {
      console.log(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="flex w-full mt-3 lg:w-auto lg:mt-0">
      <form className="relative flex items-center justify-end w-full text-gray lg:w-auto">
        <input
          type="search"
          className="bg-white text-primary-color-alt h-10 px-5 pr-10 text-sm focus:outline-none w-full lg:w-80"
          placeholder="Поиск по экскурсиям..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute top-0 right-0 text-primary-color-alt mt-3 mr-4" />
      </form>
    </div>
  );
}
