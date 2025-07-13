import { DialogAddReminder } from "../../../shared/components/ui/DialogAddReminder"
import { useRemindersContext } from "../../../shared/context/RemindersContext";

export const Reminders = () => {

  const { reminder } = useRemindersContext();

  return (
    <div className="flex flex-col items-right w-full p-2">
      <div className="flex justify-between items-center mb-5">
        <p className="">Recordatorios</p>
        <DialogAddReminder />
      </div>
      {
        reminder.map((reminder) => (
          <div className="flex justify-between items-center mt-2">
            <h1>{reminder.title}</h1>
            <p className={reminder.priority === 'Alta' ? 'bg-red-200 text-red-500 p-1 rounded-md' : reminder.priority === 'Media' ? 'bg-yellow-200 text-yellow-500 p-1 rounded-md' : 'bg-green-200 text-green-500 p-1 rounded-md'}>{reminder.priority}</p>
          </div>
        ))
      }
    </div>
  )
}