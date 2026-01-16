import API from "./axios";
import type { RegisterInput, PublicUser, LoginInputs } from "../types/user";

export const login = async (data:LoginInputs): Promise<PublicUser> => {
  const res = await API.post("/auth/login", data);
  return res.data.user;
};

export const register = async (data: RegisterInput): Promise<PublicUser> => {
  const res = await API.post("/auth/register", data);
  console.log(res.data)
  return res.data.user;
};

export const logout = async () => {
  await API.post("/auth/logout");
};

export const getMe = async (): Promise<PublicUser> => {
  const res = await API.get("/auth/me");
  return res.data.user;
};
