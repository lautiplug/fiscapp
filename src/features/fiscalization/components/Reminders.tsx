import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useState, useEffect } from "react";
import { useRemindersContext } from "../../../shared/context/RemindersContext";
import { useNotifications } from "../../../shared/context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { DialogAddReminder } from "../../../shared/components/ui/DialogAddReminder";
import { toZonedTime, format } from "date-fns-tz";

const REMINDER_NOTIFICATION_ID = "reminder-due-today";

export const Reminders = () => {
  const { reminder, onDeleteReminder, onCompleteReminder, onUndoReminder } =
    useRemindersContext();
  const { addOrUpdateNotification, dismissedCounts } = useNotifications();

  // Check for reminders due today and update notification
  useEffect(() => {
    const today = format(toZonedTime(new Date(), "America/Argentina/Buenos_Aires"), "yyyy-MM-dd");
    const dueToday = reminder.filter(r => !r.completed && r.date === today);
    const lastDismissedCount = dismissedCounts.get(REMINDER_NOTIFICATION_ID) || 0;

    // Only show notification if count increased or user hasn't dismissed it yet
    if (dueToday.length > 0 && dueToday.length > lastDismissedCount) {
      addOrUpdateNotification({
        id: REMINDER_NOTIFICATION_ID,
        message: `Tenés ${dueToday.length} recordatorio${dueToday.length > 1 ? 's' : ''} para hoy`,
        type: "info",
        dismissible: true,
        count: dueToday.length,
      });
    }
  }, [reminder, addOrUpdateNotification, dismissedCounts]);

  const [editingReminder, setEditingReminder] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditReminder = (reminderData: any) => {
    setEditingReminder(reminderData);
    setIsEditDialogOpen(true);
  };

  const bgByPriority = (p: string) =>
    p === "Alta" ? "bg-red-200" : p === "Media" ? "bg-yellow-100" : "bg-gray-100";

  const priorityOrder: Record<string, number> = {
    Alta: 3,
    Media: 2,
    Baja: 1,
  };

  const sorted = [...reminder].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <p className="font-semibold text-slate-800">Recordatorios</p>
        <DialogAddReminder />
      </div>

      <div className="flex-1 overflow-y-auto pr-1 min-h-0">
        <AnimatePresence mode="popLayout">
          {sorted.map((r) => {
          const completed = !!r.completed;

          return (
            <motion.div
              key={r.id}
              layout // 🔥 anima cambios de orden
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`flex justify-between items-center p-2 rounded-md mb-3 ${bgByPriority(
                r.priority
              )} ${completed ? "opacity-70" : ""}`}
              title={r.title}
            >
              <label
                htmlFor={`rem-${r.id}`}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <input
                  id={`rem-${r.id}`}
                  type="checkbox"
                  className="w-auto h-auto mr-2 cursor-pointer accent-white"
                  checked={completed}
                  onChange={(e) => onCompleteReminder(r.id, e.target.checked)}
                />
                <div>
                  <h1
                    className={`${completed ? "line-through font-black text-sm max-w-[150px] truncate whitespace-nowrap overflow-hidden text-ellipsis" : "max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis font-black text-sm" }
                      }`}
                  >
                    {r.title}
                  </h1>
                  <p className="text-xs lowercase first-letter:uppercase">
                    prioridad: {r.priority}
                  </p>
                </div>
              </label>

              {completed ? (
                <button
                  onClick={() => onUndoReminder(r.id)}
                  className="text-sm bg-white text-black rounded-md px-2 py-1 cursor-pointer"
                  title="Deshacer"
                >
                  Deshacer
                </button>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0 text-xl font-bold bg-transparent hover:bg-transparent border-0 shadow-none cursor-pointer"
                      title="Acciones"
                    >
                      ⋮
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-56 bg-white p-0 rounded-md mt-2 shadow-md z-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0  data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2">
                  <PopoverArrow width={15} height={8} className="fill-white stroke-white" />
                    <div className="flex flex-col">
                      <div className="px-3 py-2">
                        <h4 className="text-sm font-medium">Acciones</h4>
                      </div>

                      <div className="border-t" />

                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleEditReminder(r)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      onClick={() => onDeleteReminder(r.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>

              )}
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>

      {/* Edit dialog */}
      <DialogAddReminder 
        editData={editingReminder || undefined}
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) {
            setEditingReminder(null)
          }
        }}
        trigger={<div style={{ display: 'none' }} />}
      />
    </div>
  );
};
