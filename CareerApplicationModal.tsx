/**
 * CareerApplicationModal — Sure-Fix Remodeling
 * On-site candidate application form (replaces the old mailto flow on the Careers page).
 * Matches the site design system: white gradient card, French Blue / Brown Red accents,
 * Figtree display + Georgia body. Submits to /api/candidate-application.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X, CheckCircle2, Send } from 'lucide-react'

const BLUE = '#394696'
const RED = '#983631'
const SANS = '"Figtree", system-ui, sans-serif'

export const GENERAL_APPLICATION = 'General Application'

interface CareerApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  /** Open role titles to populate the position dropdown. */
  positions: string[]
  /** Pre-selected position; defaults to General Application when omitted. */
  initialPosition?: string
}

type FormState = {
  fullName: string
  email: string
  phone: string
  location: string
  positionAppliedFor: string
  tradeOrDepartmentInterest: string
  yearsOfExperience: string
  skills: string
  certificationsOrLicenses: string
  resumeUrl: string
  portfolioUrl: string
  linkedinUrl: string
  availabilityOrStartDate: string
  workAuthorization: string
  reliableTransportation: string
  additionalNotes: string
  consent: boolean
}

const EMPTY_FORM: FormState = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  positionAppliedFor: GENERAL_APPLICATION,
  tradeOrDepartmentInterest: '',
  yearsOfExperience: '',
  skills: '',
  certificationsOrLicenses: '',
  resumeUrl: '',
  portfolioUrl: '',
  linkedinUrl: '',
  availabilityOrStartDate: '',
  workAuthorization: '',
  reliableTransportation: '',
  additionalNotes: '',
  consent: false,
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-[#394696] focus:outline-none'

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-bold text-slate-700" style={{ fontFamily: SANS }}>
        {label} {required && <span style={{ color: RED }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center px-6 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: 'rgba(57,70,150,0.2)', border: `2px solid ${BLUE}` }}
      >
        <CheckCircle2 size={40} style={{ color: BLUE }} />
      </motion.div>
      <h2 className="mb-3 text-2xl font-black text-slate-900" style={{ fontFamily: SANS }}>
        Application Received
      </h2>
      <p className="max-w-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
        Thank you for applying. Our team has received your application and will review your experience.
        If there&apos;s a fit, we&apos;ll reach out with next steps.
      </p>
      <button
        onClick={onClose}
        className="mt-7 rounded-xl px-8 py-3 text-sm font-black uppercase tracking-wider text-white"
        style={{ background: BLUE, fontFamily: SANS }}
      >
        Close
      </button>
    </motion.div>
  )
}

