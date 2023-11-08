import { Record } from "@/components/SuperuserView/SuperUserView.types";

export interface AccountRecord {
  accountName: string;
  clientName: string;
  operationLeader: string;
  teamConsultation: string[];
}

interface ContextProps {
  children: ReactNode;
}

export interface ProfilesContextValues {
  users: any[];
  addUser: (user: Record) => void;
  deleteUser: (userEmail: string) => void;
  updateUser: (user: Record) => void;
}

export interface AccountContextValues {
  accounts: any[];
  addAccount: (account: AccountRecord) => void;
  deleteAccount: (accountName: string) => void;
  updateAccount: (account: AccountRecord) => void;
}

export interface LogContextValues {
  logs: any[];
  addLog: (log: MovementLog) => void;
}

export interface MovementLog {
  user: {
    email: string;
    name: string;
  };
  oldAccount: string;
  newAccount: string;
  startDate: Date;
  endDate: Date;
}
