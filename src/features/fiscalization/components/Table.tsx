import { useEnterprise } from "../../../shared/context/EnterpriseContext"
import { getColumns } from "../hooks/columns"
import { useState, type FC, type SVGProps } from "react"
import { isInspectionOverdue } from "../../../shared/utils/overdueEnterprises"
import AlertIcon from '../../../icons/svg/alert.svg?react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { AnimatePresence } from "framer-motion";


type Icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>;
}

const alertIcon: Icons = { iconSVG: AlertIcon }


export const TableInfo = () => {
  const AlertIcon = alertIcon.iconSVG
  const { enterprise, updateEnterpriseStatus, formatStatus } = useEnterprise()
  const [globalFilter, setGlobalFilter] = useState("")
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(9)

  const table = useReactTable({
    data: enterprise,
    columns: getColumns(updateEnterpriseStatus, formatStatus),
    state: {
      globalFilter,
      pagination: { pageSize, pageIndex }
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: updater => {
      const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
      setPageIndex(newState.pageIndex)
      setPageSize(newState.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const currentRows = table.getRowModel().rows;
  const currentOverdueCount = currentRows.filter(row => isInspectionOverdue(row.original)).length;

  return (
    <AnimatePresence mode="popLayout">
      <section className="border-0">
        <div className="flex justify-between items-center p-1">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Inspecciones</h1>
            {
              currentOverdueCount > 0 ?
                <div className="text-sm bg-yellow-100 p-1 rounded-md pr-2 pl-2 flex items-center gap-2 font-bold">
                  <AlertIcon width={'24px'} height={'24px'} /> Hay {currentOverdueCount} empresa{currentOverdueCount > 1 && `s`} que requiere{currentOverdueCount > 1 && `n`} seguimiento.
                </div>
                : null
            }
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border p-2 rounded-md focus:outline-none"
          />
        </div>

        <table className="mt-2 w-full border-collapse text-center overflow-hidden">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-2 text-center text-sm text-gray-500 font-normal bg-gray-100">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="pt-20">
              {table.getRowModel().rows.map(row => (
                <tr className="hover:bg-gray-50 transition-all duration-300" key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={`text-center cursor-pointer p-2 border-b`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </AnimatePresence>
  )
}
