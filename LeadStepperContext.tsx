/**
 * LeadStepperContext — Sure-Fix Remodeling
 * Global context to open/close the qualifying lead stepper modal from any CTA.
 * Usage: const { openStepper } = useLeadStepper()
 *        openStepper()  ← call from any button
 */
import { createContext, useCallback, useContext, useState, ReactNode } from 'react'
import { trackLeadStepperOpen } from '@/lib/analytics'

export type LeadStepperFlow = 'general' | 'kitchen-promo'

interface LeadStepperContextValue {
  isOpen: boolean
  openStepper: (preselectedService?: string) => void
  openKitchenPromoStepper: (source?: string) => void
  closeStepper: () => void
  preselectedService: string
  flow: LeadStepperFlow
  source: string
}

const LeadStepperContext = createContext<LeadStepperContextValue>({
  isOpen: false,
  openStepper: () => {},
  openKitchenPromoStepper: () => {},
  closeStepper: () => {},
  preselectedService: '',
  flow: 'general',
  source: '',
})

export function LeadStepperProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [flow, setFlow] = useState<LeadStepperFlow>('general')
  const [source, setSource] = useState('')

  const openStepper = useCallback((service = '') => {
    setFlow('general')
    setSource('')
    setPreselectedService(service)
    setIsOpen(true)
    trackLeadStepperOpen(service)
  }, [])
  const openKitchenPromoStepper = useCallback((ctaSource = 'kitchen-promotion') => {
    setFlow('kitchen-promo')
    setSource(ctaSource)
    setPreselectedService('kitchen')
    setIsOpen(true)
    trackLeadStepperOpen(`kitchen-promo:${ctaSource}`)
  }, [])
  const closeStepper = useCallback(() => setIsOpen(false), [])

  return (
    <LeadStepperContext.Provider
      value={{
        isOpen,
        openStepper,
        openKitchenPromoStepper,
        closeStepper,
        preselectedService,
        flow,
        source,
      }}
    >
      {children}
    </LeadStepperContext.Provider>
  )
}

export function useLeadStepper() {
  return useContext(LeadStepperContext)
}
