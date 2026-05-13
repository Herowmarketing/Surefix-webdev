/**
 * CtaButton — Sure-Fix Remodeling
 * Drop-in replacement for any CTA that should open the LeadStepper modal.
 * Usage:
 *   <CtaButton>Get Free Estimate</CtaButton>
 *   <CtaButton variant="outline" service="kitchen">Start Kitchen Project</CtaButton>
 */
import { motion } from 'framer-motion'
import { useLeadStepper } from '@/contexts/LeadStepperContext'
import { ReactNode } from 'react'

interface CtaButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  service?: string
  className?: string
  fullWidth?: boolean
}

export default function CtaButton({
  children,
  variant = 'primary',
  size = 'md',
  service = '',
  className = '',
  fullWidth = false,
}: CtaButtonProps) {
  const { openStepper } = useLeadStepper()

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size]

  const baseStyle: React.CSSProperties = {
    fontFamily: 'Figtree, sans-serif',
    fontWeight: 900,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : undefined,
  }

  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: '#983631', color: '#fff', boxShadow: '0 4px 24px rgba(152,54,49,0.35)' }
      : variant === 'outline'
      ? { background: 'rgba(255,255,255,0.06)', color: '#fff', border: '2px solid rgba(255,255,255,0.2)' }
      : { background: 'transparent', color: 'rgba(255,255,255,0.7)' }

  return (
    <motion.button
      type="button"
      onClick={() => openStepper(service)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${sizeClasses} ${className}`}
      style={{ ...baseStyle, ...variantStyle }}
    >
      {children}
    </motion.button>
  )
}
