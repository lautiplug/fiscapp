
import { useEnterprise } from "../../../shared/context/EnterpriseContext";
import { enterpriseStatus } from "../../../shared/hooks/useFormEnterprises";
import { useGetMonthlyStats } from "./useGetMonthlyStats";

interface enterpriseSkeletonHeader {
  title: string,
  inspectionsCount: number,
  lastDate: string
  averagePercentage: number
  inspectionStatus: string
}

export const useGetEnterprisesHeader = () => {


  const { enterprise } = useEnterprise()
  const {
    currentMonthStats,
    getPercentageChange,
    previousMonthStats,
  } = useGetMonthlyStats()

  const inspectionResume: enterpriseSkeletonHeader[] = [
    {
      title: 'Esperando información',
      inspectionsCount: enterprise?.filter((i: any) => i.status === 'waiting').length,
      lastDate: 'Último mes',
      averagePercentage: getPercentageChange(
        currentMonthStats[enterpriseStatus.waiting],
        previousMonthStats[enterpriseStatus.waiting]
      ),
      inspectionStatus: 'Esperando información'
    },
    {
      title: 'Completadas',
      inspectionsCount: enterprise?.filter((i: any) => i.status === 'completed').length,
      lastDate: 'Último mes',
      averagePercentage: getPercentageChange(
        currentMonthStats[enterpriseStatus.completed],
        previousMonthStats[enterpriseStatus.completed]
      ),
      inspectionStatus: 'Completada'
    },
    {
      title: 'No completadas',
      inspectionsCount: enterprise?.filter((i: any) => i.status === 'uncompleted').length,
      lastDate: 'Último mes',
      averagePercentage: getPercentageChange(
        currentMonthStats[enterpriseStatus.uncompleted],
        previousMonthStats[enterpriseStatus.uncompleted]
      ),
      inspectionStatus: 'No completada'
    }
  ];

  return {
    inspectionResume
  }
}