import { User } from "@/types/User";
import { HttpClient } from "./http";
import { endpoints } from "./endpoints";

export const getAllUsers = async (token: string) => {
  const headers = {
    Authorization: `${token}`,
  };
  try {
    const users = HttpClient.get<User>(endpoints.getUsers, { headers });
    return users;
  } catch (err) {
    console.log(err);
  }
};
