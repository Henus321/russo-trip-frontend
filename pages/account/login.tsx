import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStores } from "@/store";
import Link from "next/link";

import Layout from "@/components/Layout";
import { observer } from "mobx-react-lite";

function LoginPage() {
  const { authStore } = useStores();
  const { user, loginForm, setLoginForm, login } = authStore;

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
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Login Page</h1>
      <form onSubmit={onSubmit}>
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
        <button className="bg-slate-600 py-2 px-4 my-2 text-white">
          Submit
        </button>
      </form>
      <p>
        Don&apos;t have an account?{" "}
        <Link className="text-red-500" href="/account/registration">
          Registration
        </Link>
      </p>
    </Layout>
  );
}

export default observer(LoginPage);
