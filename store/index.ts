import { createContext, useContext } from "react";
import AuthStore from "./auth.store";
import CommentsStore from "./comments.store";

export class RootStore {
  authStore: AuthStore;
  commentsStore: CommentsStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.commentsStore = new CommentsStore(this);
  }
}

const RootStoreContext = createContext(new RootStore());

export const useStores = () => useContext(RootStoreContext);
