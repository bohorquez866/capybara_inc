import { HttpClient } from "./http";
import { endpoints } from "./endpoints";
import { domain } from "./login";

export const getAllAccounts = async (token: string) => {
  const url = `${domain}/${endpoints.getAllAccounts}`;
  const headers = {
    Authorization: `${token}`,
  };

  try {
    const accounts = await HttpClient.get<any>(url, { headers });
    return accounts;
  } catch (err) {
    console.log(err);
  }
};
