import { useEffect, useRef } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { IBookmark } from "@/models";
import Link from "next/link";

interface Props {
  jwt: string;
}

function Bookmarks({ jwt }: Props) {
  const { authStore, bookmarksStore } = useStores();
  const { user } = authStore;
  const {
    bookmarks,
    isLoading,
    reFetch,
    deleteBookmark,
    fetchBookmarks,
    resetBookmark,
  } = bookmarksStore;

  useEffect(() => {
    if (user) fetchBookmarks({ jwt, user });
    // eslint-disable-next-line
  }, [user, reFetch]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    return () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      resetBookmark();
    };
  }, [resetBookmark]);

  const onClick = async (bookmark: IBookmark) =>
    deleteBookmark({ jwt, bookmark });

  const getPostSlug = (bookmark: IBookmark) =>
    bookmark.slug.split("-").slice(1).join("-");

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">Bookmarks</h2>
      {bookmarks &&
        bookmarks.map((bookmark) => (
          <div className="flex items-center mb-2" key={bookmark.slug}>
            <span>{bookmark.slug}</span>
            <Link
              className="bg-slate-300 mx-2 py-1 px-2"
              href={`/blog/${getPostSlug(bookmark)}`}
            >
              link
            </Link>
            <button
              disabled={isLoading}
              className="bg-red-100 py-0.75 px-1.5 ml-2 disabled:bg-black"
              onClick={() => onClick(bookmark)}
            >
              x
            </button>
          </div>
        ))}
    </div>
  );
}

export default observer(Bookmarks);
