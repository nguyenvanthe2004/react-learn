export type Status = "active" | "inactive";

export enum PasswordField {
  CURRENT = "current",
  NEW = "new",
  CONFIRM = "confirm",
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