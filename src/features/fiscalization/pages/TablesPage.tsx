import { useState } from "react"
import { PageLayout } from "../../../shared/layout/PageLayout"
import { useEnterprise } from "../../../shared/context/EnterpriseContext"
import { ExportService } from "../../../shared/services/exportService"

export const TablesPage = () => {
  const [activeSheet, setActiveSheet] = useState("sheet1")
  const { enterprise, formatStatus } = useEnterprise()

  const sheets = [
    { id: "sheet1", label: "Todas las Empresas", description: "Nombre, CUIT, N° Empresa, Recibido, Enviado, Observaciones" },
    { id: "sheet2", label: "Reporte Semanal", description: "Empresas por miembro del equipo" },
    { id: "sheet3", label: "No Completadas", description: "Empresas pendientes de finalizar" },
    { id: "sheet4", label: "Cuenta Corriente", description: "Nombre, CUIT, N° Empresa, Correo, Tel, Actividad" }
  ]


  const renderSheetContent = () => {
    switch (activeSheet) {
      case "sheet1":
        return (
          <div className="h-full">
            <div className="bg-white rounded-xl h-full flex flex-col">
              <div className="p-3 border-b border-slate-200/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">Todas las Empresas (mostrando todas las seccionales)</h2> 
                  {/* #TODO MOSTRAR SECCIONALES BY FILTER*/}
                  <button
                    onClick={() => ExportService.exportSheet1(enterprise)}
                    className="px-3 py-2 bg-blue-100 text-emerald-700 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium"
                  >
                    Convertir a Excel
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-1">Seguimiento completo de todas las inspecciones</p>
              </div>
              <div className="p-3 flex-1 min-h-0">
                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Nombre Empresa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">CUIT</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">N° Empresa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Recibido</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Enviado</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enterprise.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-slate-500">
                            <div className="text-slate-400 text-4xl mb-4">📊</div>
                            <p>No hay empresas agregadas</p>
                            <p className="text-sm mt-1">Agrega empresas desde la página principal</p>
                          </td>
                        </tr>
                      ) : (
                        enterprise.map((empresa) => (
                          <tr key={empresa.id} className="hover:bg-slate-50">
                            <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700 truncate whitespace-nowrap overflow-hidden text-ellipsis font-medium max-w-[100px]">
                              {empresa.name}
                            </td>
                            <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                              {empresa.cuit}
                            </td>
                            <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                              {empresa.id}
                            </td>
                            <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                              {empresa.date}
                            </td>
                            <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                              {/* Fecha enviado - por ahora vacío */}
                              -
                            </td>
                            <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                              {/* Observaciones - por ahora mostrar estado */}
                              {formatStatus(empresa.status)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case "sheet2":
        return (
          <div className="h-full">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm h-full flex flex-col">
              <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">Reporte Semanal</h2>
                  <button
                    onClick={() => ExportService.exportSheet2()}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                  >
                    Convertir a Excel
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-1">Empresas organizadas por miembro del equipo</p>
              </div>
              <div className="p-6 flex-1 min-h-0">
                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Mariano A. García</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Sebastian Mansilla</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Ludmila Seisdedos</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Solange Maidana</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Lautaro Pintos</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Juan Cruz Galvaliz</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Lautaro Lopez</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Melina Soto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-500">
                          <div className="text-slate-400 text-4xl mb-4">👥</div>
                          <p>Reporte semanal por equipos</p>
                          <p className="text-sm mt-1">Las empresas se organizarán por columnas de cada miembro</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case "sheet3":
        return (
          <div className="h-full">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm h-full flex flex-col">
              <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">Devolución Inspecciones</h2>
                  <button
                    onClick={() => ExportService.exportSheet3(enterprise)}
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium"
                  >
                    Convertir a Excel
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-1">Empresas que requieren seguimiento (filtro automático)</p>
              </div>
              <div className="p-6 flex-1 min-h-0">
                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Nombre Empresa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">CUIT</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">N° Empresa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Recibido</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const pendingEnterprises = enterprise.filter(empresa => empresa.status === 'uncompleted')
                        return pendingEnterprises.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-12 text-slate-500">
                              <div className="text-slate-400 text-4xl mb-4">✅</div>
                              <p>¡Excelente! No hay empresas pendientes</p>
                              <p className="text-sm mt-1">Todas las empresas han sido completadas</p>
                            </td>
                          </tr>
                        ) : (
                          pendingEnterprises.map((empresa) => (
                            <tr key={empresa.id} className="hover:bg-slate-50">
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.name}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.cuit}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.id}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.date}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${empresa.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                                  empresa.status === 'uncompleted' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                  {formatStatus(empresa.status)}
                                </span>
                              </td>
                            </tr>
                          ))
                        )
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      case "sheet4":
        return (
          <div className="h-full">
            <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm h-full flex flex-col">
              <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">Datos Cuenta Corriente</h2>
                  <button
                    onClick={() => ExportService.exportSheet4(enterprise)}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                  >
                    Convertir a Excel
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-1">Empresas finalizadas con información de contacto completa</p>
              </div>
              <div className="p-6 flex-1 min-h-0">
                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Nombre Empresa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">CUIT</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">N° Empresa</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Correo</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Teléfono</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Actividad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const completedEnterprises = enterprise.filter(empresa => empresa.status === 'completed')
                        return completedEnterprises.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-12 text-slate-500">
                              <div className="text-slate-400 text-4xl mb-4">📝</div>
                              <p>No hay empresas completadas aún</p>
                              <p className="text-sm mt-1">Las empresas finalizadas aparecerán aquí con sus datos de contacto</p>
                            </td>
                          </tr>
                        ) : (
                          completedEnterprises.map((empresa) => (
                            <tr key={empresa.id} className="hover:bg-slate-50">
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.name}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.cuit}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.id}
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {/* {empresa.} */}
                                -
                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {empresa.phone}

                              </td>
                              <td className="border border-slate-300 px-4 py-2 text-sm text-slate-700">
                                {/* Por ahora no tenemos actividad en el modelo */}
                                {empresa.activity}
                              </td>
                            </tr>
                          ))
                        )
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h1 className="ml-2 font-bold text-xl">Compartido</h1>
          <div className="flex gap-3">
            <button
              onClick={() => ExportService.exportNoSeLocalizo(enterprise)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              title="Exporta con filas rojas para 'No se localizó'"
            >
              Excel con Colores
            </button>
            <button
              onClick={() => ExportService.exportAll(enterprise)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Convertir todo a Excel
            </button>
          </div>
        </div>

        {/* Sheet Tab Navigation - Google Sheets Style */}
        <div className="bg-white overflow-hidden w-full flex-1 min-h-0 rounded-xl border border-slate-200/50 shadow-sm">
          <div className="border-b border-slate-200/50 flex justify-between">
            <nav className="flex space-x-0 px-4 py-0 ">
              {sheets.map((sheet) => (
                <button
                  key={sheet.id}
                  onClick={() => setActiveSheet(sheet.id)}
                  className={`cursor-pointer flex items-center py-2 px-2 text-xs font-bold transition-colors border-b-2 ${activeSheet === sheet.id
                    ? 'border-emerald-600 text-emerald-600 bg-blue-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                >
                  {sheet.label}
                </button>
              ))}
            </nav>
            <div className="grid grid-cols-1 gap-4 px-4 py-2">
              <select className="text-sm cursor-pointer w-full px-3 h-7 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">Todas las zonas</option>
                <option value="avellaneda">Avellaneda</option>
                <option value="quilmes">Quilmes</option>
                <option value="laplata">La Plata</option>
              </select>
            </div>

          </div>

          {/* Sheet Content */}
          <div className="p-2">
            {renderSheetContent()}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}