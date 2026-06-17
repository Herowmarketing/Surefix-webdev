/**
 * LeadStepper — Sure-Fix Remodeling
 * Design: Modern Futuristic Craftsman — dark navy modal, French Blue accents, Brown Red CTAs
 * 4-step qualifying questionnaire:
 *   Step 1 — Project type (service selection)
 *   Step 2 — Project scope & timeline
 *   Step 3 — Budget range
 *   Step 4 — Contact info (name, phone, email, zip)
 * Framer Motion: slide transitions between steps, spring modal entrance, AnimatePresence
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, ArrowRight, ArrowLeft, CheckCircle2, Phone, Mail, MapPin, User } from 'lucide-react'
import { useLeadStepper } from '@/contexts/LeadStepperContext'
import { trackLeadSubmission } from '@/lib/analytics'

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


function Step4({
  name, phone, email, zip,
  onChange,
}: {
  name: string; phone: string; email: string; zip: string
  onChange: (field: string, value: string) => void
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
          <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={inputClass + ' pl-10'}
            placeholder="ZIP Code"
            value={zip}
            onChange={e => onChange('zip', e.target.value)}
            autoComplete="postal-code"
            maxLength={5}
          />
        </div>
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
        📞 (610) 392-0990 · Mon–Fri 8AM–7PM
      </div>
    </motion.div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 3

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
  const { isOpen, closeStepper, preselectedService } = useLeadStepper()

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Step 1
  const [service, setService] = useState('')
  // Step 2
  const [timeline, setTimeline] = useState('')
  // Step 3
  const [contact, setContact] = useState({ name: '', phone: '', email: '', zip: '' })
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
      setTimeline('')
      setContact({ name: '', phone: '', email: '', zip: '' })
    }
  }, [isOpen, preselectedService])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const canAdvance = () => {
    if (step === 1) return !!service
    if (step === 2) return !!timeline
    if (step === 3) return !!(contact.name && contact.phone && contact.email)
    return false
  }

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

    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          projectAddress: contact.zip,
          projectType: serviceLabel,
          timeline: timelineLabel,
          sourcePage: 'purchase-inquiry-stepper',
          company: honeypot,
          rawServiceId: service,
          rawTimelineId: timeline,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }
      trackLeadSubmission({ projectType: serviceLabel, timeline: timelineLabel })
      window.location.assign('/thank-you?source=lead-stepper')
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

  const stepLabel = ['Project Type', 'Timeline', 'Your Info'][step - 1]

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
                    Free Estimate
                  </div>
                  {!submitted && (
                    <div className="text-xs text-slate-400 font-medium">
                      Step {step} of {TOTAL_STEPS} — {stepLabel}
                    </div>
                  )}
                </div>
                <button
                  onClick={closeStepper}
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
                        <Step1 value={service} onChange={setService} />
                      )}
                      {step === 2 && (
                        <Step2 timeline={timeline} onTimeline={setTimeline} />
                      )}
                      {step === 3 && (
                        <Step4
                          name={contact.name}
                          phone={contact.phone}
                          email={contact.email}
                          zip={contact.zip}
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
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-slate-900 uppercase tracking-wider transition-all duration-200"
                    style={{
                      background: canAdvance() && !submitting ? '#983631' : 'rgba(255,255,255,0.08)',
                      color: canAdvance() && !submitting ? '#fff' : 'rgba(255,255,255,0.3)',
                      cursor: canAdvance() && !submitting ? 'pointer' : 'not-allowed',
                      fontFamily: 'Figtree, sans-serif',
                    }}
                  >
                    {step === TOTAL_STEPS
                      ? submitting
                        ? 'Submitting…'
                        : 'Submit Request'
                      : 'Continue'}
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              )}

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
