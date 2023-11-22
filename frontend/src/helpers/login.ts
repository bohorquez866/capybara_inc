import { HttpClient } from "./http";
import {
  LoginRequest,
  LoginResponse,
  ApiResponse,
  LoginParams,
} from "@/types/http";
import { endpoints } from "./endpoints";
import { User } from "@/types/User";

export const domain = "http://localhost:8080";

export const loginRequest = async ({ email, password }: LoginParams) => {
  const url = `${domain}/${endpoints.login}`;
  const data = {
    password,
    email,
  };

  try {
    const axiosResponse = await HttpClient.post<LoginResponse>(url, data);
    const sendLogin = axiosResponse.data;
    return Promise.resolve(sendLogin);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserInfo = async (id: string, token: string) => {
  const headers = {
    Authorization: `${token}`,
  };

  try {
    const url = `${domain}/${endpoints.getUserById}/${id}`;
    const response = await HttpClient.get(url, { headers });

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const editUserInfo = async (id: string, token: string, data: any) => {
  const url = `${domain}/${endpoints.updateUser}/${id}`;

  const headers = {
    Authorization: `${token}`,
  };

  try {
    const response = await HttpClient.put<User>(url, data, { headers });
    return response;
  } catch (err) {
    console.log(err);
  }
};
