import { useEnterprise } from "../../../shared/context/EnterpriseContext"
import { enterpriseStatus, type IFormInput } from "../../../shared/hooks/useFormEnterprises"

type MonthlyStats = {
  [key in enterpriseStatus]: number
}

export const useGetMonthlyStats = () => {

  const {enterprise} = useEnterprise()

  const getMonthlyStats = (data: IFormInput[], monthOffset: number): MonthlyStats => {
    const now = new Date()
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1)

    return data.reduce((acc, item) => {
      const itemDate = new Date(item.date)
      const sameMonth =
        itemDate.getMonth() === targetMonth.getMonth() &&
        itemDate.getFullYear() === targetMonth.getFullYear()

      if (sameMonth) {
        acc[item.status] = (acc[item.status] || 0) + 1
      }

      return acc
    }, {
      [enterpriseStatus.waiting]: 0,
      [enterpriseStatus.completed]: 0,
      [enterpriseStatus.uncompleted]: 0,
    } as MonthlyStats)
  }

  const currentMonthStats = getMonthlyStats(enterprise, 0)
  const previousMonthStats = getMonthlyStats(enterprise, 1)

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  return {
    currentMonthStats,
    previousMonthStats,
    getPercentageChange
  }

}

