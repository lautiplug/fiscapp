import { useState } from "react"
import { useEnterprise } from "../../../shared/context/EnterpriseContext"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table"
import { getDetailedColumns } from "../hooks/detailedColumns"
import { InspectionDetailsForm } from "./InspectionDetailsForm"

export const DetailedInspectionsTable = () => {
  const { enterprise, updateEnterpriseStatus, formatStatus, deleteEnterprise } = useEnterprise()
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [expanded, setExpanded] = useState({})

  // Filter data based on status
  const filteredData = enterprise.filter(item => {
    if (statusFilter === "all") return true
    return item.status === statusFilter
  })

  // Handler for forcing expansion when status changes to uncompleted
  const handleStatusChangeExpand = (row: any) => {
    if (!row.getIsExpanded()) {
      row.toggleExpanded()
    }
  }

  const table = useReactTable({
    data: filteredData,
    columns: getDetailedColumns(updateEnterpriseStatus, formatStatus, deleteEnterprise, handleStatusChangeExpand),
    state: {
      globalFilter,
      pagination: { pageSize, pageIndex },
      expanded
    },
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    onPaginationChange: updater => {
      const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
      setPageIndex(newState.pageIndex)
      setPageSize(newState.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  })

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="bg-white p-3 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          {/* Status Filters */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Estado:</span>
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                statusFilter === "all" ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter("waiting")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                statusFilter === "waiting" ? "bg-yellow-200 text-yellow-800" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              }`}
            >
              En Progreso
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                statusFilter === "completed" ? "bg-green-200 text-green-800" : "bg-green-100 text-green-600 hover:bg-green-200"
              }`}
            >
              Completado
            </button>
            <button
              onClick={() => setStatusFilter("uncompleted")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                statusFilter === "uncompleted" ? "bg-red-200 text-red-800" : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              Sin Completar
            </button>
          </div>

          {/* Search and Page Size */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={5}>5/página</option>
              <option value={10}>10/página</option>
              <option value={25}>25/página</option>
              <option value={50}>50/página</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden relative">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ width: header.getSize() }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <>
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && (
                    <tr key={`${row.id}-expanded`}>
                      <td colSpan={row.getVisibleCells().length} className="px-6 py-4 bg-gray-50">
                        <InspectionDetailsForm inspection={row.original} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* <div className="bg-white p-5 py-3 border-t border-gray-200 flex items-center justify-between fixed bottom-0 left-1 w-[100%]">
          <div className="ml-3 text-sm text-gray-700">
            Mostrando {table.getRowModel().rows.length} de {filteredData.length} resultados
          </div>
          <div className="mr-3 flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-700">
              Página {pageIndex + 1} de {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}