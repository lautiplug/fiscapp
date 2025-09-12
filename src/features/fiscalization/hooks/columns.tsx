// columns.ts
import { type ColumnDef } from "@tanstack/react-table"
import { type IFormInput } from "../../../shared/hooks/useFormEnterprises"
import { isInspectionOverdue } from "../../../shared/utils/overdueEnterprises";
import type { FC, SVGProps } from "react";
import AlertIcon from '../../../icons/svg/alert.svg?react';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../../../components/ui/button";

type Icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>;
}

const alertIcon: Icons = { iconSVG: AlertIcon }

export const getColumns = (
  updateEnterpriseStatus: (id: number) => void, 
  formatStatus: (status: string) => string,
  onEditEnterprise?: (enterprise: IFormInput) => void,
  onDeleteEnterprise?: (id: number) => void
): ColumnDef<IFormInput>[] => [
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
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const enterprise = row.original;
      
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 text-xl font-bold bg-transparent hover:bg-transparent border-0 shadow-none cursor-pointer"
              title="Acciones"
            >
              ⋮
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 bg-white p-0 rounded-md mt-2 shadow-md z-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0  data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2">
            <PopoverArrow width={15} height={8} className="fill-white stroke-white" />
            <div className="flex flex-col">
              <div className="px-3 py-2">
                <h4 className="text-sm font-medium">Acciones</h4>
              </div>

              <div className="border-t" />

              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onEditEnterprise?.(enterprise)}
              >
                Editar
              </button>

              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={() => onDeleteEnterprise?.(enterprise.id)}
              >
                Eliminar
              </button>
            </div>
          </PopoverContent>
        </Popover>
      )
    },
  },
]
