import React, { createContext, useContext, useState } from "react";
import { users as initialUsers } from "@/components/SuperuserView/data";
import { Record } from "@/components/SuperuserView/SuperUserView.types";
import { ContextProps, ProfilesContextValues } from "./context.types";

const UserContext = createContext<ProfilesContextValues | null>(null);

const UserProvider = ({ children }: ContextProps) => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user: Record) => {
    setUsers([...users, user]);
  };

  const deleteUser = (userEmail: string) => {
    setUsers(users.filter((user) => user.email !== userEmail));
  };

  const updateUser = (user: Record) => {
    const updatedUsers = users.map((existingUser) => {
      if (existingUser.email === user.email) {
        return user;
      }

      return existingUser;
    });
    setUsers(updatedUsers);
  };

  const value = {
    users,
    addUser,
    deleteUser,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "AuthContext must be used within an AuthProvider component"
    );
  }

  return context;
}
export { UserContext, UserProvider };
