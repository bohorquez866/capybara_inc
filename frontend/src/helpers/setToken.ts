export function setToken(token: string): void {
  localStorage.setItem("token", JSON.stringify({ token }));
}
