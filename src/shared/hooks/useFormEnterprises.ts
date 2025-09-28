// useFormEnterprises.ts
import { useForm, type UseFormProps } from "react-hook-form"

export enum enterpriseStatus {
  waiting = "waiting",
  completed = "completed",
  uncompleted = "uncompleted",
  expired = "expired"
}

export interface IFormInput {
  id: string // Changed from number to string to preserve leading zeros
  cuit: number
  city: string
  name: string
  status: enterpriseStatus
  date: string
  phone?: string
  activity?: string
  observations?: string // For conditional warnings and notes
}

export const useFormEnterprises = (options?: UseFormProps<IFormInput>) => {
  const today = new Date().toISOString().split("T")[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<IFormInput>({
    defaultValues: {
      date: today,
    },
    ...options,
  })

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
    getValues,
  }
}


