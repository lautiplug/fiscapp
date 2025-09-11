// useFormEnterprises.ts
import { useForm, type UseFormProps } from "react-hook-form"

export enum enterpriseStatus {
  waiting = "waiting",
  completed = "completed",
  uncompleted = "uncompleted",
  expired = "expired"
}

export interface IFormInput {
  id: number
  cuit: number
  city: string
  name: string
  status: enterpriseStatus
  date: string
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


