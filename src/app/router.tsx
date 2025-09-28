import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { MainLayout } from "../shared/layout/MainLayout"
import { EmailPage } from "../features/fiscalization/pages/EmailPage"
import { DetailedInspectionsPage } from "../features/fiscalization/pages/DetailedInspectionsPage"
import { LinksPage } from "../features/fiscalization/pages/LinksPage"
import { PerfilPage } from "../features/fiscalization/pages/PerfilPage"
import { Login } from "../features/fiscalization/pages/Login"
import { TablesPage } from "../features/fiscalization/pages/TablesPage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/login",
    element: <Login />,
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
    element: <DetailedInspectionsPage />,
  },
  {
    path: "/links",
    element: <LinksPage />,
  },
  {
    path: "/tablas",
    element: <TablesPage />,
  },
  {
    path: "/perfil",
    element: <PerfilPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}