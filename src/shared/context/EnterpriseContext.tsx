import { createContext, useContext, useState } from "react"
import { enterpriseStatus, type IFormInput } from "../hooks/useFormEnterprises"

interface EnterpriseContextType {
  enterprise: IFormInput[]
  addEnterprise: (data: IFormInput) => void
  updateEnterpriseStatus: (id: number) => void
  formatStatus: (status: string) => string
}

const EnterpriseContext = createContext<EnterpriseContextType | undefined>(undefined)

export const EnterpriseProvider = ({ children }: { children: React.ReactNode }) => {
  const [enterprise, setEnterprise] = useState<IFormInput[]>([])

  const addEnterprise = (data: IFormInput) => {
    setEnterprise(prev => [...prev, data])
  }

  const updateEnterpriseStatus = (id: number) => {
    setEnterprise(prev =>
      prev.map((item) => {
        if (item.id !== id) return item

        let nextStatus: IFormInput["status"]
        switch (item.status) {
          case "waiting":
            nextStatus = enterpriseStatus.completed
            break
          case "completed":
            nextStatus = enterpriseStatus.uncompleted
            break
          case "uncompleted":
          default:
            nextStatus = enterpriseStatus.waiting
            break
        }

        return { ...item, status: nextStatus }
      })
    )
  }


  const formatStatus = (status: string) => {
    switch (status) {
      case "waiting":
        return "Esperando información"
      case "completed":
        return "Completada"
      case "uncompleted":
        return "No se localizó"
      default:
        return status
    }
  }

  return (
    <EnterpriseContext.Provider value={{ enterprise, addEnterprise, updateEnterpriseStatus, formatStatus }}>
      {children}
    </EnterpriseContext.Provider>
  )
}

export const useEnterprise = () => {
  const context = useContext(EnterpriseContext)
  if (!context) throw new Error("useEnterprise debe usarse dentro de EnterpriseProvider")
  return context
}
