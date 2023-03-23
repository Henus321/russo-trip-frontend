import { useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "@/helpers";

import Layout from "@/components/Layout";
import Bookmarks from "@/components/Bookmarks";
import ChangePassword from "@/components/ChangePassword";

interface Props {
  jwt: string;
}

function Profile({ jwt }: Props) {
  const { authStore } = useStores();
  const { user, isLoading, logout } = authStore;

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/");
  }, [isLoading, user, router]);

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 mb-2 font-bold">Profile Page</h1>
      {isLoading && !user && <span>Loading...</span>}
      {!isLoading && !user && <span>You are not authorized!</span>}
      {user && (
        <div className="flex flex-col">
          <span className="mb-2">Hello, {user.username}!</span>
          <Bookmarks jwt={jwt} />
          <ChangePassword />
          <button
            className="bg-slate-300 py-1 px-2 self-start"
            disabled={isLoading}
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      )}
    </Layout>
  );
}

export default observer(Profile);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwt } = parseCookies(req);

  return {
    props: {
      jwt,
    },
  };
};
