import { useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "@/helpers";

import Layout from "@/components/Layout";
import Bookmarks from "@/components/Bookmarks";
import ChangePassword from "@/components/ChangePassword";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";

interface Props {
  jwt: string;
}

function Profile({ jwt }: Props) {
  const { authStore, bookmarksStore } = useStores();
  const { user, isLoading: authIsLoading, logout } = authStore;
  const { isLoading: bookmarksIsLoading } = bookmarksStore;

  const router = useRouter();

  useEffect(() => {
    if (!authIsLoading && !user) router.push("/");
  }, [authIsLoading, user, router]);

  return (
    <Layout title="Russo Trip | Профиль">
      {(authIsLoading || bookmarksIsLoading || !user) && <Loading />}
      <PageTitle>Профиль</PageTitle>
      {user && (
        <div className="flex flex-col">
          <Bookmarks jwt={jwt} />
          <div className="flex flex-col w-full md:w-1/2">
            <ChangePassword />
            <button
              className="py-2 text-xl text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
              disabled={authIsLoading}
              onClick={() => logout()}
            >
              Выход
            </button>
          </div>
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
