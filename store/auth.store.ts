import { NEXT_URL } from "@/constants";
import { ILoginForm, IRegistrationForm, IUser } from "@/models";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";

class authStore {
  rootStore: RootStore;

  user: IUser | null = null;
  registrationForm: IRegistrationForm = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  loginForm: ILoginForm = {
    email: "",
    password: "",
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setUser = (user: IUser) => {
    this.user = user;
  };

  setRegistrationForm = (formData: IRegistrationForm) => {
    this.registrationForm = { ...formData };
  };

  setLoginForm = (formData: ILoginForm) => {
    this.loginForm = { ...formData };
  };

  registration = async (formData: IRegistrationForm) => {
    const response = await fetch(`${NEXT_URL}/api/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      this.setUser(data.user);
    } else {
      toast.error(data.message);
    }
  };

  login = async ({ email: identifier, password }: ILoginForm) => {
    const response = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (response.ok) {
      this.setUser(data.user);
    } else {
      toast.error(data.message);
    }
  };
}

export default authStore;
