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
    console.log(data);

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
        english_level: "C1",
        role: "superuser",
        email: "bohorquez866@gmail.com",
        cv_url:
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        username: "bohorquez866",
        name: "Jesus R. Bohorquez",
        team: "arroyo",
      });
    }

    return Promise.reject(new Error("Invalid login credentials"));
  } catch (err) {
    return null;
  }
};
