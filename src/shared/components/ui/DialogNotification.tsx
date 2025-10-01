import { PopoverContent } from "../../../components/ui/popover";
import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";

export const DialogNotification = () => {
  const { notifications, readNotifications, removeNotification, clearReadNotifications } = useNotifications();
  const [activeTab, setActiveTab] = useState<"all" | "read">("all");

  const tabs = [
    { id: "all", label: "Todas" },
    { id: "read", label: "Leídas" },
  ];

  return (
    <PopoverContent className="w-80 mr-15">
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b pb-4">
            <h4 className="leading-none font-medium">Notificaciones</h4>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "all" | "read")}
                  className={`text-xs px-3 py-1 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-100 text-emerald-700 font-medium'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "all" ? (
            notifications.length > 0 ? (
              <div className="space-y-2 mt-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-2 rounded-md border flex justify-between items-start ${
                      notification.type === 'warning'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <p className={`text-sm ${
                      notification.type === 'warning' ? 'text-amber-800' : 'text-emerald-800'
                    }`}>
                      {notification.message}
                    </p>
                    {notification.dismissible && (
                      <button
                        onClick={() => {
                          removeNotification(notification.id);
                        }}
                        className={`ml-2 ${
                          notification.type === 'warning'
                            ? 'text-amber-600 hover:text-amber-800'
                            : 'text-emerald-600 hover:text-emerald-800'
                        }`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 mt-3">No hay notificaciones</p>
            )
          ) : (
            <>
              {readNotifications.length > 0 && (
                <button
                  onClick={clearReadNotifications}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Borrar todas
                </button>
              )}
              {readNotifications.length > 0 ? (
                <div className="space-y-2 mt-3">
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-2 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-start"
                    >
                      <p className="text-sm text-slate-800">{notification.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 mt-3">No hay notificaciones leídas</p>
              )}
            </>
          )}
        </div>
      </div>
    </PopoverContent>
  );
};
