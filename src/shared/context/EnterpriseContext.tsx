import { createContext, useContext, useState } from "react"
import type { IFormInput } from "../hooks/useFormEnterprises"

interface EnterpriseContextType {
  enterprise: IFormInput[]
  addEnterprise: (data: IFormInput) => void
}

const EnterpriseContext = createContext<EnterpriseContextType | undefined>(undefined)

export const EnterpriseProvider = ({ children }: { children: React.ReactNode }) => {
  const [enterprise, setEnterprise] = useState<IFormInput[]>([])

  const addEnterprise = (data: IFormInput) => {
    setEnterprise(prev => [...prev, data])
  }

  return (
    <EnterpriseContext.Provider value={{ enterprise, addEnterprise }}>
      {children}
    </EnterpriseContext.Provider>
  )
}

export const useEnterprise = () => {
  const context = useContext(EnterpriseContext)
  if (!context) throw new Error("useEnterprise debe usarse dentro de EnterpriseProvider")
  return context
}
