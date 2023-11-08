import { Role } from "@/hooks/useRoleAccess";

export interface Record {
  name: string;
  email: string;
  password: string;
  role: Role.ADMIN;
}
