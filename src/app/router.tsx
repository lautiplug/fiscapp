import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { MainLayout } from "../shared/layout/MainLayout"
import { EmailPage } from "../features/fiscalization/pages/EmailPage"
import { InspeccionesPage } from "../features/fiscalization/pages/InspeccionesPage"
import { LinksPage } from "../features/fiscalization/pages/LinksPage"
import { PerfilPage } from "../features/fiscalization/pages/PerfilPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/inicio",
    element: <MainLayout />,
  },
  {
    path: "/email",
    element: <EmailPage />,
  },
  {
    path: "/inspecciones",
    element: <InspeccionesPage />,
  },
  {
    path: "/links",
    element: <LinksPage />,
  },
  {
    path: "/perfil",
    element: <PerfilPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}