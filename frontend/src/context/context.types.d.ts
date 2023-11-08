import { Record } from "@/components/SuperuserView/SuperUserView.types";

interface ContextProps {
  children: ReactNode;
}

export interface ProfilesContextValues {
  users: any[];
  addUser: (user: Record) => void;
  deleteUser: (userEmail: string) => void;
  updateUser: (user: Record) => void;
}
