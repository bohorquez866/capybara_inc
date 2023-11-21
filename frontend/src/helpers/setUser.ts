import { User } from "@/types/User";

export const setUser = (user: string | number) => {
  const stringifiedUser: string = JSON.stringify(user);
  localStorage.setItem("user", stringifiedUser);
};
