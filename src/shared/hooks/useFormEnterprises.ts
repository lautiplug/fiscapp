// useFormEnterprises.ts
import { useForm } from "react-hook-form"

export enum enterpriseStatus {
  waiting = "waiting",
  completed = "completed",
  uncompleted = "uncompleted",
}

export interface IFormInput {
  id: number
  cuit: number
  city: string
  name: string
  status: enterpriseStatus
}

export const useFormEnterprises = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>()

  return {
    register,
    handleSubmit,
    errors,
    reset,
  }
}
