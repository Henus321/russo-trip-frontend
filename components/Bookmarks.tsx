import { useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { IBookmark } from "@/models";

import Post from "./Post";
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
    resetBookmark,
  } = bookmarksStore;

  useEffect(() => {
    if (user) fetchBookmarks({ jwt, user });
    // eslint-disable-next-line
  }, [user, reFetch]);

  const onClick = async (bookmark: IBookmark) =>
    deleteBookmark({ jwt, bookmark });

  return (
    <div className="flex flex-col mb-4">
      <OnUnmount func={resetBookmark} />
      <h2 className="text-3xl underline mb-2">Закладки</h2>
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        {bookmarks &&
          bookmarks.length > 0 &&
          bookmarks.map((bookmark) => (
            <div className="relative flex mb-2" key={bookmark.slug}>
              <Post small post={bookmark.post} />
              <button
                disabled={isLoading}
                className="absolute top-0 right-0 bg-transparent py-1 px-3 text-2xl font-bold"
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
