import { NEXT_URL } from "@/constants";
import { ILoginForm, IRegistrationForm, IUser } from "@/models";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";

class authStore {
  rootStore: RootStore;

  user: IUser | null = null;
  isLoading: boolean = false;

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

  setUser = (user: IUser | null) => {
    this.user = user;
  };

  setLoading = (status: boolean) => {
    this.isLoading = status;
  };

  setRegistrationForm = (formData: IRegistrationForm) => {
    this.registrationForm = { ...formData };
  };

  resetRegistrationForm = () => {
    this.registrationForm = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  };

  setLoginForm = (formData: ILoginForm) => {
    this.loginForm = { ...formData };
  };

  resetLoginForm = () => {
    this.loginForm = {
      email: "",
      password: "",
    };
  };

  registration = async (formData: IRegistrationForm) => {
    this.setLoading(true);
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
      this.resetRegistrationForm();
    } else {
      toast.error(data.message);
    }
    this.setLoading(false);
  };

  login = async ({ email: identifier, password }: ILoginForm) => {
    this.setLoading(true);
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
      this.resetLoginForm();
    } else {
      toast.error(data.message);
    }
    this.setLoading(false);
  };

  logout = async () => {
    this.setLoading(true);
    const response = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (response.ok) {
      this.setUser(null);
    }
    this.setLoading(false);
  };

  checkUser = async () => {
    this.setLoading(true);
    const response = await fetch(`${NEXT_URL}/api/user`);
    const data = await response.json();

    if (response.ok) {
      this.setUser(data.user);
    } else {
      this.setUser(null);
    }
    this.setLoading(false);
  };
}

export default authStore;
