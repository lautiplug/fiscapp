
import clsx from "clsx"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { useEnterprise } from "../../../shared/context/EnterpriseContext"

export const TableInfo = () => {

  const { enterprise, updateEnterpriseStatus, formatStatus } = useEnterprise()

  const formatCuit = (cuit: string | number) => {
    const str = String(cuit).padStart(11, "0")
    return `${str.slice(0, 2)}-${str.slice(2, 10)}-${str.slice(10)}`
  }

  return (
    <section>
      <div className="flex justify-between p-5">
        <h1>Inspecciones</h1>
        <button className="cursor-pointer p-1 pr-3 pl-3 rounded-sm bg-green-300"> 4</button>
      </div>
      <Table>
        <TableCaption className="mb-5">Tabla que muestra una lista con detalles de las inspecciones.</TableCaption>
        <TableHeader>
          <TableRow >
            <TableHead>Nombre de la empresa</TableHead>
            <TableHead className="w-[100px]">Cuit</TableHead>
            <TableHead>Número de empresa</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enterprise.map((obj) => (
            <TableRow key={obj.id}>
              <TableCell>{obj.name}</TableCell>
              <TableCell className="font-md">{formatCuit(obj.cuit)}</TableCell>
              <TableCell>{obj.id}</TableCell>
              <TableCell className={clsx(
                "w-[160px] max-w-[160px] p-1",
                "cursor-pointer",
                {
                  "text-yellow-600 bg-yellow-100 font-medium rounded-sm m-10": obj.status === "waiting",
                  "text-green-600 bg-green-100 font-semibold": obj.status === "completed",
                  "text-red-600 bg-red-100 font-medium": obj.status === "uncompleted",
                }
              )} onClick={() => updateEnterpriseStatus(obj.id)}>{formatStatus(obj.status)}</TableCell>
              <TableCell className="text-center">
                {new Date(obj.date).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
