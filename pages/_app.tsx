import type { AppProps } from "next/app";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  const {
    authStore: { checkUser },
  } = useStores();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default observer(App);
