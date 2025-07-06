

import { DialogAddInspection } from "../../../shared/components/ui/DialogAddInspection";
import { useGetEnterprisesHeader } from "../hooks/useGetEnterprisesHeader";

export const InspectionsManaging = () => {
  
  const {inspectionResume} = useGetEnterprisesHeader()

  return (
    <section className="p-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold">Performance inspecciones</h1>
          <p className="text-gray-400 text-sm">
            7 de julio, <span className="text-black font-bold text-sm">11:11 am.</span>
          </p>
        </div>
        <div>
          <DialogAddInspection />
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5">
        {
          inspectionResume.map((insp, index) => (
            <div
              key={index}
              className="flex flex-col p-6 gap-10 border-t-1 border-r-1"
            >
              <h1 className="lg:text-md font-semibold">
                {insp.title}
              </h1>
              <h2 className="text-6xl font-bold">
                {insp.inspectionsCount < 100 ? `0${insp.inspectionsCount}` : insp.inspectionsCount}
              </h2>
              <div>
                <p className="text-sm text-gray-400">{insp.lastDate}</p>
                <p>
                  {insp.averagePercentage >= 0
                    ? `${insp.averagePercentage}% + respecto al último mes.`
                    : `${insp.averagePercentage}% respecto al último mes.`}
                </p>
              </div>
            </div>
          ))
        }
      </section>
    </section>
  )
}
