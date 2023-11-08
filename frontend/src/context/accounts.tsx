import React, { createContext, useContext, useState } from "react";
import { accountRecords } from "@/components/SuperuserView/data";
import {
  AccountContextValues,
  AccountRecord,
  ContextProps,
} from "./context.types";

const AccountContext = createContext<AccountContextValues | null>(null);

const AccountsProvider = ({ children }: ContextProps) => {
  const [accounts, setAccounts] = useState<AccountRecord[]>(accountRecords);

  const addAccount = (account: AccountRecord) => {
    setAccounts([...accounts, account]);
  };

  const deleteAccount = (accountName: string) => {
    setAccounts(
      accounts.filter((account) => account.accountName !== accountName)
    );
  };

  const updateAccount = (account: AccountRecord) => {
    const accountIndex = accounts.findIndex(
      (ac) => ac.accountName === account.accountName
    );
    const updatedAccount = [...accounts];
    updatedAccount[accountIndex] = account;
    setAccounts(updatedAccount);
  };

  const value = {
    accounts,
    addAccount,
    deleteAccount,
    updateAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error(
      "AuthContext must be used within an AuthProvider component"
    );
  }

  return context;
}
export { AccountContext as UserContext, AccountsProvider };
