import { HttpClient } from "../http";
import { LoginRequest, LoginResponse, ApiResponse } from "@/types/http";
import { endpoints } from "../endpoints";
import { mockLogin } from "../login";

describe("login", () => {
  it("should successfully login with valid credentials", async () => {
    const validRequest: LoginRequest = {
      email: "valid@example.com",
      password: "validPassword",
    };

    const mockLoginResponse = await mockLogin(validRequest);

    expect(mockLoginResponse).toBeTruthy();
    expect(mockLoginResponse.token).toBe("token12345565");
  });

  it("should fail to login with invalid credentials", async () => {
    const invalidRequest: LoginRequest = {
      email: "invalid@example.com",
      password: "invalidPassword",
    };

    const mockLoginResponse = await mockLogin(invalidRequest);
    expect(mockLoginResponse).toBeFalsy();

    expect(mockLoginResponse.error).toBe("Invalid login credentials");
  });
});
