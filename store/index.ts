import { createContext, useContext } from "react";
import AuthStore from "./auth.store";

export class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}

const RootStoreContext = createContext(new RootStore());

export const useStores = () => useContext(RootStoreContext);
