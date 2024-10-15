import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { ROUTES } from "@utils/routes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ConfigPage } from "@pages/config"
import { HomePage } from "@pages/home"
import { ColorsPage } from "@pages/colors"
import { TimerPage } from "@pages/[timer]"
import { ColorsAddPage } from "@pages/add-color"
import { GlobalProvider } from "@contexts/global"
import { GlobalLayout } from "@layouts/global"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CONFIG} element={<ConfigPage />} />
            <Route path={ROUTES.COLORS} element={<ColorsPage />} />
            <Route path={ROUTES.COLORS_ADD} element={<ColorsAddPage />} />
            <Route path={`${ROUTES.TIMER}:timer`} element={<TimerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>,
)
