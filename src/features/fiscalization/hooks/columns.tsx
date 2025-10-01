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
  updateEnterpriseStatus: (id: string) => void,
  formatStatus: (status: string) => string,
  onEditEnterprise?: (enterprise: IFormInput) => void,
  onDeleteEnterprise?: (id: string) => void,
  onStatusClick?: (enterprise: IFormInput) => void
): ColumnDef<IFormInput>[] => [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 200,
      cell: info => {
        const AlertIcon = alertIcon.iconSVG
        const row = info.row.original;
        const name = info.getValue() as string;

        return (
          <div className="flex items-center gap-2 text-left">
            {isInspectionOverdue(row) && (
              <div className="text-sm bg-yellow-200 p-1 w-fit flex items-center rounded-sm shrink-0">
                <AlertIcon width={16} height={16} />
              </div>
            )}
            <span
              className="truncate whitespace-nowrap overflow-hidden text-ellipsis font-medium max-w-[250px]"
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
      size: 150,
      cell: ({ getValue }) => {
        const str = String(getValue()).padStart(11, "0")
        return (
          <div className="flex justify-center">
          <span className="font-mono text-sm text-center">
            {`${str.slice(0, 2)}-${str.slice(2, 10)}-${str.slice(10)}`}
          </span>
          </div>
        )
      },
    },
    {
      accessorKey: "id",
      header: "Nº empresa",
      size: 120,
      cell: ({ getValue }) => {
        const str = String(getValue()).padEnd(8, '');
        let formatted = str;
        if (str.length === 7) {
          formatted = `${str.slice(0, 2)}-${str.slice(2, 6)}-${str.slice(6)}`;
        } else if (str.length === 8) {
          formatted = `${str.slice(0, 2)}-${str.slice(2, 7)}-${str.slice(7)}`;
        }
        return (
          <div className="flex justify-center">
            <span className="font-mono text-sm font-medium">
              {formatted}
            </span>
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Estado",
      size: 180,
      cell: ({ row }) => {
        const formatted = formatStatus(row.original.status)
        const statusStyle: any = {
          waiting: "bg-yellow-100 text-yellow-800 border border-yellow-200",
          completed: "bg-green-100 text-green-800 border border-green-200",
          uncompleted: "bg-red-100 text-red-800 border border-red-200",
        }

        return (
          <div className="flex justify-center">
            <div
              className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80 ${statusStyle[row.original.status]} min-w-[140px] text-center`}
              onClick={() => updateEnterpriseStatus(row.original.id)}
              title="Click para gestionar estado en detalle"
            >
              {formatted}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Fecha",
      size: 120,
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string)
        return (
          <div className="flex justify-center">
            <span className="text-sm font-medium text-center">
              {date.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: 'UTC'
              })}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const enterprise = row.original;

        return (
          <Popover>
            <div className="flex justify-center">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 text-xl font-bold bg-transparent hover:bg-transparent border-0 shadow-none cursor-pointer"
                  title="Acciones"
                >
                  ⋮
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent align="end" className="w-56 bg-white p-0 rounded-md mt-2 shadow-md z-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0  data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2">
              <PopoverArrow width={15} height={8} className="fill-white stroke-white" />
              <div className="flex flex-col">
                <div className="text-center px-3 py-2">
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
