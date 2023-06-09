import { COMMON_SUCCESS_MESSAGE, NEXT_URL } from "@/constants";
import {
  IChangePasswordForm,
  ILoginForm,
  IRegistrationForm,
  IUser,
} from "@/models";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";

class authStore {
  rootStore: RootStore;

  user: IUser | null = null;
  isLoading: boolean = true;

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

  registration = async (formData: IRegistrationForm) => {
    this.setLoading(true);
    try {
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
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };

  login = async ({ email: identifier, password }: ILoginForm) => {
    this.setLoading(true);
    try {
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
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };

  logout = async () => {
    this.setLoading(true);
    try {
      const response = await fetch(`${NEXT_URL}/api/logout`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        this.setUser(null);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };

  checkUser = async () => {
    this.setLoading(true);
    try {
      const response = await fetch(`${NEXT_URL}/api/user`);
      const data = await response.json();

      if (response.ok) {
        this.setUser(data.user);
      } else {
        this.setUser(null);
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };

  changePassword = async (formData: IChangePasswordForm) => {
    this.setLoading(true);
    try {
      const response = await fetch(`${NEXT_URL}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setUser(data.user);
        toast.success(COMMON_SUCCESS_MESSAGE);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };
}

export default authStore;
