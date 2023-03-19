export interface IUser {
  username: string;
  email: string;
  id: string;
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