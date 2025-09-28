import { useGetEnterprisesHeader } from "../hooks/useGetEnterprisesHeader";
import ArrowDown from '../../../icons/svg/arrow-down.svg?react';
import ArrowUp from '../../../icons/svg/arrow-up.svg?react';

export const InspectionsManaging = () => {

  const { inspectionResume } = useGetEnterprisesHeader()

  return (
    <section className="p-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight ml-2">Inspecciones</h1>
        </div>

      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          inspectionResume.map((insp, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-md border border-slate-200/50 p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  {insp.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  {insp.averagePercentage > 0
                    ? <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                        <ArrowUp width={'14px'} height={'14px'} className="stroke-emerald-600"/>
                        <span className="text-xs font-semibold">{insp.averagePercentage}%</span>
                      </div>
                    : insp.averagePercentage === 0
                      ? <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-lg border border-orange-200/50">
                          <span className="text-xs font-semibold">{insp.averagePercentage}%</span>
                        </div>
                      : <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-lg border border-red-200/50">
                          <ArrowDown width={'14px'} height={'14px'} className="stroke-red-600"/>
                          <span className="text-xs font-semibold">{insp.averagePercentage}%</span>
                        </div>
                  }
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <h2 className="text-3xl font-bold text-slate-800">
                  {insp.inspectionsCount.toString().padStart(2, '0')}
                </h2>
              </div>

              <p className="text-sm text-slate-500 font-medium">Empresas registradas</p>
            </div>
          ))
        }
      </section>
    </section>
  )
}
