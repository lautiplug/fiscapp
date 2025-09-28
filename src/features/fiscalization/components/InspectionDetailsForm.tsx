import { useState, useEffect } from "react"
import { type IFormInput } from "../../../shared/hooks/useFormEnterprises"
import { useEnterprise } from "../../../shared/context/EnterpriseContext"

interface InspectionDetailsFormProps {
  inspection: IFormInput
}

export const InspectionDetailsForm = ({ inspection }: InspectionDetailsFormProps) => {
  const { updateEnterprise } = useEnterprise()
  const [observations, setObservations] = useState(inspection.observations || "")
  const [nextInspectionDate, setNextInspectionDate] = useState("")
  const [inspectorNotes, setInspectorNotes] = useState("")
  const [complianceLevel, setComplianceLevel] = useState("medium")

  // Load existing data when inspection changes
  useEffect(() => {
    setObservations(inspection.observations || "")
  }, [inspection.id, inspection.observations])

  const handleSave = () => {
    // Update the enterprise with the new observations
    const updatedInspection: IFormInput = {
      ...inspection,
      observations: observations.trim()
    }

    updateEnterprise(inspection.id, updatedInspection)

    console.log("Saved inspection details:", {
      inspectionId: inspection.id,
      observations,
      nextInspectionDate,
      inspectorNotes,
      complianceLevel
    })

    // Show success feedback
    alert("Observaciones guardadas correctamente!")
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Quick Stats - Compact */}
      <div className="mb-4 p-3 bg-slate-50/50 rounded-lg border border-slate-200/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-slate-600">📊 Datos rápidos:</span>
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-800">
                {Math.floor((new Date().getTime() - new Date(inspection.date).getTime()) / (1000 * 60 * 60 * 24))}
              </span>
              <span className="text-slate-500">días transcurridos</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{inspection.status === 'completed' ? '✅' : inspection.status === 'waiting' ? '⏳' : '❌'}</span>
              <span className="text-slate-500">
                {inspection.status === 'completed' ? 'Completado' :
                  inspection.status === 'waiting' ? 'En progreso' : 'Incompleto'}
              </span>
            </div>
            {nextInspectionDate && (
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-800">
                  {Math.floor((new Date(nextInspectionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </span>
                <span className="text-slate-500">días hasta próxima</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Inspection Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Inspección</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Empresa:</span>
                <p className="text-gray-900">{inspection.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">CUIT:</span>
                <p className="text-gray-900 font-mono">
                  {String(inspection.cuit).padStart(11, "0").replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3")}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">ID Empresa:</span>
                <p className="text-gray-900">{inspection.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Fecha Inspección:</span>
                <p className="text-gray-900">
                  {new Date(inspection.date).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    timeZone: 'UTC'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Cumplimiento
            </label>
            <select
              value={complianceLevel}
              onChange={(e) => setComplianceLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="high">Alto - Cumplimiento total</option>
              <option value="medium">Medio - Cumplimiento parcial</option>
              <option value="low">Bajo - Incumplimientos graves</option>
            </select>
          </div>
        </div>

        {/* Right Column - Observations and Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles y Observaciones</h3>

          {/* Observations */}
          <section className="flex gap-4">
            <div className="flex-1 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones de la Inspección
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ej: (empresa respondió pero dejó de dar información) - Usar paréntesis para advertencias condicionales"
                rows={7}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800 flex items-center gap-1">
                  <span>⚠️</span>
                  <strong>Advertencias Condicionales:</strong> Usa paréntesis () para marcar casos especiales que aparecerán destacados en rojo en las exportaciones de Excel.
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Ejemplos: (no contesta llamadas), (documentación incompleta), (empresa cerrada temporalmente)
                </p>
                {inspection.status === 'uncompleted' && (
                  <p className="text-xs text-red-700 mt-1 font-medium">
                    🔴 Esta empresa está marcada como "No se localizó" - Por favor agrega observaciones con () para que aparezca destacada en los reportes.
                  </p>
                )}
              </div>
            </div>

            {/* Inspector Notes */}
            <div className="flex-1 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas del Inspector (opcional)
              </label>
              <textarea
                value={inspectorNotes}
                onChange={(e) => setInspectorNotes(e.target.value)}
                placeholder="Notas adicionales, recomendaciones, puntos a seguir..."
                rows={7}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          Guardar Detalles
        </button>
      </div>

    </div>
  )
}