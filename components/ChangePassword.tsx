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
      <h2 className="text-3xl text-center underline mb-3 sm:text-start">
        Изменить пароль
      </h2>
      <form
        onSubmit={onSubmit}
        className="flex flex-col bg-secondary-color py-6 px-4 shadow-md"
      >
        <label className="mb-1" htmlFor="currentPassword">
          Пароль
        </label>
        <input
          className="bg-white shadow-sm py-1 px-2 mb-2 outline-none"
          required={true}
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
          className="py-1.5 px-4 self-start mt-2 text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
          disabled={isLoading}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default observer(ChangePassword);
