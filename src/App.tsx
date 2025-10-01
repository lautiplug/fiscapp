
import { Toaster } from "sonner"
import { EnterpriseProvider } from "./shared/context/EnterpriseContext"
import { AppRouter } from "./app/router"
import { NotificationProvider } from "./shared/context/NotificationContext"

export const App = () => {
  return (
    <EnterpriseProvider>
      <NotificationProvider>
        <AppRouter />
        <Toaster position="top-right" richColors />
      </NotificationProvider>
    </EnterpriseProvider>
  )
}