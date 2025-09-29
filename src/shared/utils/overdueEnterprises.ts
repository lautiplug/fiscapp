import { type IFormInput, enterpriseStatus } from "../hooks/useFormEnterprises"

export const isInspectionOverdue = (item: IFormInput): boolean => {
  if (item.status !== enterpriseStatus.waiting) return false;

  const [year, month, day] = item.date.split("-");
  const inspectionDate = new Date(Number(year), Number(month) - 1, Number(day));
  const diffInDays = (Date.now() - inspectionDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffInDays > 7;
};

// Get all overdue enterprises from an array
export const getOverdueEnterprises = (enterprises: IFormInput[]): IFormInput[] =>
  enterprises.filter(isInspectionOverdue);

// Get count of overdue enterprises
export const getOverdueCount = (enterprises: IFormInput[]): number =>
  enterprises.filter(isInspectionOverdue).length;

// Sort enterprises with overdue ones appearing first
export const sortWithOverdueFirst = (enterprises: IFormInput[]): IFormInput[] =>
  [...enterprises].sort((a, b) => {
    const aOverdue = isInspectionOverdue(a);
    const bOverdue = isInspectionOverdue(b);

    // If both are overdue or both are not overdue, maintain original order
    if (aOverdue === bOverdue) return 0;

    // Overdue enterprises come first
    return aOverdue ? -1 : 1;
  });

// Get only non-overdue enterprises
export const getNonOverdueEnterprises = (enterprises: IFormInput[]): IFormInput[] =>
  enterprises.filter(enterprise => !isInspectionOverdue(enterprise));

// Check if there are any overdue enterprises in the array
export const hasOverdueEnterprises = (enterprises: IFormInput[]): boolean =>
  enterprises.some(isInspectionOverdue);
