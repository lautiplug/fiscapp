import type { ReactNode } from "react"
import { SidebarView } from "../../features/fiscalization/components/SidebarView"
import { Navbar } from "../components/layout/Navbar"

interface PageLayoutProps {
  children: ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="w-full h-screen grid grid-cols-5 grid-rows-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 pr-10 pb-5 bg-white"
      style={{
        backgroundImage: `
        radial-gradient(circle at center, #d1f9de, transparent)
      `,
        backgroundRepeat: "no-repeat"
      }}>
      <section className="row-span-7 w-65">
        <SidebarView />
      </section>

      <div className="w-full col-span-4">
        <Navbar />
      </div>

      <div className="col-span-4 col-start-2 row-start-3 row-span-5">
        {children}
      </div>
    </main>
  )
}