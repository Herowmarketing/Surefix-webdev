import { ReactNode, createContext, useContext, useState } from 'react'

interface TooltipProviderProps {
  children: ReactNode
  delayDuration?: number
}

const TooltipContext = createContext<{ delayDuration: number }>({ delayDuration: 400 })

export function TooltipProvider({ children, delayDuration = 400 }: TooltipProviderProps) {
  return (
    <TooltipContext.Provider value={{ delayDuration }}>
      {children}
    </TooltipContext.Provider>
  )
}

export function useTooltip() {
  return useContext(TooltipContext)
}