export default function CareerApplicationModal({
  isOpen,
  onClose,
  positions,
  initialPosition,
}: CareerApplicationModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Reset whenever opened, applying any pre-selected role.
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY_FORM, positionAppliedFor: initialPosition || GENERAL_APPLICATION })
      setHoneypot('')
      setSubmitting(false)
      setSubmitted(false)
      setError('')
    }
  }, [isOpen, initialPosition])

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const canSubmit =
    !!form.fullName.trim() &&
    !!form.email.trim() &&
    !!form.phone.trim() &&
    !!form.positionAppliedFor &&
    form.consent

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting || !canSubmit) return
    setSubmitting(true)
    setError('')

    const isGeneralApplication = form.positionAppliedFor === GENERAL_APPLICATION

    try {
      const res = await fetch('/api/candidate-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          isGeneralApplication,
          sourcePage: isGeneralApplication ? 'careers-page-general' : 'careers-page-role',
          company: honeypot,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'We could not submit your application. Please email us at info@surefixremodeling.net.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const positionOptions = Array.from(new Set([...positions, GENERAL_APPLICATION]))
  // Ensure a pre-selected role that isn't in the list still appears.
  if (form.positionAppliedFor && !positionOptions.includes(form.positionAppliedFor)) {
    positionOptions.unshift(form.positionAppliedFor)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

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
              role="dialog"
              aria-modal="true"
              aria-label="Career application form"
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(57,70,150,0.25)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(57,70,150,0.1)',
                pointerEvents: 'auto',
                maxHeight: '92vh',
                overflowY: 'auto',
              }}
            >
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${BLUE}, ${RED})` }} />

              {/* Header */}
              <div className="flex items-start justify-between px-6 pb-2 pt-6 sm:px-8">
                <div>
                  <div className="mb-0.5 text-xs font-bold uppercase tracking-widest" style={{ color: BLUE }}>
                    Join the Team
                  </div>
                  {!submitted && (
                    <h2 className="text-xl font-black text-slate-900 sm:text-2xl" style={{ fontFamily: SANS }}>
                      Apply to Sure-Fix Remodeling
                    </h2>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={16} />
                </button>
              </div>

              {submitted ? (
                <SuccessView onClose={onClose} />
              ) : (
                <form onSubmit={handleSubmit} className="px-6 pb-7 pt-3 sm:px-8">
                  <p className="mb-5 text-sm text-slate-500" style={{ fontFamily: 'Georgia, serif' }}>
                    Tell us about yourself. Fields marked <span style={{ color: RED }}>*</span> are required —
                    everything else helps us get to know you faster.
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Full Name" htmlFor="ca-fullName" required>
                      <input id="ca-fullName" className={inputClass} value={form.fullName}
                        onChange={e => set('fullName', e.target.value)} autoComplete="name" required />
                    </Field>
                    <Field label="Email" htmlFor="ca-email" required>
                      <input id="ca-email" type="email" className={inputClass} value={form.email}
                        onChange={e => set('email', e.target.value)} autoComplete="email" required />
                    </Field>
                    <Field label="Phone" htmlFor="ca-phone" required>
                      <input id="ca-phone" type="tel" className={inputClass} value={form.phone}
                        onChange={e => set('phone', e.target.value)} autoComplete="tel" required />
                    </Field>
                    <Field label="Location (City/Town)" htmlFor="ca-location">
                      <input id="ca-location" className={inputClass} value={form.location}
                        onChange={e => set('location', e.target.value)} autoComplete="address-level2" />
                    </Field>

                    <Field label="Position Applied For" htmlFor="ca-position" required>
                      <select id="ca-position" className={inputClass} value={form.positionAppliedFor}
                        onChange={e => set('positionAppliedFor', e.target.value)} required>
                        {positionOptions.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Trade / Department Interest" htmlFor="ca-trade">
                      <input id="ca-trade" className={inputClass} value={form.tradeOrDepartmentInterest}
                        onChange={e => set('tradeOrDepartmentInterest', e.target.value)}
                        placeholder="e.g. Carpentry, Tile, Sales" />
                    </Field>

                    <Field label="Years of Experience" htmlFor="ca-years">
                      <input id="ca-years" className={inputClass} value={form.yearsOfExperience}
                        onChange={e => set('yearsOfExperience', e.target.value)} placeholder="e.g. 5" />
                    </Field>
                    <Field label="Availability / Start Date" htmlFor="ca-availability">
                      <input id="ca-availability" className={inputClass} value={form.availabilityOrStartDate}
                        onChange={e => set('availabilityOrStartDate', e.target.value)}
                        placeholder="e.g. Immediately, 2 weeks" />
                    </Field>

                    <Field label="Authorized to Work in the US" htmlFor="ca-auth">
                      <select id="ca-auth" className={inputClass} value={form.workAuthorization}
                        onChange={e => set('workAuthorization', e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </Field>
                    <Field label="Reliable Transportation" htmlFor="ca-transport">
                      <select id="ca-transport" className={inputClass} value={form.reliableTransportation}
                        onChange={e => set('reliableTransportation', e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </Field>
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    <Field label="Skills" htmlFor="ca-skills">
                      <textarea id="ca-skills" rows={2} className={inputClass} value={form.skills}
                        onChange={e => set('skills', e.target.value)}
                        placeholder="Briefly list your relevant skills." />
                    </Field>
                    <Field label="Certifications / Licenses" htmlFor="ca-certs">
                      <textarea id="ca-certs" rows={2} className={inputClass} value={form.certificationsOrLicenses}
                        onChange={e => set('certificationsOrLicenses', e.target.value)}
                        placeholder="e.g. EPA Lead-Safe, Driver's License" />
                    </Field>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Field label="Resume URL" htmlFor="ca-resume">
                      <input id="ca-resume" type="url" className={inputClass} value={form.resumeUrl}
                        onChange={e => set('resumeUrl', e.target.value)} placeholder="https://…" />
                    </Field>
                    <Field label="Portfolio URL" htmlFor="ca-portfolio">
                      <input id="ca-portfolio" type="url" className={inputClass} value={form.portfolioUrl}
                        onChange={e => set('portfolioUrl', e.target.value)} placeholder="https://…" />
                    </Field>
                    <Field label="LinkedIn URL" htmlFor="ca-linkedin">
                      <input id="ca-linkedin" type="url" className={inputClass} value={form.linkedinUrl}
                        onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://…" />
                    </Field>
                  </div>
                  {/* TODO: add direct resume file upload once asset-upload infrastructure exists. */}

                  <div className="mt-4">
                    <Field label="Additional Notes" htmlFor="ca-notes">
                      <textarea id="ca-notes" rows={3} className={inputClass} value={form.additionalNotes}
                        onChange={e => set('additionalNotes', e.target.value)}
                        placeholder="Anything else you'd like us to know." />
                    </Field>
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={honeypot} onChange={e => setHoneypot(e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />

                  {/* Consent */}
                  <label className="mt-5 flex items-start gap-3 text-sm text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={e => set('consent', e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#394696]"
                      required
                    />
                    <span>
                      I confirm the information provided is accurate and authorize Sure-Fix Remodeling to
                      contact me regarding my application. <span style={{ color: RED }}>*</span>
                    </span>
                  </label>

                  {error && (
                    <p role="alert" className="mt-4 text-sm font-semibold" style={{ color: RED, fontFamily: SANS }}>
                      {error}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
                      style={{ fontFamily: SANS }}
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      whileHover={canSubmit && !submitting ? { scale: 1.03 } : {}}
                      whileTap={canSubmit && !submitting ? { scale: 0.97 } : {}}
                      className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-black uppercase tracking-wider transition-all duration-200"
                      style={{
                        background: canSubmit && !submitting ? RED : 'rgba(15,23,42,0.08)',
                        color: canSubmit && !submitting ? '#fff' : 'rgba(15,23,42,0.35)',
                        cursor: canSubmit && !submitting ? 'pointer' : 'not-allowed',
                        fontFamily: SANS,
                      }}
                    >
                      <Send size={14} /> {submitting ? 'Submitting…' : 'Submit Application'}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
