import { Link } from "react-router-dom"
import { ROUTES } from "@/utils/routes"
import { Button } from "@ui/button"
import { MinusCircleIcon, PlusCircleIcon, Settings2Icon, TimerIcon } from "lucide-react"
import { useState } from "react"
import { useGlobalContext } from "@/presenters/contexts/global"

export function RoundsPage() {
  const context = useGlobalContext()

  const [rounds, setRounds] = useState(context.rounds)

  function updateLocalPeriod(value: number) {
    localStorage.setItem("rounds", JSON.stringify(value))
    context.setRounds(value)
  }

  return (
    <div className="w-full h-full flex gap-1">
      <div className="flex-1 flex flex-col gap-1 items-center justify-center">
        <span className="capitalize text-xl">Rounds</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button
              size="icon"
              onClick={() => {
                if (rounds === 1) return
                setRounds(rounds - 1)
                updateLocalPeriod(rounds - 1)
              }}
            >
              <MinusCircleIcon />
            </Button>
            <span className="font-bold text-lg text-center w-8">{rounds}</span>
            <Button
              size="icon"
              onClick={() => {
                if (rounds === 10) return
                setRounds(rounds + 1)
                updateLocalPeriod(rounds + 1)
              }}
            >
              <PlusCircleIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="self-end flex flex-col gap-1">
        <Link to={ROUTES.CONFIG}>
          <Button size="icon" className="rounded-full">
            <Settings2Icon size={20} />
          </Button>
        </Link>

        <Link to={ROUTES.HOME}>
          <Button size="icon" className="rounded-full">
            <TimerIcon size={20} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
