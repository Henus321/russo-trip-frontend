import { createContext, useContext } from "react";
import AuthStore from "./auth.store";
import CommentsStore from "./comments.store";
import BookmarksStore from "./bookmarks.store";
import SearchStore from "./search.store";

export class RootStore {
  authStore: AuthStore;
  commentsStore: CommentsStore;
  bookmarksStore: BookmarksStore;
  searchStore: SearchStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.commentsStore = new CommentsStore(this);
    this.bookmarksStore = new BookmarksStore(this);
    this.searchStore = new SearchStore(this);
  }
}

const RootStoreContext = createContext(new RootStore());

export const useStores = () => useContext(RootStoreContext);
