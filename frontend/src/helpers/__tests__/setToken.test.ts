import { setToken } from "../setToken";

describe("setToken", () => {
  it("should set the token in localStorage", () => {
    const token = "test-token";
    setToken(token);

    const storedToken = JSON.parse(localStorage.getItem("token") as string);
    expect(storedToken.token).toBe(token);
  });
});
