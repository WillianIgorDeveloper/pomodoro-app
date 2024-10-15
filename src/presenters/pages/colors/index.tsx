import { cn } from "@utils/cn"
import { Link } from "react-router-dom"
import { Button } from "@ui/button"
import { ROUTES } from "@utils/routes"
import { CircleFadingPlusIcon, Settings2Icon, TimerIcon } from "lucide-react"
import { ScrollArea } from "@ui/scroll-area"
import { BGCOLORS } from "@utils/static/bg-colors"
import { useGlobalContext } from "@/presenters/contexts/global"

export function ColorsPage() {
  const localValues = useGlobalContext()

  return (
    <div>
      <div className="w-full h-full flex gap-1">
        <ScrollArea className="w-full h-full">
          <div className="p-1">
            <div className="w-full flex-1 grid grid-cols-5 gap-3">
              {BGCOLORS.map((color) => (
                <div
                  key={color.name}
                  className={cn(
                    "p-0 m-0 size-6 rounded-full ring-2 ring-white",
                    color.color,
                  )}
                />
              ))}
              <Link to={ROUTES.COLORS_ADD}>
                <CircleFadingPlusIcon size={24} />
              </Link>
            </div>
          </div>
        </ScrollArea>

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
    </div>
  )
}
