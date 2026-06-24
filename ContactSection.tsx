/*
 * CONTACT SECTION — Sure-Fix Remodeling
 * Design: Dark bg split layout — left form, right contact info + mascot
 * UI/UX Pro Max: Glassmorphism form card, hover icon transitions, success state animation
 */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS, MASCOT_URL } from '@/lib/constants';
import { getAttributionPayload, trackLeadSubmission } from '@/lib/analytics';

const services = [
  'Kitchen Remodeling',
  'Bathroom Renovation',
  'Basement Finishing',
  'Exterior & Siding',
  'Home Addition',
  'Flooring & Tile',
  'Other',
];

const contactItems = [
  { icon: Phone, label: 'Call or Text', value: BUSINESS.phone, href: BUSINESS.phoneHref, color: '#394696' },
  { icon: Mail, label: 'Email Us', value: BUSINESS.email, href: `mailto:${BUSINESS.email}`, color: '#983631' },
  { icon: MapPin, label: 'Service Area', value: BUSINESS.serviceArea, href: '#', color: '#394696' },
  {
    icon: Clock,
    label: 'Hours',
    value: `${BUSINESS.hours.weekdays} · ${BUSINESS.hours.saturday} · ${BUSINESS.hours.sunday}`,
    href: '#',
    color: '#983631',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');

    const projectType = form.service || 'General Inquiry';
    try {
      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          projectType,
          timeline: 'Homepage contact section request',
          projectDetails: form.message,
          sourcePage: 'homepage-contact-section',
          attribution: getAttributionPayload(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'We could not submit your request. Please try again.');
      }

      trackLeadSubmission({ projectType, timeline: 'Homepage contact section request' });
      window.location.assign('/thank-you?source=homepage-contact-section');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `We could not submit your request. Please call us at ${BUSINESS.phone}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all duration-200`
    + ` bg-white/5 border border-slate-200 focus:border-[#394696]/60 focus:bg-white/8 focus:ring-2 focus:ring-[#394696]/20`;

  return (
    <section id="contact" className="py-24 bg-[#111827]" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center mb-4 block">Get Started</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4"
            style={{ fontFamily: 'Figtree, sans-serif', lineHeight: 1.05 }}>
            Request Your Free Estimate
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}>
            Tell us about your project and we'll get back to you within 24 hours to schedule your free in-home consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center"
                style={{ background: '#f1f5f9', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(57,70,150,0.2)', border: '1px solid rgba(57,70,150,0.4)' }}>
                  <CheckCircle2 size={32} className="text-[#394696]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  Request Received!
                </h3>
                <p className="text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
                  We'll contact you within 24 hours to schedule your free consultation. Looking forward to working with you!
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{ background: '#f1f5f9', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
                      style={{ fontFamily: 'Figtree, sans-serif' }}>Full Name *</label>
                    <input required type="text" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="John Smith" className={inputClass}
                      style={{ fontFamily: 'Figtree, sans-serif' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
                      style={{ fontFamily: 'Figtree, sans-serif' }}>Phone Number *</label>
                    <input required type="tel" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="(610) 555-1234" className={inputClass}
                      style={{ fontFamily: 'Figtree, sans-serif' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>Email Address *</label>
                  <input required type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@email.com" className={inputClass}
                    style={{ fontFamily: 'Figtree, sans-serif' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>Service Needed</label>
                  <select value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className={inputClass}
                    style={{ fontFamily: 'Figtree, sans-serif' }}>
                    <option value="" className="bg-[#111827]">Select a service...</option>
                    {services.map(s => (
                      <option key={s} value={s} className="bg-[#111827]">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>Tell Us About Your Project</label>
                  <textarea rows={4} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Describe your project, timeline, and any specific requirements..."
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: 'Georgia, serif' }} />
                </div>
                {error ? (
                  <p role="alert" className="text-sm font-semibold" style={{ color: '#983631' }}>
                    {error}
                  </p>
                ) : null}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: submitting ? 0.75 : 1 }}
                >
                  {submitting ? 'Submitting...' : 'Send My Request'} <ArrowRight size={16} />
                </motion.button>
                <p className="text-slate-400 text-xs text-center" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  We respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right: Mascot + Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Mascot */}
            <div className="flex justify-center mb-2">
              <div className="mascot-float">
                <img src={MASCOT_URL} alt="Sure-Fix mascot" className="w-44 object-contain select-none" draggable={false} />
              </div>
            </div>

            {/* Contact cards */}
            {contactItems.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 rounded-xl p-4 group transition-all duration-200"
                style={{
                  background: '#f1f5f9',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                    style={{ color, fontFamily: 'Figtree, sans-serif' }}>{label}</p>
                  <p className="text-slate-700 font-semibold text-sm"
                    style={{ fontFamily: 'Figtree, sans-serif' }}>{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
