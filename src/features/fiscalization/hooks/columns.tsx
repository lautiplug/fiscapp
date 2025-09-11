// columns.ts
import { type ColumnDef } from "@tanstack/react-table"
import { type IFormInput } from "../../../shared/hooks/useFormEnterprises"
import { isInspectionOverdue } from "../../../shared/utils/overdueEnterprises";
import type { FC, SVGProps } from "react";
import AlertIcon from '../../../icons/svg/alert.svg?react';

type Icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>;
}

const alertIcon: Icons = { iconSVG: AlertIcon }

export const getColumns = (updateEnterpriseStatus: (id: number) => void, formatStatus: (status: string) => string): ColumnDef<IFormInput>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: info => {
      const AlertIcon = alertIcon.iconSVG
      const row = info.row.original;
      const name = info.getValue() as string;

      return (
        <div className="flex items-center gap-2 max-w-[220px]">
          {isInspectionOverdue(row) && (
            <div className="text-sm bg-yellow-200 p-1 w-fit flex items-center rounded-sm shrink-0">
              <AlertIcon width={20} height={20} />
            </div>
          )}
          <span
            className="truncate whitespace-nowrap overflow-hidden text-ellipsis"
            title={name}   
          >
            {name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "cuit",
    header: "CUIT",
    cell: ({ getValue }) => {
      const str = String(getValue()).padStart(11, "0")
      return `${str.slice(0, 2)}-${str.slice(2, 10)}-${str.slice(10)}`
    },
  },
  {
    accessorKey: "id",
    header: "Nº empresa",
    cell: ({ getValue }) => {
      const str = String(getValue()).padEnd(8, '');
      if (str.length === 7) {
        return `${str.slice(0, 2)}-${str.slice(2, 6)}-${str.slice(6)}`;
      } else if (str.length === 8) {
        return `${str.slice(0, 2)}-${str.slice(2, 7)}-${str.slice(7)}`;
      }
      return str;
    }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const formatted = formatStatus(row.original.status)
      const statusStyle:any = {
        waiting: "m-auto text-gray-600 bg-gray-100 font-md",
        completed: "m-auto text-green-500 bg-green-100 font-md",
        uncompleted: "m-auto text-red-500 bg-red-100 font-md",
      }

      return (
        <div className={`cursor-pointer p-1 rounded-sm text-center w-[200px] ${statusStyle[row.original.status]}`}
          onClick={() => updateEnterpriseStatus(row.original.id)}>
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string)
      return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: 'UTC'
      })
    },
  },
]
