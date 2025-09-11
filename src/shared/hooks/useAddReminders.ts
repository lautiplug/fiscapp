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
  date?: string;
  completed?: boolean;  
}

export const useAddReminders = (options?: UseFormProps<Reminder>) => {
  const [reminder, setReminder] = useState<Reminder[]>(() => {
    const stored = localStorage.getItem("reminders");
    return stored ? JSON.parse(stored) : [];
  });

  // guardo timeouts por id para poder cancelarlos en Undo
  const timersRef = useRef<Record<number, number>>({});

  const persist = (list: Reminder[]) => {
    setReminder(list);
    localStorage.setItem("reminders", JSON.stringify(list));
  };

  const addReminder = (data: Reminder) => {
    const newReminder: Reminder = {
      ...data,
      id: Date.now(),
      completed: false, 
    };
    const updated = [...reminder, newReminder];
    persist(updated);
  };

  const updateReminder = (id: number, patch: Partial<Reminder>) => {
    persist(
      reminder.map(r => (r.id === id ? { ...r, ...patch } : r))
    );
  };

  const onDeleteReminder = (id: number) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    const updated = reminder.filter((item) => item.id !== id);
    persist(updated);
  };

  // ✅ marcar como completado y borrar en 5s (con Undo)
  const onCompleteReminder = (id: number, checked: boolean) => {
    // 1) seteo el completed
    const updated = reminder.map((r) =>
      r.id === id ? { ...r, completed: checked } : r
    );
    persist(updated);

    if (checked) {
      // prevengo duplicados
      if (timersRef.current[id]) clearTimeout(timersRef.current[id]);

      timersRef.current[id] = window.setTimeout(() => {
        setReminder((prev) => {
          const next = prev.filter((r) => r.id !== id);
          localStorage.setItem("reminders", JSON.stringify(next));
          
          return next;
        });
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
