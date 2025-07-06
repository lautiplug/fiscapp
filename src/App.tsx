
import { InspectionsManaging } from "./features/fiscalizacion/components/InspectionsManaging"
import { SidebarView } from "./features/fiscalizacion/components/SidebarView"
import { Navbar } from "./shared/components/layout/Navbar"
import { TableInfo } from "./features/fiscalizacion/components/Table"
import { EnterpriseProvider } from "./shared/context/EnterpriseContext"

export const App = () => {

  return (
    <EnterpriseProvider>
      <main className="w-auto parent grid grid-cols-5 auto-rows-auto gap-2 h-auto pr-10 pb-5 bg-[radial-gradient(circle,_hsla(128,100%,96%,1)_0%,_hsla(0,50%,100%,1)_100%)] ">
        <section className="row-span-7 w-70 ">
          <SidebarView />
        </section>

        <div className="w-full col-span-4 ">
          <Navbar />
        </div>

        <div className="col-span-4 col-start-2 bg-white shadow-sm rounded-md">
          <InspectionsManaging />
        </div>

        <div className="col-span-3 row-span-4 col-start-2 bg-white shadow-md rounded-md">
          <TableInfo />
        </div>

        <div className="col-span-2 row-span-2 col-start-5 border-2 bg-gray-50">
          hola4
        </div>

        <div className="col-span-2 row-span-2 col-start-5 border-2 bg-gray-50">
          hola5
        </div>
      </main>
    </EnterpriseProvider>


  )
}