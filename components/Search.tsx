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
    <div className="bg-gray-600 p-4">
      <div className="container mx-auto flex items-center justify-end">
        <form className="relative text-gray">
          <input
            type="search"
            className="bg-white h-10 px-5 pr-10 text-sm focus:outline-none w-80"
            placeholder="Search Trips..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" />
        </form>
      </div>
    </div>
  );
}
