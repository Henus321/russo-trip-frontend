import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PASSWORD_MATCH_MESSAGE } from "@/constants";
import Link from "next/link";

import Layout from "@/components/Layout";

function RegistrationPage() {
  const { authStore } = useStores();
  const { user, registrationForm, setRegistrationForm, registration } =
    authStore;

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
  };

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Registration Page</h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col my-2">
          <label>Username</label>
          <input
            className="bg-slate-200 outline-none p-2"
            required
            type="text"
            id="username"
            onChange={onChange}
            value={username}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Email</label>
          <input
            className="bg-slate-200 outline-none p-2"
            required
            type="email"
            id="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Password</label>
          <input
            className="bg-slate-200 outline-none p-2"
            required
            type="password"
            id="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col my-2">
          <label>Password Confirm</label>
          <input
            className="bg-slate-200 outline-none p-2"
            required
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <button className="bg-slate-600 py-2 px-4 my-2 text-white">
          Submit
        </button>
      </form>
      <p>
        Altready have an account?{" "}
        <Link className="text-red-500" href="/account/login">
          Login
        </Link>
      </p>
    </Layout>
  );
}

export default observer(RegistrationPage);
