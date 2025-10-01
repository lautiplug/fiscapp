// ReminderContext.tsx
import { createContext, useContext, useMemo } from "react";
import { useAddReminders } from "../hooks/useAddReminders";

const ReminderContext = createContext<ReturnType<typeof useAddReminders> | null>(null);

export const ReminderProvider = ({ children }: { children: React.ReactNode }) => {
  const hookValue = useAddReminders();
  const value = useMemo(() => hookValue, [hookValue.reminder]);
  return <ReminderContext.Provider value={value}> {children} </ReminderContext.Provider>;
};

export const useRemindersContext = () => {
  const context = useContext(ReminderContext);
  if (!context) throw new Error("ReminderContext not found");
  return context;
};
