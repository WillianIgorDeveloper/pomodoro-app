import { FixDigits } from "@/utils/functions/fix-digits"
import { notify } from "@/utils/functions/notify"
import { createContext, useContext, useEffect, useState } from "react"

interface IGlobalContext {
  currentTimer: string
  focusPeriod: string
  breakPeriod: string
  longBreakPeriod: string
  rounds: number
  background: string
  focusBackground: string
  breakBackground: string
  longBreakBackground: string
  currentInterval: NodeJS.Timeout | undefined
  currentTimerRunningOn: string
  currentRound: number
  timerIsRunning: boolean
  setFocusPeriod: React.Dispatch<React.SetStateAction<string>>
  setBreakPeriod: React.Dispatch<React.SetStateAction<string>>
  setLongBreakPeriod: React.Dispatch<React.SetStateAction<string>>
  setRounds: React.Dispatch<React.SetStateAction<number>>
  setFocusBackground: React.Dispatch<React.SetStateAction<string>>
  setBreakBackground: React.Dispatch<React.SetStateAction<string>>
  setLongBreakBackground: React.Dispatch<React.SetStateAction<string>>
  updateBackground: (value: string) => void
  restartPomodoro: () => void
  pausePomodoro: () => void
  startPomodoro: () => void
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined)

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [currentTimer, setCurrentTimer] = useState("00:00")
  const [focusPeriod, setFocusPeriod] = useState<string>("25:00")
  const [breakPeriod, setBreakPeriod] = useState<string>("05:00")
  const [longBreakPeriod, setLongBreakPeriod] = useState<string>("40:00")
  const [rounds, setRounds] = useState(4)
  const [background, setBackground] = useState<string>("bg-background")
  const [focusBackground, setFocusBackground] = useState<string>("bg-background")
  const [breakBackground, setBreakBackground] = useState<string>("bg-background")
  const [longBreakBackground, setLongBreakBackground] = useState<string>("bg-background")
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | undefined>()
  const [currentTimerRunningOn, setCurrentTimerRunningOn] = useState("focus")
  const [currentRound, setCurrentRound] = useState(0)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  function updateBackground(value: string) {
    localStorage.setItem("background", JSON.stringify(value))
  }

  function startPomodoro() {
    setTimerIsRunning(true)

    let timerRunningOn = currentTimerRunningOn
    let timer = currentTimer
    let round = rounds

    const newInterval = setInterval(() => {
      if (timerRunningOn === "focus") {
        const [minutes, seconds] = timer.split(":").map(Number)

        if (seconds === 0 && minutes === 0) {
          if (round === 1) {
            clearInterval(newInterval)
            setCurrentTimerRunningOn("focus")
            setCurrentTimer(focusPeriod)
            setCurrentRound(rounds)
            setTimerIsRunning(false)
            notify("Time is up!")
            updateBackground(focusBackground)
            return
          }

          round -= 1
          setCurrentRound((prev) => prev + 1)

          if (round === Number((rounds / 2).toFixed(0))) {
            timer = longBreakPeriod
            setCurrentTimer(longBreakPeriod)
            timerRunningOn = "longBreak"
            setCurrentTimerRunningOn("longBreak")
            notify("Time for a long break!")
            updateBackground(longBreakBackground)
            return
          }

          timer = breakPeriod
          setCurrentTimer(breakPeriod)
          timerRunningOn = "break"
          setCurrentTimerRunningOn("break")
          notify("Time for a break!")
          updateBackground(breakBackground)
          return
        }

        if (seconds === 0) {
          timer = `${FixDigits(minutes - 1)}:59`
          setCurrentTimer(timer)
          return
        }

        timer = `${FixDigits(minutes)}:${FixDigits(seconds - 1)}`
        setCurrentTimer(timer)
        return
      }

      if (timerRunningOn === "longBreak") {
        const [minutes, seconds] = timer.split(":").map(Number)

        if (seconds === 0 && minutes === 0) {
          timer = focusPeriod
          setCurrentTimer(focusPeriod)
          timerRunningOn = "focus"
          setCurrentTimerRunningOn("focus")
          notify("Time to focus!")
          updateBackground(focusBackground)
          return
        }

        if (seconds === 0) {
          timer = `${FixDigits(minutes - 1)}:59`
          setCurrentTimer(timer)
          return
        }

        timer = `${FixDigits(minutes)}:${FixDigits(seconds - 1)}`
        setCurrentTimer(timer)
        return
      }

      if (timerRunningOn === "break") {
        const [minutes, seconds] = timer.split(":").map(Number)

        if (seconds === 0 && minutes === 0) {
          timer = focusPeriod
          setCurrentTimer(focusPeriod)
          timerRunningOn = "focus"
          setCurrentTimerRunningOn("focus")
          notify("Time to focus!")
          updateBackground(focusBackground)
          return
        }

        if (seconds === 0) {
          timer = `${FixDigits(minutes - 1)}:59`
          setCurrentTimer(timer)
          return
        }

        timer = `${FixDigits(minutes)}:${FixDigits(seconds - 1)}`
        setCurrentTimer(timer)
        return
      }
    }, 1000)

    setCurrentInterval(newInterval)
  }

  function pausePomodoro() {
    clearInterval(currentInterval)
    setTimerIsRunning(false)
  }

  function restartPomodoro() {
    clearInterval(currentInterval)
    setCurrentTimerRunningOn("focus")
    setCurrentTimer(focusPeriod)
    setCurrentRound(0)
    updateBackground(focusBackground)
    setTimerIsRunning(false)
  }

  useEffect(() => {
    async function getLocalStorageValues() {
      let localCurrentTimer = localStorage.getItem("currentTimer")
      if (localCurrentTimer) {
        localCurrentTimer = await JSON.parse(localCurrentTimer)
        setCurrentTimer(localCurrentTimer ?? "00:00")
      }

      let localFocusPeriod = localStorage.getItem("focusPeriod")
      if (localFocusPeriod) {
        localFocusPeriod = await JSON.parse(localFocusPeriod)
        setFocusPeriod(localFocusPeriod ?? "25:00")
      }

      let localBreakPeriod = localStorage.getItem("breakPeriod")
      if (localBreakPeriod) {
        localBreakPeriod = await JSON.parse(localBreakPeriod)
        setBreakPeriod(localBreakPeriod ?? "05:00")
      }

      let localLongBreakPeriod = localStorage.getItem("longBreakPeriod")
      if (localLongBreakPeriod) {
        localLongBreakPeriod = await JSON.parse(localLongBreakPeriod)
        setLongBreakPeriod(localLongBreakPeriod ?? "40:00")
      }

      let localRounds = localStorage.getItem("rounds")
      if (localRounds) {
        localRounds = await JSON.parse(localRounds)
        setRounds(Number(localRounds))
      }

      let localBackground = localStorage.getItem("background")
      if (localBackground) {
        localBackground = await JSON.parse(localBackground)
        setBackground(localBackground ?? "bg-background")
      }

      let localFocusBackground = localStorage.getItem("focusBackground")
      if (localFocusBackground) {
        localFocusBackground = await JSON.parse(localFocusBackground)
        setFocusBackground(localFocusBackground ?? "bg-background")
      }

      let localBreakBackground = localStorage.getItem("breakBackground")
      if (localBreakBackground) {
        localBreakBackground = await JSON.parse(localBreakBackground)
        setBreakBackground(localBreakBackground ?? "bg-background")
      }

      let localLongBreakBackground = localStorage.getItem("longBreakBackground")
      if (localLongBreakBackground) {
        localLongBreakBackground = await JSON.parse(localLongBreakBackground)
        setLongBreakBackground(localLongBreakBackground ?? "bg-background")
      }
    }

    getLocalStorageValues()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        currentTimer,
        focusPeriod,
        breakPeriod,
        longBreakPeriod,
        rounds,
        background,
        focusBackground,
        breakBackground,
        longBreakBackground,
        currentInterval,
        currentTimerRunningOn,
        currentRound,
        timerIsRunning,
        setFocusPeriod,
        setBreakPeriod,
        setLongBreakPeriod,
        setRounds,
        setFocusBackground,
        setBreakBackground,
        setLongBreakBackground,
        updateBackground,
        restartPomodoro,
        pausePomodoro,
        startPomodoro,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  const context = useContext(GlobalContext)
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider")
  return context
}
