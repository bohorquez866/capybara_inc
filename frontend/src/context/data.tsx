import React, { createContext, useContext, useState } from "react";
import {
  accountRecords,
  accountUsers,
  users as initialUsers,
} from "@/components/SuperuserView/data";
import {
  Record,
  UserData,
} from "@/components/SuperuserView/SuperUserView.types";
import {
  AccountRecord,
  ContextProps,
  ProfilesContextValues,
} from "./context.types";

const DataConext = createContext<ProfilesContextValues | null>(null);

const DataProvider = ({ children }: ContextProps) => {
  const [users, setUsers] = useState(accountUsers);
  const [accounts, setAccounts] = useState<AccountRecord[]>(accountRecords);

  const addUser = (user: UserData) => {
    setUsers([...users, user]);
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const updateUser = (user: UserData) => {
    const userIndex = users.findIndex((us) => us.id === user.id);
    const updatedUsers = [...users];
    updatedUsers[userIndex] = user;
    setUsers(updatedUsers);
  };

  const addAccount = (account: AccountRecord) => {
    setAccounts([...accounts, account]);
  };

  const deleteAccount = (accountId: string) => {
    setAccounts(accounts.filter((account) => account.id !== accountId));
  };

  const updateAccount = (account: AccountRecord) => {
    const accountIndex = accounts.findIndex((ac) => ac.id === account.id);
    const updatedAccount = [...accounts];
    updatedAccount[accountIndex] = account;
    setAccounts(updatedAccount);
  };

  const value = {
    users,
    accounts,
    addUser,
    deleteUser,
    updateUser,
    addAccount,
    deleteAccount,
    updateAccount,
    setUsers,
    setAccounts,
  };

  return <DataConext.Provider value={value}>{children}</DataConext.Provider>;
};

export function useData() {
  const context = useContext(DataConext);

  if (!context) {
    throw new Error(
      "AuthContext must be used within an AuthProvider component"
    );
  }

  return context;
}
export { DataConext, DataProvider };
