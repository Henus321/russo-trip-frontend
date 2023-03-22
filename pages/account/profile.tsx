import { useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

function Profile() {
  const { authStore } = useStores();
  const {
    user,
    isLoading,
    changePasswordForm,
    setChangePasswordForm,
    changePassword,
    logout,
  } = authStore;
  const { currentPassword, password, passwordConfirmation } =
    changePasswordForm;

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/");
  }, [isLoading, user, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChangePasswordForm({
      ...changePasswordForm,
      [e.target.id]: e.target.value,
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    changePassword(changePasswordForm);
  };

  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 mb-2 font-bold">Profile Page</h1>
      {isLoading && !user && <span>Loading...</span>}
      {!isLoading && !user && <span>You are not authorized!</span>}
      {user && (
        <div className="flex flex-col">
          <span className="mb-2">Hello, {user.username}!</span>
          <h2 className="text-2xl">Change Password</h2>
          <form className="flex flex-col bg-red-50 p-2">
            <label>Password</label>
            <input
              className="bg-slate-200 p-1 outline-none"
              required
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={onChange}
            />
            <label>New Password</label>
            <input
              className="bg-slate-200 p-1 outline-none"
              required
              type="password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <label>Confirm Password</label>
            <input
              className="bg-slate-200 p-1 outline-none"
              required
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={onChange}
            />
            <button
              className="bg-slate-200 p-1 outline-none self-start m-2"
              disabled={isLoading}
              onClick={onSubmit}
            >
              Change Password
            </button>
          </form>
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
