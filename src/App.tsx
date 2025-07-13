
import { InspectionsManaging } from "./features/fiscalizacion/components/InspectionsManaging"
import { SidebarView } from "./features/fiscalizacion/components/SidebarView"
import { Navbar } from "./shared/components/layout/Navbar"
import { TableInfo } from "./features/fiscalizacion/components/Table"
import { EnterpriseProvider } from "./shared/context/EnterpriseContext"
import { Reminders } from "./features/fiscalizacion/components/Reminders"
import { ReminderProvider } from "./shared/context/RemindersContext"

export const App = () => {

  return (
    <EnterpriseProvider>
      <main className="w-full h-screen grid grid-cols-5 grid-rows-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 pr-10 pb-5 bg-white"
        style={{
          backgroundImage: `
        radial-gradient(circle at center, #d1f9de, transparent)
      `,
          backgroundRepeat: "no-repeat",
        }}
      >
        <section className="row-span-7 w-70 ">
          <SidebarView />
        </section>

        <div className="w-full col-span-4">
          <Navbar />
        </div>

        <div className="col-span-4 col-start-2 bg-white shadow-sm rounded-md">
          <InspectionsManaging />
        </div>

        <div className="col-span-3 row-span-5 col-start-2 bg-white shadow-md rounded-md overflow-y-scroll p-2 min-h-0">
          <TableInfo />
        </div>

        <div className="col-span-2 row-span-5 col-start-5 border-2 bg-gray-50">
          <ReminderProvider>
            <Reminders />
          </ReminderProvider>
        </div>
      </main>
    </EnterpriseProvider>


  )
}