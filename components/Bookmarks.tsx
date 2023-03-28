import { useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { IBookmark } from "@/models";

import PostItem from "./PostItem";
import OnUnmount from "./OnUnmount";

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
    resetBookmarks,
  } = bookmarksStore;

  useEffect(() => {
    if (user) fetchBookmarks({ jwt, user });
    // eslint-disable-next-line
  }, [user, reFetch]);

  const onClick = async (bookmark: IBookmark) =>
    deleteBookmark({ jwt, bookmark });

  return (
    <div className="flex flex-col mb-4">
      <OnUnmount func={resetBookmarks} />
      <h2 className="text-3xl text-center underline mb-2 sm:text-start">
        Закладки
      </h2>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookmarks &&
          bookmarks.length > 0 &&
          bookmarks.map((bookmark) => (
            <div className="relative flex mb-2" key={bookmark.slug}>
              <PostItem small post={bookmark.post} />
              <button
                disabled={isLoading}
                className="absolute top-0 right-0 bg-transparent py-3 px-6 text-2xl font-bold sm:py-1 sm:px-3"
                onClick={() => onClick(bookmark)}
              >
                x
              </button>
            </div>
          ))}
        {bookmarks && bookmarks.length === 0 && (
          <div className="flex items-center justify-center h-48 p-6 bg-secondary-color shadow-md">
            <span>У вас нет закладок...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(Bookmarks);
