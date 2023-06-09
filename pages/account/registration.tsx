import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PASSWORD_MATCH_MESSAGE } from "@/constants";
import { IRegistrationForm } from "@/models";
import Link from "next/link";

import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";

const initialFormData: IRegistrationForm = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function RegistrationPage() {
  const { authStore } = useStores();
  const { user, isLoading, registration } = authStore;

  const [registrationForm, setRegistrationForm] = useState(initialFormData);
  const { username, email, password, passwordConfirm } = registrationForm;

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegistrationForm({
      ...registrationForm,
      [e.target.id]: e.target.value,
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error(PASSWORD_MATCH_MESSAGE);
      return;
    }

    registration(registrationForm);
    setRegistrationForm(initialFormData);
  };

  return (
    <Layout title="Russo Trip | Регистрация">
      {(isLoading || user) && <Loading />}
      <PageTitle>Регистрация</PageTitle>
      <div className="flex flex-col w-full md:w-1/2">
        <form
          className="flex flex-col bg-secondary-color py-6 px-4 shadow-md"
          onSubmit={onSubmit}
        >
          <label className="mb-1" htmlFor="username">
            Имя
          </label>
          <input
            className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
            required
            disabled={isLoading}
            type="text"
            id="username"
            onChange={onChange}
            value={username}
          />
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
            className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
            required
            disabled={isLoading}
            type="password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <label className="mb-1" htmlFor="passwordConfirm">
            Подтвердите пароль
          </label>
          <input
            className="bg-white shadow-sm py-1 px-2 mb-4 outline-none"
            required
            disabled={isLoading}
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />
          <button
            className="py-2 text-xl mb-2 text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
            disabled={isLoading}
          >
            Зарегистрироваться
          </button>
          <p className="text-center">
            Уже есть аккаунт?{" "}
            <Link className="underline font-bold" href="/account/login">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default observer(RegistrationPage);
