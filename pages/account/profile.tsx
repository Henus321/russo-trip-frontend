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
      <PageTitle>Профиль</PageTitle>
      {isLoading && !user && <span>Загрузка...</span>}
      {user && (
        <div className="flex flex-col">
          <Bookmarks jwt={jwt} />
          <div className="flex flex-col w-1/2">
            <ChangePassword />
            <button
              className="bg-slate-800 text-white py-2 text-xl disabled:text-gray-400 hover:bg-slate-900 active:text-slate-200"
              disabled={isLoading}
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
