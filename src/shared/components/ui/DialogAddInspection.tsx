import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { useFormEnterprises, type IFormInput } from "../../hooks/useFormEnterprises"
import { useEnterprise } from "../../context/EnterpriseContext"
import { type SubmitHandler } from "react-hook-form"


export function DialogAddInspection() {

  const { addEnterprise } = useEnterprise()
  const { register, handleSubmit, errors, reset } = useFormEnterprises()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addEnterprise(data);
    reset();
  }
  
  return (
    <Dialog>

        <DialogTrigger asChild>
          <Button variant="outline" className="bg-green-400 hover:bg-green-400 cursor-pointer">Agregar inspección</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Agregar</DialogTitle>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-md pb-2 pt-2 font-bold">Nombre de la empresa</label>
            <input className="border-1 p-2 rounded-md" {...register("name", {required: 'Este campo es obligatorio.'})} />
            <p className="text-red-500">{errors.name?.message}</p>

            <label className="text-md pb-2 pt-2 font-bold">Cuit</label>
            <input type="number" className="border-1 p-2 rounded-md [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" {...register("cuit", {required: 'Este campo es obligatorio.', minLength: {value: 11, message: 'El campo debe contener 11 caracteres.'}})} />
            <p className="text-red-500">{errors.cuit?.message}</p>

            <label className="text-md pb-2 pt-2 font-bold">Número de la empresa</label>
            <input type="number" className="border-1 p-2 rounded-md [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" {...register("id", {required: 'Este campo es obligatorio.'})} />
            <p className="text-red-500">{errors.id?.message}</p>

            <label className="text-md pb-2 pt-2 font-bold">Localidad</label>
            <input className="border-1 p-2 rounded-md" {...register("city", {required: 'Este campo es obligatorio.'})} />
            <p className="text-red-500">{errors.city?.message}</p>

            <label className="text-md pb-2 pt-2 font-bold">Estado</label>
            <select className="p-3 border-1 rounded-md" {...register("status", {required: 'Este campo es obligatorio.'})}>
              <option value="waiting">Esperando información</option>
              <option value="completed">Completada</option>
              <option value="uncompleted">No se localizó</option>
            </select>
            <p className="text-red-500">{errors.status?.message}</p>
            <button className="p-2 bg-green-500 text-white mt-5 rounded-md cursor-pointer" type="submit">Agregar</button>
          </form>
        </DialogContent>
    </Dialog>
  )
}
