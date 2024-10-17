import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { ROUTES } from "@utils/routes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ConfigPage } from "@pages/config"
import { HomePage } from "@pages/home"
import { ColorsPage } from "@pages/colors"
import { LongBreakPage } from "@pages/timer/long-break"
import { ColorsAddPage } from "@pages/add-color"
import { GlobalProvider } from "@contexts/global"
import { GlobalLayout } from "@layouts/global"
import { FocusPage } from "@pages/timer/focus"
import { BreakPage } from "@pages/timer/break"
import { RoundsPage } from "@pages/timer/rounds"

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
            <Route path={ROUTES.TIMER}>
              <Route path={ROUTES.TIMER_FOCUS} element={<FocusPage />} />
              <Route path={ROUTES.TIMER_BREAK} element={<BreakPage />} />
              <Route path={ROUTES.TIMER_LONGBREAK} element={<LongBreakPage />} />
              <Route path={ROUTES.TIMER_ROUNDS} element={<RoundsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>,
)
