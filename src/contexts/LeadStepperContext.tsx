/**
 * LeadStepperContext — Sure-Fix Remodeling
 * Global context to open/close the qualifying lead stepper modal from any CTA.
 * Usage: const { openStepper } = useLeadStepper()
 *        openStepper()  ← call from any button
 */
import { createContext, useContext, useState, ReactNode } from 'react'

interface LeadStepperContextValue {
  isOpen: boolean
  openStepper: (preselectedService?: string) => void
  closeStepper: () => void
  preselectedService: string
}

const LeadStepperContext = createContext<LeadStepperContextValue>({
  isOpen: false,
  openStepper: () => {},
  closeStepper: () => {},
  preselectedService: '',
})

export function LeadStepperProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')

  const openStepper = (service = '') => {
    setPreselectedService(service)
    setIsOpen(true)
  }
  const closeStepper = () => setIsOpen(false)

  return (
    <LeadStepperContext.Provider value={{ isOpen, openStepper, closeStepper, preselectedService }}>
      {children}
    </LeadStepperContext.Provider>
  )
}

export function useLeadStepper() {
  return useContext(LeadStepperContext)
}
