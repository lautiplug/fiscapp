import { createContext, useContext, useEffect, useState } from "react"
import { enterpriseStatus, type IFormInput } from "../hooks/useFormEnterprises"
import { isInspectionOverdue } from "../utils/overdueEnterprises"
import { enterpriseNotifications } from "../lib/notifications"

interface EnterpriseContextType {
  enterprise: IFormInput[]
  addEnterprise: (data: IFormInput) => void
  updateEnterprise: (id: string, data: IFormInput) => void
  deleteEnterprise: (id: string) => void
  updateEnterpriseStatus: (id: string) => void
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
      const bOverdueSorted = isInspectionOverdue(b)
      const aOverdueSorted = isInspectionOverdue(a)

      if(aOverdueSorted && !bOverdueSorted) return - 1
      if(!aOverdueSorted && bOverdueSorted) return 1

      return 0
    })

    setEnterprise(sorted)
    enterpriseNotifications.added(data.name)
  }

  const updateEnterpriseStatus = (id: string) => {
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


  const updateEnterprise = (originalId: string, data: IFormInput) => {
    console.log("🔍 updateEnterprise called with originalId:", originalId, "data:", data);
    console.log("🔍 Current enterprise array:", enterprise);
    
    const updated = enterprise.map(item => {
      if (item.id === originalId) {
        console.log("🔍 Found matching item:", item);
        // Use all new data, including the potentially new ID
        const newItem = { ...data };
        console.log("🔍 Creating new item:", newItem);
        return newItem;
      }
      return item;
    });
    
    console.log("🔍 Updated array:", updated);
    
    const sorted = updated.sort((a, b) => {
      const aOverdue = isInspectionOverdue(a);
      const bOverdue = isInspectionOverdue(b);
      
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      return 0;
    });
    
    console.log("🔍 Final sorted array:", sorted);
    setEnterprise(sorted)
    enterpriseNotifications.updated(data.name)
  }

  const deleteEnterprise = (id: string) => {
    const enterpriseToDelete = enterprise.find(item => item.id === id)
    const updated = enterprise.filter(item => item.id !== id)
    setEnterprise(updated)
    if (enterpriseToDelete) {
      enterpriseNotifications.deleted(enterpriseToDelete.name)
    }
  }

  const formatStatus = (status: string) => {
    switch (status) {
      case "waiting":
        return "Esperando información"
      case "completed":
        return "Completada"
      case "uncompleted":
        return "No se completó"
      default:
        return status
    }
  }

  return (
    <EnterpriseContext.Provider value={{ 
      enterprise, 
      addEnterprise, 
      updateEnterprise, 
      deleteEnterprise, 
      updateEnterpriseStatus, 
      formatStatus 
    }}>
      {children}
    </EnterpriseContext.Provider>
  )
}


export const useEnterprise = () => {
  const context = useContext(EnterpriseContext)
  if (!context) throw new Error("useEnterprise debe usarse dentro de EnterpriseProvider")
  return context
}

