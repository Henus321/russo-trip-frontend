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
    <div className="mr-4">
      <div className="container mx-auto flex items-center justify-end">
        <form className="relative text-gray">
          <input
            type="search"
            className="bg-white text-slate-900 h-10 px-5 pr-10 text-sm focus:outline-none w-80"
            placeholder="Поиск по экскурсиям..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-0 right-0 text-slate-900 mt-3 mr-4" />
        </form>
      </div>
    </div>
  );
}
