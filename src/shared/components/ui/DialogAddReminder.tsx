import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { type SubmitHandler } from "react-hook-form"
import { type Reminder } from "../../hooks/useAddReminders"
import { useRemindersContext } from "../../context/RemindersContext"
import { useEffect } from "react"

interface DialogReminderProps {
  editData?: Reminder;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DialogAddReminder = ({ editData, trigger, open, onOpenChange }: DialogReminderProps) => {
  const { addReminder, updateReminder, register, handleSubmit, errors, reset } = useRemindersContext()
  const isEditing = !!editData

  // Pre-populate form when editing
  useEffect(() => {
    if (editData) {
      reset(editData)
    }
  }, [editData, reset])

  const onSubmit: SubmitHandler<Reminder> = (data) => {
    if (isEditing && editData) {
      updateReminder(editData.id, data);
    } else {
      addReminder(data);
    }
    reset()
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
          <Button variant="outline" className="cursor-pointer text-gray-700 border-gray-300 font-bold text-md hover:bg-emerald-700 hover:text-white"> Añadir + </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:w-[600px]">
        <DialogTitle>{isEditing ? 'Editar Recordatorio' : 'Agregar Recordatorio'}</DialogTitle>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-md pb-2 pt-2 font-bold">Qué necesitas recordar?</label>
          <input className="border-1 p-2 rounded-md" {...register("title", { required: 'Este campo es obligatorio.' })} />
          <p className="text-red-500">{errors.title?.message}</p>

          <label className="text-md pb-2 pt-2 font-bold">Prioridad</label>
          <select className="p-3 border-1 rounded-md" {...register("priority", { required: 'Este campo es obligatorio.' })}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
          <label className="text-sm pb-2 pt-2 font-bold text-emerald-800">Cuando querés ser recordado? (  día / mes / año )</label>
          <input
            type="date"
            className="border border-emerald-200 p-2 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            {...register("date", {
              required: "Este campo es obligatorio.",
            })}
          />
          <p className="text-red-500">{errors.priority?.message}</p>
          <button className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white mt-5 rounded-md cursor-pointer transition-all" type="submit">
            {isEditing ? 'Guardar cambios' : 'Agregar'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
