import { useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { IPost } from "@/models";
import OnUnmount from "./OnUnmount";

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
    setLoading,
  } = bookmarksStore;

  useEffect(() => {
    if (user) fetchBookmark({ jwt, post, user });
    if (!user) setLoading(false);
    // eslint-disable-next-line
  }, [user, reFetch]);

  const onClick = async () => {
    if (!isLoading && !bookmark) {
      addBookmark({ jwt, post, user });
    }
    if (!isLoading && bookmark) {
      deleteBookmark({ jwt, bookmark });
    }
  };

  if (!user) return <></>;

  return (
    <div className="mb-2">
      <OnUnmount func={resetBookmark} />
      <button
        disabled={isLoading}
        className="shadow-md py-2 px-4 text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
        onClick={() => onClick()}
      >
        {bookmark ? "Удалить из закладок" : "Добавить в закладки"}
      </button>
    </div>
  );
}

export default observer(Bookmark);
