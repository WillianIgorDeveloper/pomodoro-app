import { ROUTES } from "@utils/routes"
import { Button } from "@ui/button"
import {
  CircleCheckBigIcon,
  CircleDashedIcon,
  RefreshCwIcon,
  Settings2Icon,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useGlobalContext } from "@contexts/global"

export function HomePage() {
  const context = useGlobalContext()

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex-1 flex flex-col gap-1 items-center justify-center">
        <span className="text-6xl font-bold">{context.currentTimer}</span>
        <div className="flex gap-1 items-center justify-center">
          {Array.from({ length: context.rounds }).map((_, i) => {
            if (i <= context.currentRound - 1)
              return <CircleCheckBigIcon key={i} size={14} />
            return <CircleDashedIcon size={14} key={i} />
          })}
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <Button onClick={context.restartPomodoro} size="icon" className="rounded-full">
          <RefreshCwIcon size={16} />
        </Button>

        {context.timerIsRunning ? (
          <Button onClick={context.pausePomodoro} className="rounded-full w-24">
            Pause
          </Button>
        ) : (
          <Button onClick={context.startPomodoro} className="rounded-full w-24">
            Start
          </Button>
        )}

        <Link to={ROUTES.CONFIG}>
          <Button size="icon" className="rounded-full">
            <Settings2Icon size={18} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
