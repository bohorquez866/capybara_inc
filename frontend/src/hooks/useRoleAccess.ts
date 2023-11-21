import { useAuth } from "@/context/auth";
import { useMemo } from "react";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPERUSER = "superuser",
}

export function useHasPermissionHook(requiredRole: Role) {
  const { user } = useAuth();

  const hasPermission = useMemo(() => {
    if (!user) {
      return false;
    }

    return (
      user.role.includes(requiredRole) || user.role.includes(Role.SUPERUSER)
    );
  }, [user, requiredRole]);

  return hasPermission;
}
