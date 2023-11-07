import { useAuth } from "@/context/auth";
import { useMemo } from "react";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERUSER = "SUPERUSER",
}

export function useRoleAccessHook(requiredRole: Role) {}
