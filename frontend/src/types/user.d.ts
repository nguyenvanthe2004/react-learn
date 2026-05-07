export type Status = "active" | "inactive";

export enum PasswordField {
  CURRENT = "current",
  NEW = "new",
  CONFIRM = "confirm",
}

export interface LoginData {
  userNameOrEmail: string;
  password: string;
}

export interface User {
  id: number;
  code: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  org: string;
  alias: string;
  status: Status;
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
}

export interface CurrentUserState {
  currentUser: IUser;
}

