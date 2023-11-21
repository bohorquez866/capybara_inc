import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/User";
import { Role } from "@/hooks/useRoleAccess";
import { ContextProps } from "./context.types";
import { accountRecords } from "@/components/SuperuserView/data";
import { updateUser } from "../helpers/UserHttp";
import { setToken } from "@/helpers/setToken";

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: ContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const localSession = localStorage.getItem("token") as string;
    const parsedLocalSession = JSON.parse(localSession);

    if (parsedLocalSession) setIsLoggedIn(true);
  }, []);

  const updateUser = (newVal: any) => setUser({ ...user, ...newVal });

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const login = (token: string): void => {
    setIsLoggedIn(true);
    setToken(token);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    updateUser,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext must be used within an AuthProvider component"
    );
  }

  return context;
}
