import { type ColumnDef } from "@tanstack/react-table"
import { type IFormInput } from "../../../shared/hooks/useFormEnterprises"
import { isInspectionOverdue } from "../../../shared/utils/overdueEnterprises"
import type { FC, SVGProps } from "react"
import AlertIcon from '../../../icons/svg/alert.svg?react'

type Icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>
}

const alertIcon: Icons = { iconSVG: AlertIcon }

export const getDetailedColumns = (
  updateEnterpriseStatus: (id: string) => void,
  formatStatus: (status: string) => string,
  onDeleteEnterprise?: (id: string) => void,
  onStatusChangeExpand?: (row: any) => void
): ColumnDef<IFormInput>[] => [
  {
    accessorKey: "name",
    header: "Empresa",
    size: 250,
    cell: info => {
      const AlertIconComponent = alertIcon.iconSVG
      const row = info.row.original
      const name = info.getValue() as string

      return (
        <div className="flex items-center gap-3 max-w-[300px]">
          {isInspectionOverdue(row) && (
            <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-md flex-shrink-0">
              <AlertIconComponent width={16} height={16} className="text-yellow-600" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]" title={name}>
              {name}
            </div>
            <div className="text-sm text-gray-500">ID: {row.id}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "cuit",
    header: "CUIT",
    size: 150,
    cell: ({ getValue }) => {
      const str = String(getValue()).padStart(11, "0")
      return (
        <div className="font-mono text-sm">
          {`${str.slice(0, 2)}-${str.slice(2, 10)}-${str.slice(10)}`}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    size: 150,
    cell: ({ row }) => {
      const formatted = formatStatus(row.original.status)
      const statusConfig: any = {
        waiting: {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          dot: "bg-yellow-400"
        },
        completed: {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-400"
        },
        uncompleted: {
          bg: "bg-red-100",
          text: "text-red-800",
          dot: "bg-red-400"
        },
      }

      const config = statusConfig[row.original.status] || statusConfig.waiting

      const handleStatusClick = () => {
        // Get the current status to predict next status
        const currentStatus = row.original.status
        let nextStatus: string

        switch (currentStatus) {
          case 'waiting':
            nextStatus = 'completed'
            break
          case 'completed':
            nextStatus = 'uncompleted'
            break
          case 'uncompleted':
          default:
            nextStatus = 'waiting'
            break
        }

        // Update the status first
        updateEnterpriseStatus(row.original.id)

        // If changing TO uncompleted, force expansion to add observations
        if (nextStatus === 'uncompleted') {
          setTimeout(() => {
            if (onStatusChangeExpand) {
              onStatusChangeExpand(row)
            }
          }, 100) // Small delay to let status update
        }
      }

      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer border ${config.bg} ${config.text} min-w-[120px] justify-center hover:opacity-80 transition-opacity`}
          onClick={handleStatusClick}
          title="Click para cambiar estado. Si cambias a 'No se localizó', se abrirán los detalles para agregar observaciones."
        >
          <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Fecha de Inspección",
    size: 180,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string)
      return (
        <div>
          <div className="text-sm font-medium">
            {date.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: 'UTC'
            })}
          </div>
          <div className="text-xs text-gray-500">
            {date.toLocaleDateString("es-AR", {
              weekday: 'long',
              timeZone: 'UTC'
            })}
          </div>
        </div>
      )
    },
  },
  {
    id: "overdue",
    header: "Estado de Vencimiento",
    size: 180,
    cell: ({ row }) => {
      const isOverdue = isInspectionOverdue(row.original)
/*       const daysSinceInspection = Math.floor(
        (new Date().getTime() - new Date(row.original.date).getTime()) / (1000 * 60 * 60 * 24)
      ) */

      if (isOverdue) {
        return (
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-red-100 text-red-700 border border-red-200 min-w-[120px] justify-center">
              <span>⚠️</span>
              Vencida
            </span>
          </div>
        )
      }

      return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 min-w-[120px] justify-center">
          <span>✓</span>
          Al día
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    size: 200,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => row.toggleExpanded()}
            className="px-3 py-1.5 text-sm font-medium bg-green-100 text-green-800 rounded-lg border border-green-200 hover:bg-green-200 transition-colors"
          >
            {row.getIsExpanded() ? "Ocultar" : "Ver"} Detalles
          </button>
          <button
            onClick={() => onDeleteEnterprise?.(row.original.id)}
            className="px-3 py-1.5 text-sm font-medium bg-red-100 text-red-800 rounded-lg border border-red-200 hover:bg-red-200 transition-colors"
          >
            Eliminar
          </button>
        </div>
      )
    },
  },
]