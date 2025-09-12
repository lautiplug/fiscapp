import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { type SubmitHandler } from "react-hook-form"
import { useAddReminders, type Reminder } from "../../hooks/useAddReminders"
import { useRemindersContext } from "../../context/RemindersContext"
import { useEffect } from "react"

interface DialogReminderProps {
  editData?: Reminder;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DialogAddReminder = ({ editData, trigger, open, onOpenChange }: DialogReminderProps) => {
  const { addReminder, updateReminder } = useRemindersContext()
  const isEditing = !!editData

  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useAddReminders({ mode: "onChange" })

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
          <Button variant="outline" className="cursor-pointer text-gray-700 border-gray-300 font-bold text-md"> Añadir + </Button>
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
          <p className="text-red-500">{errors.priority?.message}</p>
          <button className="p-2 bg-green-500 text-white mt-5 rounded-md cursor-pointer" type="submit">
            {isEditing ? 'Guardar cambios' : 'Agregar'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
