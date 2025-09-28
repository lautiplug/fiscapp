import { PageLayout } from "../../../shared/layout/PageLayout"
import { DetailedInspectionsTable } from "../components/DetailedInspectionsTable"

export const DetailedInspectionsPage = () => {
  return (
    <PageLayout>
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 mb-5">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Gestión Avanzada</h1>
          <p className="text-slate-600">Vista completa con filtros avanzados, detalles expandibles y gestión de observaciones</p>
        </div>

        <div className="flex-1 min-h-0">
          <DetailedInspectionsTable />
        </div>
      </div>
    </PageLayout>
  )
}