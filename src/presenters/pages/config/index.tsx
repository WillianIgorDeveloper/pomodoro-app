import { Button } from "@ui/button"
import { ROUTES } from "@/utils/routes"
import { ChevronRightIcon, PaletteIcon, TimerIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useGlobalContext } from "@/presenters/contexts/global"

export function ConfigPage() {
  const localValues = useGlobalContext()

  return (
    <div>
      <div className="w-full h-full flex gap-2">
        <div className="flex-1">
          <ul className="space-y-1">
            <li className="relative z-40">
              <Link to={ROUTES.TIMER_FOCUS}>
                <Button className="w-full justify-between h-7 pr-1">
                  Focus
                  <div className="flex items-center gap-1">
                    <span>{localValues.focusPeriod}</span>
                    <ChevronRightIcon />
                  </div>
                </Button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TIMER_BREAK}>
                <Button className="w-full justify-between h-7 pr-1">
                  Break
                  <div className="flex items-center gap-1">
                    <span>{localValues.breakPeriod}</span>
                    <ChevronRightIcon />
                  </div>
                </Button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TIMER_LONGBREAK}>
                <Button className="w-full justify-between h-7 pr-1">
                  LongBreak
                  <div className="flex items-center gap-1">
                    <span>{localValues.longBreakPeriod}</span>
                    <ChevronRightIcon />
                  </div>
                </Button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TIMER_ROUNDS}>
                <Button className="w-full justify-between h-7 pr-1">
                  Rounds
                  <div className="flex items-center gap-1">
                    <span>{localValues.rounds}</span>
                    <ChevronRightIcon />
                  </div>
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="self-end flex flex-col gap-1">
          <Link to={ROUTES.COLORS}>
            <Button size="icon" className="rounded-full">
              <PaletteIcon size={20} />
            </Button>
          </Link>

          <Link to={ROUTES.HOME}>
            <Button size="icon" className="rounded-full">
              <TimerIcon size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
