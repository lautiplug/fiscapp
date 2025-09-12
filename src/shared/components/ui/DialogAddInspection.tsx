import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { useFormEnterprises, type IFormInput } from "../../hooks/useFormEnterprises"
import { useEnterprise } from "../../context/EnterpriseContext"
import { type SubmitHandler } from "react-hook-form"
import { useEffect } from "react"

interface DialogInspectionProps {
  editData?: IFormInput;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DialogAddInspection({ editData, trigger, open, onOpenChange }: DialogInspectionProps) {
  const { addEnterprise, updateEnterprise } = useEnterprise()
  const isEditing = !!editData

  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useFormEnterprises({ mode: "onChange" })

  // Pre-populate form when editing
  useEffect(() => {
    if (editData) {
      reset(editData)
    }
  }, [editData, reset])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("🔍 Original form data:", data);
    console.log("🔍 Original data types:", {
      id: typeof data.id,
      cuit: typeof data.cuit,
      idValue: data.id,
      cuitValue: data.cuit
    });

    // Convert string numbers to actual numbers
    const processedData = {
      ...data,
      id: Number(data.id),
      cuit: Number(data.cuit)
    };

    console.log("🔍 Processed data:", processedData);
    console.log("🔍 Processed data types:", {
      id: typeof processedData.id,
      cuit: typeof processedData.cuit,
      idValue: processedData.id,
      cuitValue: processedData.cuit
    });

    if (isEditing && editData) {
      console.log("🔍 Editing mode - Original editData:", editData);
      console.log("🔍 Calling updateEnterprise with:", editData.id, processedData);
      updateEnterprise(editData.id, processedData);
    } else {
      console.log("🔍 Adding mode - Calling addEnterprise with:", processedData);
      addEnterprise(processedData);
    }
    reset()
    reset({
      date: data.date,
    })
    // Close dialog after successful submit
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      {!trigger && (
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer text-black font-bold text-md">Añadir inspección</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:w-[600px]">
        <DialogTitle>{isEditing ? 'Editar inspección' : 'Añadir inspección'}</DialogTitle>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-md pb-2 pt-2 font-bold text-green-800">Nombre de la empresa</label>
          <input className="border border-green-200 p-2 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none" {...register("name", { required: 'Este campo es obligatorio.' })} />
          <p className="text-red-500">{errors.name?.message}</p>
          <label className="text-md pb-2 pt-2 font-bold text-green-800">Cuit</label>
          <input type="number" className="border border-green-200 p-2 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" {...register("cuit", {
            required: "Este campo es obligatorio.",
            pattern: {
              value: /^\d{11}$/,
              message: "El CUIT debe contener exactamente 11 números.",
            },
            validate: (value) => {
              const str = String(value);
              return str.length === 11 || "El CUIT debe contener exactamente 11 números.";
            }
          })} />
          <p className="text-red-500">{errors.cuit?.message}</p>

          <label className="text-md pb-2 pt-2 font-bold text-green-800">Número de la empresa</label>
          <input type="number" className="border border-green-200 p-2 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" {...register("id", { 
            required: 'Este campo es obligatorio.',
            pattern: {
              value: /^\d{7,8}$/,
              message: "El Nº de empresa debe contener 7 u 8 números.",
            },
            validate: (value) => {
              const str = String(value);
              return (str.length >= 7 && str.length <= 8) || "El Nº de empresa debe contener 7 u 8 números.";
            }
            })} />
          <p className="text-red-500">{errors.id?.message}</p>

          <label className="text-md pb-2 pt-2 font-bold text-green-800">Localidad</label>
          <input className="border border-green-200 p-2 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none" {...register("city", { required: 'Este campo es obligatorio.' })} />
          <p className="text-red-500">{errors.city?.message}</p>

          <label className="text-md pb-2 pt-2 font-bold text-green-800">Fecha de inspección ( mes / día / año )</label>
          <input
            type="date"
            className="border border-green-200 p-2 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
            {...register("date", {
              required: "Este campo es obligatorio.",
            })}
          />
          <p className="text-red-500">{errors.date?.message}</p>

          <label className="text-md pb-2 pt-2 font-bold text-green-800">Estado</label>
          <select className="p-3 border border-green-200 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none" {...register("status", { required: 'Este campo es obligatorio.' })}>
            <option value="waiting">Esperando información</option>
            <option value="completed">Completada</option>
            <option value="uncompleted">No se localizó</option>
          </select>
          <p className="text-red-500">{errors.status?.message}</p>
          <button className="p-2 bg-green-600 hover:bg-green-700 text-white mt-5 rounded-md cursor-pointer transition-colors" type="submit">
            {isEditing ? 'Guardar cambios' : 'Añadir'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
