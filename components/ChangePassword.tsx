import { useStores } from "@/store";
import { observer } from "mobx-react-lite";

function ChangePassword() {
  const { authStore } = useStores();
  const {
    isLoading,
    changePasswordForm,
    setChangePasswordForm,
    changePassword,
  } = authStore;
  const { currentPassword, password, passwordConfirmation } =
    changePasswordForm;

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
    <div className="flex flex-col">
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
    </div>
  );
}

export default observer(ChangePassword);
