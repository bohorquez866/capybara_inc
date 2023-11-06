import { User } from "@/types/User";

export const setUser = (user: User) => {
  const stringifiedUser: string = JSON.stringify(user);
  localStorage.setItem("user", stringifiedUser);
};
