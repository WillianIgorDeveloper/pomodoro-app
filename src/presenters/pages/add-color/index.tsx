import { cn } from "@utils/cn"
import { Link } from "react-router-dom"
import { Button } from "@ui/button"
import { ROUTES } from "@utils/routes"
import { PaletteIcon, TimerIcon } from "lucide-react"
import { useGlobalContext } from "@/presenters/contexts/global"

export function ColorsAddPage() {
  const localValues = useGlobalContext()

  return (
    <div>
      <div className="w-full h-full flex gap-1">
        <div className="w-full" />

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
