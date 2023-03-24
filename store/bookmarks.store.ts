import { IData, INewBookmark, IBookmark, IUser } from "@/models";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";
import {
  API_URL,
  COMMON_ERROR_MESSAGE,
  NOT_AUTHORIZED_MESSAGE,
  NO_TOKEN_MESSAGE,
} from "@/constants";
import { convertDataToBookmarks, getBookmarkSlug } from "@/helpers";
import qs from "qs";

class bookmarksStore {
  rootStore: RootStore;

  bookmark: IBookmark | null = null;
  bookmarks: IBookmark[] | null = null;
  isLoading: boolean = true;
  reFetch: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setBookmark = (bookmark: IBookmark) => {
    this.bookmark = bookmark;
  };

  resetBookmark = () => {
    this.bookmark = null;
  };

  setBookmarks = (bookmarks: IBookmark[]) => {
    this.bookmarks = bookmarks;
  };

  resetBookmarks = () => {
    this.bookmarks = null;
  };

  setLoading = (status: boolean) => {
    this.isLoading = status;
  };

  setFetch = (status: boolean) => {
    this.reFetch = status;
  };

  fetchBookmark = async ({ jwt, post, user }: INewBookmark) => {
    if (!user) return;
    this.setLoading(true);

    const slug = getBookmarkSlug(user, post);

    const bookmarkQuery = qs.stringify({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        user: "user",
        post: {
          populate: "*",
        },
      },
    });

    const response = await fetch(`${API_URL}/api/bookmarks?${bookmarkQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data }: { data: IData[] } = await response.json();

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        toast.error(NO_TOKEN_MESSAGE);
        this.setLoading(false);
        return;
      }
      toast.error(COMMON_ERROR_MESSAGE);
    } else {
      const book = convertDataToBookmarks(data)[0];
      this.setBookmark(book);
    }
    this.setLoading(false);
  };

  fetchBookmarks = async ({
    jwt,
    user,
  }: {
    jwt: string;
    user: IUser | null;
  }) => {
    if (!user) return;
    this.setLoading(true);

    const bookmarkQuery = qs.stringify({
      filters: {
        user: {
          id: {
            $eq: user.id,
          },
        },
      },
      populate: {
        user: "user",
        post: {
          populate: "*",
        },
      },
      sort: ["createdAt:desc"],
    });

    const response = await fetch(`${API_URL}/api/bookmarks?${bookmarkQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data }: { data: IData[] } = await response.json();

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        toast.error(NO_TOKEN_MESSAGE);
        this.setLoading(false);
        return;
      }
      toast.error(COMMON_ERROR_MESSAGE);
    } else {
      const books = convertDataToBookmarks(data);
      this.setBookmarks(books);
    }
    this.setLoading(false);
  };

  addBookmark = async ({ jwt, post, user }: INewBookmark) => {
    if (!jwt || !user) {
      toast.error(NOT_AUTHORIZED_MESSAGE);
      return;
    }
    this.setLoading(true);

    const slug = getBookmarkSlug(user, post);

    const response = await fetch(`${API_URL}/api/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          user: user?.id,
          slug,
          post: post,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        toast.error(NO_TOKEN_MESSAGE);
        this.setLoading(false);
        return;
      }
      toast.error(COMMON_ERROR_MESSAGE);
    } else {
      this.setFetch(!this.reFetch);
    }
    this.setLoading(false);
  };

  deleteBookmark = async ({
    jwt,
    bookmark,
  }: {
    jwt: string;
    bookmark: IBookmark | null;
  }) => {
    if (!jwt || !bookmark) {
      toast.error(NOT_AUTHORIZED_MESSAGE);
      return;
    }
    this.setLoading(true);

    const response = await fetch(`${API_URL}/api/bookmarks/${bookmark.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        toast.error(NO_TOKEN_MESSAGE);
        this.setLoading(false);
        return;
      }
      toast.error(COMMON_ERROR_MESSAGE);
    } else {
      this.setFetch(!this.reFetch);
    }
    this.setLoading(false);
  };
}

export default bookmarksStore;
