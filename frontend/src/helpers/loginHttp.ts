import axios from "axios";
import { HttpClient } from "./http";
import { LoginRequest, LoginResponse, ApiResponse } from "@/types/http";
import { error } from "console";

export async function login(
  request: LoginRequest
): Promise<ApiResponse<LoginResponse> | unknown> {
  try {
    const response = await HttpClient.post<ApiResponse<LoginResponse>>(
      "http://localhost:8080/api/v1/auth/login",
      request
    );
    const data = response.data;

    if (!data) {
      throw new Error(data);
    }

    const loginResponse: ApiResponse<LoginResponse> = {
      success: data.success,
      message: data.message,
    };

    return loginResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const mockLogin = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse | null> => {
  try {
    const users = await HttpClient.get<LoginRequest[]>("mockLoginUsers.json");
    const foundUser = users.data.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      return Promise.resolve({
        token: "token12345565",
      });
    }

    return Promise.reject(new Error("Invalid login credentials"));
  } catch (err) {
    return null;
  }
};

const emailRegex = new RegExp(
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

export { emailRegex };
