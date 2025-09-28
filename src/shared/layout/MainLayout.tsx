import type { ReactNode } from "react"
import { InspectionsManaging } from "../../features/fiscalization/components/InspectionsManaging"
import { SidebarView } from "../../features/fiscalization/components/SidebarView"
import { Navbar } from "../components/layout/Navbar"
import { TableInfo } from "../../features/fiscalization/components/Table"
import { Reminders } from "../../features/fiscalization/components/Reminders"
import { ReminderProvider } from "../context/RemindersContext"

interface MainLayoutProps {
  children?: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0">
        <SidebarView />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-rows-[auto_auto_2fr] gap-2 pr-2 pb-2 pt-1 pl-1">
        {/* Navbar */}
        <div className="w-full">
          <Navbar />
        </div>

        {/* Inspections Managing */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 rounded-2xl border border-white/50">
          <InspectionsManaging />
        </div>

        {/* Bottom section with Table and Reminders */}
        <div className="grid grid-cols-4 gap-2 min-h-0">
          <div className="col-span-3 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 rounded-2xl border border-white/50 overflow-hidden">
            <div className="p-2 h-full flex flex-col">
              <TableInfo />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 rounded-2xl border border-white/50">
            <div className="p-2">
              <ReminderProvider>
                <Reminders />
              </ReminderProvider>
            </div>
          </div>
        </div>
      </main>

      {children}
    </div>
  )
} 