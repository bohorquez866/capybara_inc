import { HttpClient } from "./http";
import { LoginRequest, LoginResponse , ApiResponse} from "@/types/http";

export async function login(request: LoginRequest) {
  try {
    const response = await HttpClient.post("http://localhost:8080/api/v1/auth/login", request);

    const data = response.data;
    console.log(data);
    

    if (!data) {
      throw new Error(data.message);
    }

    const loginResponse: LoginResponse = {
      success: response.success,
      data: { token: data.token },
      message: response.message
    };

    return loginResponse;
  } catch (error) {
    console.error(error);
    return error
  }
}
