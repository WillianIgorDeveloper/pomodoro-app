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

  const [currentBackground, setCurrentBackground] = useState("")

  function handleUpdateBackgroundColor(value: string) {
    localStorage.setItem(`${target}Background`, JSON.stringify(value))
    localStorage.setItem("background", JSON.stringify(value))
    if (target === "focus") context.setFocusBackground(value)
    if (target === "break") context.setBreakBackground(value)
    if (target === "longBreak") context.setLongBreakBackground(value)
    context.updateBackground(value)
  }

  useEffect(() => {
    if (target === "focus") setCurrentBackground(context.focusBackground)
    if (target === "break") setCurrentBackground(context.breakBackground)
    if (target === "longBreak") setCurrentBackground(context.longBreakBackground)
  }, [
    context.focusBackground,
    context.breakBackground,
    context.longBreakBackground,
    target,
  ])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={cn("size-5 rounded-full ring-2 ring-white", currentBackground)}
          />
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
      <div
        className={cn(
          "w-full h-full fixed top-0 left-0 rounded-xl -z-10",
          currentBackground,
        )}
      />
    </>
  )
}
