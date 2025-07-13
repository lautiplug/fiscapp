import { useState } from "react"
import { useForm, type UseFormProps } from "react-hook-form"

export enum reminderPriority {
  low = "Baja",
  medium = "Media",
  high = "Alta",
}

export interface Reminder {
  id: number
  title: string
  priority: reminderPriority
  date?: string
}

export const useAddReminders = (options?: UseFormProps<Reminder>) => {

  const [reminder, setReminder] = useState<Reminder[]>(() => {
    const stored = localStorage.getItem("reminders")
    return stored ? JSON.parse(stored) : []
  })

  // si isInspectionOverdue, se coloca por encima de todas las otras que no.
  const addReminder = (data: Reminder) => {
    const updated = [...reminder, data]
    setReminder(updated)
    localStorage.setItem("reminders", JSON.stringify(updated))
  }

  console.log(reminder)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<Reminder>({ ...options })

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
    getValues,
    addReminder,
    reminder
  }
}