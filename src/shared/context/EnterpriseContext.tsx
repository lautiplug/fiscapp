import { createContext, useContext, useEffect, useState } from "react"
import { enterpriseStatus, type IFormInput } from "../hooks/useFormEnterprises"
import { isInspectionOverdue } from "../utils/overdueEnterprises"

interface EnterpriseContextType {
  enterprise: IFormInput[]
  addEnterprise: (data: IFormInput) => void
  updateEnterpriseStatus: (id: number) => void
  formatStatus: (status: string) => string
}

const EnterpriseContext = createContext<EnterpriseContextType | undefined>(undefined)

export const EnterpriseProvider = ({ children }: { children: React.ReactNode }) => {

  const [enterprise, setEnterprise] = useState<IFormInput[]>(() => {
    const stored = localStorage.getItem("fiscal-app:empresas")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
  localStorage.setItem("fiscal-app:empresas", JSON.stringify(enterprise))
}, [enterprise])


  // si isInspectionOverdue, se coloca por encima de todas las otras que no.
  const addEnterprise = (data: IFormInput) => {
    const updated = [data, ...enterprise]

    const sorted = updated.sort((a, b) => {
      const aOverdueSorted = isInspectionOverdue(a)
      const bOverdueSorted = isInspectionOverdue(b)

      if(aOverdueSorted && !bOverdueSorted) return - 1
      if(!aOverdueSorted && bOverdueSorted) return 1

      return 0
    })

    setEnterprise(sorted)
  }

  const updateEnterpriseStatus = (id: number) => {
    const updated = enterprise.map((item) => {
      if (item.id !== id) return item;
  
      let nextStatus: IFormInput["status"];
      switch (item.status) {
        case enterpriseStatus.waiting:
          nextStatus = enterpriseStatus.completed;
          break;
        case enterpriseStatus.completed:
          nextStatus = enterpriseStatus.uncompleted;
          break;
        case enterpriseStatus.uncompleted:
        default:
          nextStatus = enterpriseStatus.waiting;
          break;
      }
  
      return { ...item, status: nextStatus };
    });
  
    const sorted = updated.sort((a, b) => {
      const aOverdue = isInspectionOverdue(a);
      const bOverdue = isInspectionOverdue(b);
  
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      return 0;
    });
    console.log(sorted)
  
    setEnterprise(sorted);
  };


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

