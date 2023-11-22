import { User } from "@/types/User";
import { HttpClient } from "./http";
import { endpoints } from "./endpoints";
import { domain } from "./login";

export const getAllUsers = async (token: string) => {
  const url = `${domain}/${endpoints.getUsers}`;
  const headers = {
    Authorization: `${token}`,
  };
  try {
    const users = HttpClient.get<any>(url, { headers });
    return users;
  } catch (err) {
    console.log(err);
  }
};
