import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { useEnterprise } from "../../../shared/context/EnterpriseContext"

export const TableInfo = () => {

  const {enterprise} = useEnterprise()

  useEffect(() => {
    console.log('table clg', enterprise)
  }, [])

  return (
    <section>
      <div className="flex justify-between p-5">
        <h1>Inspecciones</h1>
        <button className="cursor-pointer p-1 pr-3 pl-3 rounded-sm bg-green-300"> + </button>
      </div>
      <Table>
        <TableCaption className="mb-5">Tabla que muestra una lista con detalles de las inspecciones.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cuit</TableHead>
            <TableHead>Nombre de la empresa</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enterprise.map((obj) => (
            <TableRow key={obj.id}>
              <TableCell className="font-medium">{obj.cuit}</TableCell>
              <TableCell>{obj.name}</TableCell>
              <TableCell>{obj.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  )
}
