import { Outlet } from "react-router-dom"
import { useGlobalContext } from "@contexts/global"
import { cn } from "@/utils/cn"

export function GlobalLayout() {
  const { background } = useGlobalContext()

  return (
    <div className={cn("w-full h-screen rounded-2xl p-3", background)}>
      <Outlet />
    </div>
  )
}
