// ReminderContext.tsx
import { createContext, useContext } from "react";
import { useAddReminders } from "../hooks/useAddReminders";

const ReminderContext = createContext<ReturnType<typeof useAddReminders> | null>(null);

export const ReminderProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useAddReminders();
  return <ReminderContext.Provider value={value}>{children}</ReminderContext.Provider>;
};

export const useRemindersContext = () => {
  const context = useContext(ReminderContext);
  if (!context) throw new Error("ReminderContext not found");
  return context;
};
