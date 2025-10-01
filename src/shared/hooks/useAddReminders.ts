import { useRef, useState } from "react";
import { useForm, type UseFormProps } from "react-hook-form";

export enum reminderPriority {
  low = "Baja",
  medium = "Media",
  high = "Alta",
}

export interface Reminder {
  id: number;
  title: string;
  priority: reminderPriority;
  date: string;
  completed?: boolean;  
}

export const useAddReminders = (options?: UseFormProps<Reminder>) => {
  const [reminder, setReminder] = useState<Reminder[]>(() => {
    const stored = localStorage.getItem("reminders");
    return stored ? JSON.parse(stored) : [];
  });

  const timersRef = useRef<Record<number, number>>({});

  const persist = (updater: Reminder[] | ((prev: Reminder[]) => Reminder[])) => {
    setReminder(prev => {
      const next = typeof updater === "function" ? (updater as (prev: Reminder[]) => Reminder[])(prev) : updater;
      localStorage.setItem("reminders", JSON.stringify(next));
      return next;
    });
  };

  const addReminder = (data: Reminder) => {
    const newReminder: Reminder = {
      ...data,
      id: Date.now(),
      completed: false,
    };
    persist(prev => [...prev, newReminder]);
  };

  const updateReminder = (id: number, patch: Partial<Reminder>) => {
    persist(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));
  };

  const onDeleteReminder = (id: number) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    persist(prev => prev.filter(r => r.id !== id));
  };

  const onCompleteReminder = (id: number, checked: boolean) => {
    persist(prev => prev.map(r => (r.id === id ? { ...r, completed: checked } : r)));

    if (checked) {
      if (timersRef.current[id]) clearTimeout(timersRef.current[id]);
      timersRef.current[id] = window.setTimeout(() => {
        persist(prev => prev.filter(r => r.id !== id));
        delete timersRef.current[id];
      }, 5000);
    } else {
      if (timersRef.current[id]) {
        clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
      }
    }
  };

  const onUndoReminder = (id: number) => onCompleteReminder(id, false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<Reminder>({ ...options });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
    getValues,
    addReminder,
    updateReminder,
    reminder,
    onDeleteReminder,     
    onCompleteReminder,   
    onUndoReminder,       
  };
};
