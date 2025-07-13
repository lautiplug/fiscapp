import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { type SubmitHandler } from "react-hook-form"
import { useAddReminders, type Reminder } from "../../hooks/useAddReminders"
import { useRemindersContext } from "../../context/RemindersContext"

export const DialogAddReminder = () => {

  const { addReminder } = useRemindersContext()
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useAddReminders({ mode: "onChange" })

  const onSubmit: SubmitHandler<Reminder> = (data) => {
    addReminder(data);
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" bg-green-200 hover:bg-green-300 cursor-pointer border-none text-green-600 font-bold text-md"> + Recordatorio</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[600px]">
        <DialogTitle>Agregar Recordatorio</DialogTitle>
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
          <button className="p-2 bg-green-500 text-white mt-5 rounded-md cursor-pointer" type="submit">Agregar</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
