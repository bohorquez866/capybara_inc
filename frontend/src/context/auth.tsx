import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/User";

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
  login: (user: User) => void;
}

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "null") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
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
