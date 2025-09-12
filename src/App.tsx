
import { EnterpriseProvider } from "./shared/context/EnterpriseContext"
import { AppRouter } from "./app/router"

export const App = () => {
  return (
    <EnterpriseProvider>
      <AppRouter />
    </EnterpriseProvider>
  )
}