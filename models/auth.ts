export interface IUser {
  username: string;
  email: string;
  id: number;
}

export interface IUserData {
  user: IUser;
}

export interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IChangePasswordForm {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
