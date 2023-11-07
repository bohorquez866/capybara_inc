import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/User";
import { Role } from "@/hooks/useRoleAccess";
import { setUser } from "../helpers/setUser";

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const localSession = localStorage.getItem("token") as string;
    const parsedLocalSession = JSON.parse(localSession);

    if (parsedLocalSession) setIsLoggedIn(true);

    setUser({
      english_level: "C1",
      role: Role.SUPERUSER,
      email: "bohorquez866@gmail.com",
      cv_url:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      username: "bohorquez866",
      name: "Jesus R. Bohorquez",
      team: "Arroyo",
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const login = () => setIsLoggedIn(true);

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
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
