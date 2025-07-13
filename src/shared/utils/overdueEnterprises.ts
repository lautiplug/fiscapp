import { type IFormInput, enterpriseStatus } from "../hooks/useFormEnterprises"

export const isInspectionOverdue = (item: IFormInput): boolean => {
  if (item.status !== enterpriseStatus.waiting) return false;

  const [year, month, day] = item.date.split("-");
  const inspectionDate = new Date(Number(year), Number(month) - 1, Number(day));
  const diffInDays = (Date.now() - inspectionDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffInDays > 7;
};
