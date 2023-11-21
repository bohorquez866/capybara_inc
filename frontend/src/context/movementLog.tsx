import { createContext, useContext, useState } from "react";
import { LogContextValues, MovementLog } from "./context.types";
import { accountUsers } from "@/components/SuperuserView/data";

const LogContext = createContext<LogContextValues | null>(null);

export const LogProvider = ({ children }: { children: JSX.Element }) => {
  const [logs, setLog] = useState<MovementLog[]>([]);

  const addLog = ({
    user,
    newAccount,
    oldAccount,
    startDate,
    endDate,
  }: MovementLog) => {
    const currentAccount = accountUsers.find(
      (u) => u.email === user.email
    )?.team;

    if (!oldAccount && currentAccount) {
      oldAccount = currentAccount;
    }

    const logEntry = {
      user,
      newAccount,
      oldAccount,
      startDate,
      endDate,
    };

    // Add the log entry to the log state
    setLog((prevLog) => [...prevLog, logEntry]);
  };

  const value = {
    logs,
    addLog,
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
};

export function useLog() {
  const context = useContext(LogContext);

  if (!context) {
    throw new Error(
      "AuthContext must be used within an AuthProvider component"
    );
  }

  return context;
}
