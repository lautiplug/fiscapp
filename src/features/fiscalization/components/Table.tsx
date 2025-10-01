import { useEnterprise } from "../../../shared/context/EnterpriseContext"
import { getColumns } from "../hooks/columns"
import { useState, useMemo, type FC, type SVGProps } from "react"
import { sortWithOverdueFirst, getOverdueCount } from "../../../shared/utils/overdueEnterprises"
import AlertIcon from '../../../icons/svg/alert.svg?react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { AnimatePresence } from "framer-motion";
import { DialogAddInspection } from "../../../shared/components/ui/DialogAddInspection";
import { type IFormInput } from "../../../shared/hooks/useFormEnterprises";
import { Link, useNavigate } from "react-router-dom";

type Icons = {
  iconSVG: FC<SVGProps<SVGSVGElement>>;
}

const alertIcon: Icons = { iconSVG: AlertIcon }


export const TableInfo = () => {
  const AlertIcon = alertIcon.iconSVG
  const navigate = useNavigate()
  const { enterprise, updateEnterpriseStatus, formatStatus, deleteEnterprise } = useEnterprise()
  const [globalFilter, setGlobalFilter] = useState("")
  const [editingEnterprise, setEditingEnterprise] = useState<IFormInput | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditEnterprise = (enterpriseData: IFormInput) => {
    setEditingEnterprise(enterpriseData)
    setIsEditDialogOpen(true)
  }

  const handleDeleteEnterprise = (id: string) => {
    deleteEnterprise(id)
  }

  // Redirect to detailed page when status is clicked
  const handleStatusClick = () => {
    navigate('/inspecciones')
  }

  // Sort enterprises to show overdue ones first - memoize to prevent infinite loops
  const sortedEnterprises = useMemo(() => sortWithOverdueFirst(enterprise), [enterprise]);

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(
    () => getColumns(updateEnterpriseStatus, formatStatus, handleEditEnterprise, handleDeleteEnterprise, handleStatusClick),
    [updateEnterpriseStatus, formatStatus, handleEditEnterprise, handleDeleteEnterprise, handleStatusClick]
  );

  const table = useReactTable({
    data: sortedEnterprises,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 9,
      }
    }
  })
  const currentRows = table.getRowModel().rows;
  const currentOverdueCount = getOverdueCount(currentRows.map(row => row.original));


  return (
    <AnimatePresence mode="popLayout">
      <section className="border-0 h-full flex flex-col">
        {/* Alert Message - Separate row when present */}
        {currentOverdueCount > 0 && (
          <div className="mb-4 p-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <AlertIcon width={'20px'} height={'20px'} className="stroke-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  Atención requerida
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  {currentOverdueCount} empresa{currentOverdueCount > 1 && `s`} requiere{currentOverdueCount > 1 && `n`} seguimiento
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header with title and controls */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-800 ml-2">Inspecciones</h2>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar empresas..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-64 pl-4 pr-4 py-2.5 bg-white border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-sm"
              />
            </div>
            <button
              onClick={() => setIsEditDialogOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/30 transition-all duration-300"
            >
              + Nueva Inspección
            </button>
            <Link
              to="/inspecciones"
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all duration-300 group text-sm font-medium text-slate-700"
            >
              <span>Ver todas</span>
              <div className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <span className="text-xs group-hover:text-emerald-600">→</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Table container with better layout */}
        <div className="flex flex-col flex-1 min-h-0 bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Table - unified structure */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200"
                        style={{ width: header.getSize() }}
                        
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/50 transition-colors duration-200"
                    
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - fixed at bottom */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200/60 flex items-center justify-between bg-slate-50/50">
            <div className="text-sm text-slate-600">
              Mostrando <span className="font-semibold text-slate-800">{table.getRowModel().rows.length}</span> de <span className="font-semibold text-slate-800">{enterprise.length}</span> inspecciones
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 text-sm bg-white border border-slate-200/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-200 font-medium text-slate-700"
              >
                Anterior
              </button>
              <div className="px-4 py-2 text-sm font-medium text-slate-700 bg-white rounded-lg border border-slate-200/60">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </div>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 text-sm bg-white border border-slate-200/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-200 font-medium text-slate-700"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
        
        <DialogAddInspection 
          editData={editingEnterprise || undefined}
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open)
            if (!open) {
              setEditingEnterprise(null)
            }
          }}
          trigger={<div style={{ display: 'none' }} />}
        />
      </section>
    </AnimatePresence>
  )
}
