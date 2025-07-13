import { DialogAddInspection } from "../../../shared/components/ui/DialogAddInspection";
import { useGetEnterprisesHeader } from "../hooks/useGetEnterprisesHeader";
import ArrowDown from '../../../icons/svg/arrow-down.svg?react';
import ArrowUp from '../../../icons/svg/arrow-up.svg?react';

export const InspectionsManaging = () => {

  const { inspectionResume } = useGetEnterprisesHeader()

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
              className={`${insp.title === "Expiradas" ? 'border-r-0 flex flex-col p-3 pl-3 gap-5 border-t-1' : `flex flex-col p-3 pl-3 gap-5 border-t-1 border-r-1`}`}
            >
              <div className="flex items-center justify-between gap-4">
                <h1 className="lg:text-sm font-semibold">
                  {insp.title}
                </h1>
                <div>
                  {insp.averagePercentage > 0
                    ? <p className="flex items-center gap-2 bg-green-100 p-1 rounded-md pr-2 pl-2">
                      <ArrowUp width={'30px'} height={'25px'}/>{insp.averagePercentage} %
                    </p>
                    : insp.averagePercentage === 0 ? <p className="flex items-center gap-2 bg-orange-100 p-1 rounded-md pl-2 pr-2">
                     {insp.averagePercentage} %
                  </p>
                  : <p className="flex items-center gap-2 bg-red-100 p-1 rounded-md pl-2 pr-2">
                  <ArrowDown width={'30px'} height={'25px'}/>{insp.averagePercentage} %
                </p>
                  }
                </div>
              </div>
              <h2 className="text-5xl font-bold">
                {insp.inspectionsCount < 100 ? `0${insp.inspectionsCount}` : insp.inspectionsCount}
              </h2>
              <p>Empresas</p>
            </div>
          ))
        }
      </section>
    </section>
  )
}
