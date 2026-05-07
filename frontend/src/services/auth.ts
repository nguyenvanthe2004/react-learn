import type { LoginData } from "../types/user";
import instance from "./req";

export const callLogin = async (data: LoginData) => {
  const response = await instance.post("/Auth/login", data);
  localStorage.setItem("accessToken", response.data.data.accessToken);
  localStorage.setItem("refreshToken", response.data.data.refreshToken);
  return response.data;
};

export const callRegister = async (data: any) => {
  return await instance.post("/Auth/register", data);
};

export const callCurrentUser = async () => {
  return await instance.get("/Auth/me");
};
