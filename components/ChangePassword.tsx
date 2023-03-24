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
    <div className="flex flex-col mb-6">
      <h2 className="text-3xl underline mb-3">Изменить пароль</h2>
      <form className="flex flex-col bg-slate-100 py-6 px-4 shadow-md">
        <label className="mb-1" htmlFor="currentPassword">
          Пароль
        </label>
        <input
          className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
          required
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={onChange}
        />
        <label className="mb-1" htmlFor="password">
          Новый пароль
        </label>
        <input
          className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
          required
          type="password"
          id="password"
          value={password}
          onChange={onChange}
        />
        <label className="mb-1" htmlFor="passwordConfirmation">
          Подтвердите пароль
        </label>
        <input
          className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
          required
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={onChange}
        />
        <button
          className="bg-slate-300 shadow-sm py-1.5 px-4 self-start mt-2 disabled:text-gray-700"
          disabled={isLoading}
          onClick={onSubmit}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default observer(ChangePassword);
