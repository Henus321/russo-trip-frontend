import { useEffect, useRef } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { IPost } from "@/models";

interface Props {
  jwt: string;
  post: IPost;
}

function Bookmark({ jwt, post }: Props) {
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

  useEffect(() => {
    if (user) fetchBookmark({ jwt, post, user });
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
      addBookmark({ jwt, post, user });
    }
    if (!isLoading && bookmark) {
      deleteBookmark({ jwt, bookmark });
    }
  };

  return (
    <div className="mb-2">
      <button
        disabled={isLoading}
        className=" bg-slate-800 text-white shadow-md py-2 px-4 disabled:text-gray-400 hover:bg-slate-900 active:text-slate-200"
        onClick={() => onClick()}
      >
        {bookmark ? "Удалить из закладок" : "Добавить в закладки"}
      </button>
    </div>
  );
}

export default observer(Bookmark);
