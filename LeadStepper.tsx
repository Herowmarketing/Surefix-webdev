/**
 * LeadStepper — Sure-Fix Remodeling
 * Design: Modern Futuristic Craftsman — dark navy modal, French Blue accents, Brown Red CTAs
 * 4-step qualifying questionnaire:
 *   Step 1 — Project type (service selection)
 *   Step 2 — Timeline
 *   Step 3 — Project details (scope + preferred contact method)
 *   Step 4 — Contact info (name, phone, email, address, zip)
 * Framer Motion: slide transitions between steps, spring modal entrance, AnimatePresence
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, ArrowRight, ArrowLeft, CheckCircle2, Phone, Mail, MapPin, User, Home } from 'lucide-react'
import { useLeadStepper } from '@/contexts/LeadStepperContext'
import { buildEnhancedConversionUserData, getAttributionPayload, trackLeadSubmission } from '@/lib/analytics'
import { BUSINESS } from '@/lib/constants'
import {
  KITCHEN_PROMOTION,
  getKitchenPromotion,
  kitchenPromotionDetails,
} from '@/lib/kitchen-promotion'

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 'kitchen',   label: 'Kitchen',        icon: '🍳', desc: 'Full remodels, cabinets, countertops' },
  { id: 'bathroom',  label: 'Bathroom',        icon: '🚿', desc: 'Tile, vanities, walk-in showers' },
  { id: 'basement',  label: 'Basement',        icon: '🏠', desc: 'Finishing, bars, home offices' },
  { id: 'exterior',  label: 'Exterior',        icon: '🏡', desc: 'Siding, roofing, windows, doors' },
  { id: 'additions', label: 'Home Addition',   icon: '🔨', desc: 'Room additions, sunrooms, garages' },
  { id: 'flooring',  label: 'Flooring',        icon: '🪵', desc: 'Hardwood, tile, LVP, carpet' },
  { id: 'design',    label: 'Interior Design', icon: '🎨', desc: 'Color, finishes, full design service' },
  { id: 'multiple',  label: 'Multiple Rooms',  icon: '✨', desc: 'Whole-home or multi-room project' },
]

const TIMELINES = [
  { id: 'asap',    label: 'ASAP',              sub: 'Ready to start immediately' },
  { id: '1-3mo',   label: '1–3 Months',        sub: 'Planning stage, ready soon' },
  { id: '3-6mo',   label: '3–6 Months',        sub: 'Still in early planning' },
  { id: 'flexible',label: 'Flexible',          sub: 'No fixed timeline yet' },
]

const CONTACT_METHODS = [
  { id: 'call',  label: 'Call' },
  { id: 'text',  label: 'Text' },
  { id: 'email', label: 'Email' },
]

const KITCHEN_SCOPES = [
  { id: 'full-remodel', label: 'Full Kitchen Remodel', desc: 'Layout, cabinets, counters, fixtures & finishes' },
  { id: 'cabinets-counters', label: 'Cabinets & Countertops', desc: 'Upgrade the biggest visual and functional elements' },
  { id: 'layout-island', label: 'Layout or Island', desc: 'Improve flow, storage, seating, and prep space' },
  { id: 'accessible-kitchen', label: 'Accessible Kitchen', desc: 'Comfortable, barrier-free, aging-in-place design' },
  { id: 'not-sure', label: 'Help Me Plan', desc: 'I have ideas and want expert recommendations' },
]

const KITCHEN_PRIORITIES = [
  'Custom cabinetry',
  'Countertops',
  'Storage',
  'New layout',
  'Kitchen island',
  'Lighting',
  'Flooring',
  'Accessibility',
]


// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: i < step ? '#394696' : 'transparent' }}
            initial={false}
            animate={{ width: i < step ? '100%' : '0%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      ))}
      <span className="text-xs text-slate-500 font-semibold ml-1 whitespace-nowrap">
        {step} / {total}
      </span>
    </div>
  )
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? 'rgba(57,70,150,0.25)' : 'rgba(255,255,255,0.04)',
        borderColor: selected ? '#394696' : 'rgba(255,255,255,0.1)',
        boxShadow: selected ? '0 0 0 1px #394696' : 'none',
      }}
    >
      {children}
    </motion.button>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>
        What are you looking to renovate?
      </h2>
      <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
        Select the project type that best fits your needs.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {SERVICES.map(s => (
          <OptionCard key={s.id} selected={value === s.id} onClick={() => onChange(s.id)}>
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none">{s.icon}</span>
              <div>
                <div className="text-sm font-bold text-slate-900">{s.label}</div>
                <div className="text-xs text-slate-500 leading-tight">{s.desc}</div>
              </div>
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  )
}

function KitchenStep1({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>
        What kind of kitchen transformation are you planning?
      </h2>
      <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
        Choose the closest fit. Your 10% savings (up to $2,000) will be noted with your request.
      </p>
      <div className="flex flex-col gap-3">
        {KITCHEN_SCOPES.map(scope => (
          <OptionCard key={scope.id} selected={value === scope.id} onClick={() => onChange(scope.id)}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-slate-900">{scope.label}</div>
                <div className="text-xs text-slate-500">{scope.desc}</div>
              </div>
              {value === scope.id ? <CheckCircle2 size={18} className="shrink-0 text-[#394696]" /> : null}
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  )
}

function Step2({
  timeline,
  onTimeline,
}: {
  timeline: string
  onTimeline: (v: string) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>
        When are you hoping to start?
      </h2>
      <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
        This helps us schedule your free estimate at the right time.
      </p>
      <div className="flex flex-col gap-3">
        {TIMELINES.map(t => (
          <OptionCard key={t.id} selected={timeline === t.id} onClick={() => onTimeline(t.id)}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">{t.label}</div>
                <div className="text-xs text-slate-500">{t.sub}</div>
              </div>
              {timeline === t.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <CheckCircle2 size={18} className="text-[#394696]" />
                </motion.div>
              )}
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  )
}


function Step3({
  details, contactMethod,
  onDetails, onContactMethod,
  kitchenMode = false,
  priorities = [],
  onPriorities = () => {},
}: {
  details: string; contactMethod: string
  onDetails: (v: string) => void
  onContactMethod: (v: string) => void
  kitchenMode?: boolean
  priorities?: string[]
  onPriorities?: (v: string[]) => void
}) {
  const togglePriority = (priority: string) => {
    onPriorities(
      priorities.includes(priority)
        ? priorities.filter(item => item !== priority)
        : [...priorities, priority],
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>
        {kitchenMode ? 'What matters most in your new kitchen?' : 'Tell us about your project'}
      </h2>
      <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
        {kitchenMode
          ? 'Choose your priorities, then tell us what you want to change.'
          : 'A few details help us prepare an accurate estimate before we reach out.'}
      </p>
      <div className="flex flex-col gap-5">
        {kitchenMode ? (
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
              Kitchen priorities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {KITCHEN_PRIORITIES.map(priority => (
                <OptionCard
                  key={priority}
                  selected={priorities.includes(priority)}
                  onClick={() => togglePriority(priority)}
                >
                  <div className="text-center text-xs font-bold text-slate-900">{priority}</div>
                </OptionCard>
              ))}
            </div>
          </div>
        ) : null}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
            Project details *
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 bg-white border border-slate-200 focus:outline-none focus:border-[#394696] transition-all duration-200 resize-none"
            placeholder={
              kitchenMode
                ? 'Tell us about your current kitchen, must-haves, layout challenges, and the look you want.'
                : 'What are you hoping to accomplish? Include the room(s), approximate size, must-haves, and anything else that helps us understand the scope.'
            }
            rows={5}
            value={details}
            onChange={e => onDetails(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
            Preferred contact method
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CONTACT_METHODS.map(m => (
              <OptionCard
                key={m.id}
                selected={contactMethod === m.id}
                onClick={() => onContactMethod(m.id)}
              >
                <div className="text-center text-sm font-bold text-slate-900">{m.label}</div>
              </OptionCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Step4({
  name, phone, email, address, zip,
  onChange, kitchenMode = false,
}: {
  name: string; phone: string; email: string; address: string; zip: string
  onChange: (field: string, value: string) => void
  kitchenMode?: boolean
}) {
  const inputClass = `
    w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 bg-white border border-slate-200
    bg-white/5 border border-slate-200
    focus:outline-none focus:border-[#394696] focus:bg-white/8
    transition-all duration-200
  `
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Figtree, sans-serif' }}>
        Almost there — how do we reach you?
      </h2>
      <p className="text-sm text-slate-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
        We'll reach out within 24 hours to schedule your free, no-obligation estimate.
      </p>
      {kitchenMode ? (
        <div className="mb-5 rounded-xl border border-[#983631]/25 bg-[#983631]/5 px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#983631]">
            Kitchen sale attached
          </p>
          <p className="mt-1 text-sm font-black text-slate-900">{KITCHEN_PROMOTION.headline}</p>
          <p className="text-xs text-slate-600">{KITCHEN_PROMOTION.promise}</p>
        </div>
      ) : null}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="Full Name *"
            value={name}
            onChange={e => onChange('name', e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="relative">
          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="Phone Number *"
            value={phone}
            onChange={e => onChange('phone', e.target.value)}
            type="tel"
            autoComplete="tel"
          />
        </div>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="Email Address *"
            value={email}
            onChange={e => onChange('email', e.target.value)}
            type="email"
            autoComplete="email"
          />
        </div>
        <div className="relative">
          <Home size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="Project Street Address *"
            value={address}
            onChange={e => onChange('address', e.target.value)}
            autoComplete="street-address"
          />
        </div>
        <div className="relative">
          <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="ZIP Code *"
            value={zip}
            onChange={e => onChange('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={5}
          />
        </div>
        {zip && !ZIP_RE.test(zip.trim()) ? (
          <p className="-mt-2 text-xs font-semibold text-[#983631]">
            Please enter a 5-digit ZIP code.
          </p>
        ) : null}
        <p className="text-xs text-slate-400 leading-relaxed">
          By submitting you agree to be contacted by Sure-Fix Remodeling. We never share your info.
        </p>
      </div>
    </div>
  )
}

function StepSuccess({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'rgba(57,70,150,0.2)', border: '2px solid #394696' }}
      >
        <CheckCircle2 size={40} className="text-[#394696]" />
      </motion.div>
      <h2 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>
        {name ? `Thanks, ${name.split(' ')[0]}!` : 'Request Received!'}
      </h2>
      <p className="text-slate-600 leading-relaxed max-w-sm" style={{ fontFamily: 'Georgia, serif' }}>
        Your project inquiry has been received. A member of our team will review your information and
        reach out within <strong className="text-slate-900">24 hours</strong> to discuss next steps.
      </p>
      <div
        className="mt-6 px-5 py-3 rounded-xl text-sm font-bold text-slate-500"
        style={{ background: '#f8fafc', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        📞{' '}
        <a href={BUSINESS.phoneHref} className="font-bold text-[#394696] hover:underline">
          {BUSINESS.phone}
        </a>{' '}
        · Mon–Fri 8AM–7PM · Sat 8AM–4PM · Sun Closed
      </div>
    </motion.div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4

const ZIP_RE = /^\d{5}$/

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.32 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.22 },
  }),
}

export default function LeadStepper() {
  const { isOpen, closeStepper, preselectedService, flow, source } = useLeadStepper()
  const kitchenMode = flow === 'kitchen-promo'

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Step 1
  const [service, setService] = useState('')
  const [kitchenScope, setKitchenScope] = useState('')
  // Step 2
  const [timeline, setTimeline] = useState('')
  // Step 3
  const [details, setDetails] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [kitchenPriorities, setKitchenPriorities] = useState<string[]>([])
  // Step 4
  const [contact, setContact] = useState({ name: '', phone: '', email: '', address: '', zip: '' })
  // Spam honeypot — hidden from real users; only bots fill it.
  const [honeypot, setHoneypot] = useState('')

  // Pre-select service when opened from a service-specific CTA
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setDirection(1)
      setSubmitted(false)
      setSubmitting(false)
      setError('')
      setHoneypot('')
      if (preselectedService) setService(preselectedService)
      else setService('')
      setKitchenScope('')
      setTimeline('')
      setDetails('')
      setContactMethod('')
      setKitchenPriorities([])
      setContact({ name: '', phone: '', email: '', address: '', zip: '' })
    }
  }, [isOpen, preselectedService, flow])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeStepper()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeStepper])

  const canAdvance = () => {
    if (step === 1) return kitchenMode ? !!kitchenScope : !!service
    if (step === 2) return !!timeline
    if (step === 3) return details.trim().length > 0
    if (step === 4)
      return !!(
        contact.name &&
        contact.phone &&
        contact.email &&
        contact.address.trim() &&
        ZIP_RE.test(contact.zip.trim())
      )
    return false
  }

  const stepFourMissingRequired =
    step === 4 &&
    (!contact.name.trim() ||
      !contact.phone.trim() ||
      !contact.email.trim() ||
      !contact.address.trim() ||
      !ZIP_RE.test(contact.zip.trim()))

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep(s => s + 1)
    } else {
      handleSubmit()
    }
  }

  const goBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep(s => s - 1)
    }
  }

  const handleSubmit = async () => {
    if (submitting) return // prevent duplicate submissions
    setSubmitting(true)
    setError('')

    const serviceLabel = SERVICES.find(s => s.id === service)?.label || service
    const timelineLabel = TIMELINES.find(t => t.id === timeline)?.label || timeline
    const contactMethodLabel =
      CONTACT_METHODS.find(m => m.id === contactMethod)?.label || ''
    const zip = contact.zip.replace(/\D/g, '').slice(0, 5)
    const projectAddress = [contact.address.trim(), zip]
      .filter(Boolean)
      .join(', ')
    const attribution = getAttributionPayload()
    const promotion = getKitchenPromotion()
    const kitchenScopeLabel =
      KITCHEN_SCOPES.find(scope => scope.id === kitchenScope)?.label || kitchenScope
    const submittedDetails = kitchenMode
      ? [
          `Promotion: ${kitchenPromotionDetails(promotion)}`,
          `Kitchen scope: ${kitchenScopeLabel}`,
          `Priorities: ${kitchenPriorities.length ? kitchenPriorities.join(', ') : 'Not specified'}`,
          `Project notes: ${details}`,
        ].join('\n')
      : details

    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          projectAddress,
          projectType: kitchenMode ? 'Kitchen Promotion — 10% Off' : serviceLabel,
          timeline: timelineLabel,
          projectDetails: submittedDetails,
          preferredContactMethod: contactMethodLabel,
          sourcePage: kitchenMode ? 'kitchen-promo-stepper' : 'purchase-inquiry-stepper',
          company: honeypot,
          rawServiceId: service,
          rawTimelineId: timeline,
          kitchenScope: kitchenMode ? kitchenScope : undefined,
          kitchenPriorities: kitchenMode ? kitchenPriorities : undefined,
          promotionId: kitchenMode ? KITCHEN_PROMOTION.id : undefined,
          promotionMonth: kitchenMode ? promotion.month : undefined,
          promotionDeadline: kitchenMode ? promotion.validThrough : undefined,
          ctaSource: kitchenMode ? source : undefined,
          attribution,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }
      trackLeadSubmission({
        projectType: kitchenMode ? 'Kitchen Promotion — 10% Off' : serviceLabel,
        timeline: timelineLabel,
        userData: buildEnhancedConversionUserData({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          zip,
        }),
      })
      window.location.assign(
        kitchenMode
          ? '/thank-you?source=kitchen-promo-stepper'
          : '/thank-you?source=lead-stepper',
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'We could not submit your request. Please call us at (610) 392-0990.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const stepLabel = (
    kitchenMode
      ? ['Kitchen Scope', 'Timeline', 'Kitchen Priorities', 'Claim Savings']
      : ['Project Type', 'Timeline', 'Project Details', 'Your Info']
  )[step - 1]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={closeStepper}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(57,70,150,0.25)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(57,70,150,0.1)',
                pointerEvents: 'auto',
                maxHeight: '92vh',
                overflowY: 'auto',
              }}
            >
              {/* Top accent line */}
              <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #394696, #983631)' }} />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#394696] mb-0.5">
                    {kitchenMode ? 'Kitchen Sale Consultation' : 'Free Estimate'}
                  </div>
                  {!submitted && (
                    <div className="text-xs text-slate-400 font-medium">
                      Step {step} of {TOTAL_STEPS} — {stepLabel}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={closeStepper}
                  aria-label="Close estimate form"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Progress */}
              {!submitted && (
                <div className="px-6 pt-2">
                  <ProgressBar step={step} total={TOTAL_STEPS} />
                </div>
              )}

              {/* Step content */}
              <div className="px-6 pb-6 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  {submitted ? (
                    <StepSuccess key="success" name={contact.name} />
                  ) : (
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {step === 1 && (
                        kitchenMode
                          ? <KitchenStep1 value={kitchenScope} onChange={setKitchenScope} />
                          : <Step1 value={service} onChange={setService} />
                      )}
                      {step === 2 && (
                        <Step2 timeline={timeline} onTimeline={setTimeline} />
                      )}
                      {step === 3 && (
                        <Step3
                          details={details}
                          contactMethod={contactMethod}
                          onDetails={setDetails}
                          onContactMethod={setContactMethod}
                          kitchenMode={kitchenMode}
                          priorities={kitchenPriorities}
                          onPriorities={setKitchenPriorities}
                        />
                      )}
                      {step === 4 && (
                        <Step4
                          name={contact.name}
                          phone={contact.phone}
                          email={contact.email}
                          address={contact.address}
                          zip={contact.zip}
                          kitchenMode={kitchenMode}
                          onChange={(field, value) =>
                            setContact(prev => ({ ...prev, [field]: value }))
                          }
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Honeypot — visually hidden, off-screen; ignored by humans */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                {/* Error message — only on submit failure */}
                {!submitted && error && (
                  <p
                    role="alert"
                    className="mt-4 text-sm font-semibold"
                    style={{ color: '#983631', fontFamily: 'Figtree, sans-serif' }}
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Footer nav */}
              {!submitted && (
                <div
                  className="flex items-center justify-between px-6 py-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <button
                    onClick={goBack}
                    disabled={step === 1}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 disabled:opacity-0 disabled:pointer-events-none transition-all"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>

                  <motion.button
                    onClick={goNext}
                    disabled={!canAdvance() || submitting}
                    whileHover={canAdvance() && !submitting ? { scale: 1.03 } : {}}
                    whileTap={canAdvance() && !submitting ? { scale: 0.97 } : {}}
                    aria-disabled={!canAdvance() || submitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-200"
                    style={{
                      background: canAdvance() && !submitting ? '#983631' : 'rgba(255,255,255,0.08)',
                      color: canAdvance() && !submitting ? '#fff' : '#64748b',
                      cursor: canAdvance() && !submitting ? 'pointer' : 'not-allowed',
                      fontFamily: 'Figtree, sans-serif',
                    }}
                  >
                    {step === TOTAL_STEPS
                      ? submitting
                        ? 'Submitting…'
                        : kitchenMode
                          ? 'Claim My Kitchen Savings'
                          : 'Submit Request'
                      : 'Continue'}
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              )}

              {stepFourMissingRequired && !submitting ? (
                <p className="px-6 pb-4 text-right text-xs font-semibold text-slate-500">
                  Fill out all required fields, including a 5-digit ZIP code, to submit.
                </p>
              ) : null}

              {submitted && (
                <div className="px-6 pb-6 flex justify-center">
                  <motion.button
                    onClick={closeStepper}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-xl text-sm font-black text-slate-900 uppercase tracking-wider"
                    style={{ background: '#394696', fontFamily: 'Figtree, sans-serif' }}
                  >
                    Close
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
