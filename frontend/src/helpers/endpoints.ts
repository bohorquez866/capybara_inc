export const apiVersion = "v1";
const commonEndpoint = `api/${apiVersion}`;

export const endpoints = {
  login: `${commonEndpoint}/auth/login`,
  getUserById: `${commonEndpoint}/users/getUser`,
  updateUser: `${commonEndpoint}/users/updateUser`,
  getUsers: `${commonEndpoint}/users/getAllUsers`,
  getAllAccounts: `${commonEndpoint}/accounts/getAllAccounts`,
};
