import { AccountRecord } from "@/context/context.types";
import { Role } from "@/hooks/useRoleAccess";

export interface Record {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role.ADMIN | Role.USER;
}

export interface UserData {
  id: string;
  english_level: string;
  role: Role.ADMIN | Role.USER;
  email: string;
  cv_url: string;
  username: string;
  name: string;
  team: AccountRecord[];
}
