import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";
import OnUnmount from "@/components/OnUnmount";

function LoginPage() {
  const { authStore } = useStores();
  const { user, loginForm, isLoading, setLoginForm, login, resetLoginForm } =
    authStore;

  const { email, password } = loginForm;

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(loginForm);
  };

  return (
    <Layout title="Russo Trip | Вход">
      <OnUnmount func={resetLoginForm} />
      {(isLoading || user) && <Loading />}
      <PageTitle>Вход</PageTitle>
      <div className="flex flex-col w-full md:w-1/2">
        <form
          className="flex flex-col bg-secondary-color py-6 px-4 shadow-md"
          onSubmit={onSubmit}
        >
          <label className="mb-1" htmlFor="email">
            Почта
          </label>
          <input
            className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
            required
            disabled={isLoading}
            type="email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <label className="mb-1" htmlFor="password">
            Пароль
          </label>
          <input
            className="bg-white shadow-sm py-1 px-2 mb-4 outline-none"
            required
            disabled={isLoading}
            type="password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <button
            className="py-2 text-xl mb-2 text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
            disabled={isLoading}
          >
            Войти
          </button>
          <p className="text-center">
            Нет аккаунта?{" "}
            <Link className="underline font-bold" href="/account/registration">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default observer(LoginPage);
