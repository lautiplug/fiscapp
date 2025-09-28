import type { ReactNode } from "react"
import { SidebarView } from "../../features/fiscalization/components/SidebarView"
import { Navbar } from "../components/layout/Navbar"

interface PageLayoutProps {
  children: ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0">
        <SidebarView />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-rows-[auto_1fr] gap-2 pr-2 pb-2 pt-1 pl-1">
        {/* Navbar */}
        <div className="w-full">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 rounded-2xl border border-white/50 overflow-hidden min-h-0 flex-1">
          <div className="p-2 h-full overflow-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}