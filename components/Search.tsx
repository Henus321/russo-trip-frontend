import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";

import Spinner from "./Spinner";
import SearchItem from "./SearchItem";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  const { searchStore } = useStores();
  const { searchResult, isLoading, setPosts, fetchPosts } = searchStore;

  useEffect(() => {
    if (debouncedSearch === "") {
      setPosts(null);
    } else {
      fetchPosts(debouncedSearch);
    }
  }, [debouncedSearch, setPosts, fetchPosts]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const onFocus = (debouncedSearch: string) => {
    if (!debouncedSearch) {
      setPosts(null);
      return;
    }
    fetchPosts(debouncedSearch);
  };

  const onBlur = () => {
    setPosts(null);
  };

  const onClearSearch = () => {
    setPosts(null);
    setSearchTerm("");
  };

  const onPreventBlur = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div className="relative flex w-full mt-3 lg:w-auto lg:mt-0">
      <form
        onBlur={() => onBlur()}
        onFocus={() => onFocus(debouncedSearch)}
        className="relative flex items-center justify-end w-full text-gray lg:w-auto"
      >
        <input
          type="search"
          className="bg-white text-primary-color-alt h-10 pl-3 pr-10 focus:outline-none w-full lg:w-80"
          placeholder="Поиск по экскурсиям..."
          onChange={(e) => onChange(e)}
          value={searchTerm}
        />
        <FaSearch className="absolute top-0 right-0 text-primary-color-alt mt-3 mr-4" />
      </form>
      {searchResult && (
        <div
          onMouseDown={(e) => onPreventBlur(e)}
          className="absolute top-10 right-0 min-h-[10rem] max-h-[70vh] overflow-y-auto w-full flex flex-col bg-secondary-color-alt text-primary-color z-30 lg:w-[200%]"
        >
          {isLoading && (
            <div className="absolute flex justify-center items-center w-full h-full bg-slate-900/40">
              <Spinner className="h-24 w-24" />
            </div>
          )}
          {!isLoading &&
            searchResult.map((post) => (
              <SearchItem
                post={post}
                onClearSearch={onClearSearch}
                key={`res-${post.title}-${post.city}`}
              />
            ))}
          {!isLoading && searchResult.length === 0 && (
            <div className="h-40 w-full flex justify-center items-center">
              <span>Ничего не найдено</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default observer(Search);
