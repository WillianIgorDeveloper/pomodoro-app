import { cn } from "@/utils/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"
import { BGCOLORS } from "@/utils/static/bg-colors"
import { useEffect, useState } from "react"
import { useGlobalContext } from "@/presenters/contexts/global"

export function ColorPicker({ target }: { target: string }) {
  const context = useGlobalContext()

  const [background, setBackground] = useState("")

  function handleUpdateBackgroundColor(value: string) {
    localStorage.setItem(`${target}Background`, JSON.stringify(value))
    localStorage.setItem("background", JSON.stringify(value))
    setBackground(value)
    context.updateBackground(value)
  }

  useEffect(() => {
    if (target === "focus") setBackground(context.focusBackground)
    if (target === "break") setBackground(context.breakBackground)
    if (target === "longBreak") setBackground(context.longBreakBackground)
  }, [
    context.focusBackground,
    context.breakBackground,
    context.longBreakBackground,
    target,
  ])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn("size-5 rounded-full ring-2 ring-white", background)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center">
        {BGCOLORS.map((color) => (
          <DropdownMenuItem
            key={color.id}
            onClick={() => handleUpdateBackgroundColor(color.color)}
          >
            <div className={cn("size-5 rounded-full ring-2 ring-white", color.color)} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
