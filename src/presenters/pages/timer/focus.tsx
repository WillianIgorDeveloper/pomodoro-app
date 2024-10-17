import { Link } from "react-router-dom"
import { ROUTES } from "@/utils/routes"
import { Button } from "@ui/button"
import { Settings2Icon, TimerIcon } from "lucide-react"
import { ColorPicker } from "@composed/color-picker"
import { useState } from "react"
import { FixDigits } from "@/utils/functions/fix-digits"
import { useGlobalContext } from "@/presenters/contexts/global"

export function FocusPage() {
  const context = useGlobalContext()

  const [minutes, setMinutes] = useState(context.focusPeriod.split(":")[0])
  const [seconds, setSeconds] = useState(context.focusPeriod.split(":")[1])

  function updateLocalPeriod(value: string) {
    localStorage.setItem("focusPeriod", JSON.stringify(value))
    context.setFocusPeriod(value)
  }

  return (
    <div className="w-full h-full flex gap-1">
      <div className="flex-1 flex flex-col gap-1 items-center justify-center">
        <span className="capitalize text-xl">Focus</span>
        <div className="flex items-center gap-4">
          <div className="flex items-start gap-1">
            <input
              type="text"
              className="text-center w-6 text-xl bg-transparent border-b outline-none"
              value={minutes}
              onChange={(e) => {
                // Accept only numbers and 2 decimal places.
                if (/^[0-9]{0,2}$/.test(e.target.value)) {
                  setMinutes(e.target.value)
                  updateLocalPeriod(
                    `${FixDigits(e.target.value)}:${FixDigits(seconds ?? "00")}`,
                  )
                }
              }}
            />
            <span>:</span>
            <input
              type="text"
              className="text-center w-6 text-xl bg-transparent border-b outline-none"
              value={seconds}
              onChange={(e) => {
                // Accept only numbers and 2 decimal places.
                if (/^[0-9]{0,2}$/.test(e.target.value)) {
                  setSeconds(e.target.value)
                  updateLocalPeriod(
                    `${FixDigits(minutes ?? "00")}:${FixDigits(e.target.value)}`,
                  )
                }
              }}
            />
          </div>
          <ColorPicker target="focus" />
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
