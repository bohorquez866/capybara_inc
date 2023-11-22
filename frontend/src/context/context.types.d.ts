import {
  Record,
  UserData,
} from "@/components/SuperuserView/SuperUserView.types";

export interface AccountRecord {
  id: string;
  accountName: string;
  clientName: string;
  operationLeader: string;
  teamConsultation: UserData[];
}

interface ContextProps {
  children: ReactNode;
}

export interface ProfilesContextValues {
  users: any[];
  accounts: any[];
  addUser: (user: UserData) => void;
  deleteUser: (userId: string) => void;
  updateUser: (user: UserData) => void;
  addAccount: (account: AccountRecord) => void;
  deleteAccount: (accountName: string) => void;
  updateAccount: (account: AccountRecord) => void;
  setUsers: Function;
  setAccounts: Function;
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
  oldAccount: AccountRecord;
  newAccount: AccountRecord;
  startDate: Date;
  endDate: Date;
}
