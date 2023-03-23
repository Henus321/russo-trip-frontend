import { useEffect, useRef } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";

interface Props {
  jwt: string;
  postSlug: string;
}

function Bookmark({ jwt, postSlug }: Props) {
  const { authStore, bookmarksStore } = useStores();
  const { user } = authStore;
  const {
    bookmark,
    isLoading,
    reFetch,
    addBookmark,
    deleteBookmark,
    fetchBookmark,
    resetBookmark,
  } = bookmarksStore;

  const slug = `${user?.id}-${postSlug}`;

  useEffect(() => {
    if (user) fetchBookmark({ jwt, slug, user });
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

  const onClick = async () => {
    if (!isLoading && !bookmark) {
      addBookmark({ jwt, slug, user });
    }
    if (!isLoading && bookmark) {
      deleteBookmark({ jwt, bookmark });
    }
  };

  return (
    <div>
      <button
        disabled={isLoading}
        className={`${
          bookmark ? "bg-red-300" : "bg-blue-200"
        } px-2 py-1 disabled:bg-black`}
        onClick={() => onClick()}
      >
        Bookmark
      </button>
    </div>
  );
}

export default observer(Bookmark);
