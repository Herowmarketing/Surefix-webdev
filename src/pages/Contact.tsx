/*
 * CONTACT PAGE — Sure-Fix Remodeling
 * Real address, phone, hours, and estimate form
 */
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, ArrowRight, Star } from 'lucide-react';
import { BUSINESS, MASCOT_URL } from '@/lib/constants';
import { useState } from 'react';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const SERVICES_LIST = ['Kitchen Remodeling', 'Bathroom Remodeling', 'Basement Finishing', 'Exterior Remodeling', 'Flooring', 'Home Additions', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      toast.error('Please fill in your name, phone, and service type.');
      return;
    }
    setSubmitted(true);
    toast.success('Request submitted! We\'ll call you within 24 hours.');
  };

  return (
    <div className="bg-[#0d1117] min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-16 px-5 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-widest text-[#394696] mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Get In Touch
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Request a Free Estimate
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-white/60 text-xl max-w-2xl" style={{ fontFamily: 'Georgia, serif' }}>
            Tell us about your project and we'll schedule a free in-home consultation — no pressure, no obligation.
          </motion.p>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="pb-20 px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Form */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-2xl border border-[#394696]/40 text-center"
                style={{ background: 'rgba(57,70,150,0.1)' }}
              >
                <img src={MASCOT_URL} alt="Sure-Fix Mascot" className="w-32 mx-auto mb-6" />
                <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Figtree, sans-serif' }}>We Got Your Request!</h2>
                <p className="text-white/60 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  A member of our team will reach out within 24 hours to schedule your free in-home consultation.
                </p>
                <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif' }}>
                  <Phone size={14} /> Call Us Now: {BUSINESS.phone}
                </a>
              </motion.div>
            ) : (
              <motion.form onSubmit={handleSubmit} variants={stagger}
                className="p-8 rounded-2xl border border-white/8"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <motion.h2 variants={fadeUp} custom={0} className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  Tell Us About Your Project
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <motion.div variants={fadeUp} custom={1}>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>Full Name *</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#394696] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Figtree, sans-serif' }}
                    />
                  </motion.div>
                  <motion.div variants={fadeUp} custom={2}>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>Phone Number *</label>
                    <input
                      type="tel" required
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="(610) 555-0000"
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#394696] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Figtree, sans-serif' }}
                    />
                  </motion.div>
                </div>
                <motion.div variants={fadeUp} custom={3} className="mb-4">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#394696] transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Figtree, sans-serif' }}
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={4} className="mb-4">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>Service Needed *</label>
                  <select
                    required
                    value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#394696] transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Figtree, sans-serif' }}
                  >
                    <option value="" style={{ background: '#0d1117' }}>Select a service...</option>
                    {SERVICES_LIST.map(s => <option key={s} value={s} style={{ background: '#0d1117' }}>{s}</option>)}
                  </select>
                </motion.div>
                <motion.div variants={fadeUp} custom={5} className="mb-6">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2" style={{ fontFamily: 'Figtree, sans-serif' }}>Tell Us More</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Describe your project, timeline, or any questions you have..."
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-[#394696] transition-colors resize-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Figtree, sans-serif' }}
                  />
                </motion.div>
                <motion.button variants={fadeUp} custom={6} type="submit"
                  className="w-full py-4 rounded-xl text-sm font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: '#983631', fontFamily: 'Figtree, sans-serif' }}>
                  Request Free Estimate <ArrowRight size={15} />
                </motion.button>
                <p className="text-xs text-white/30 text-center mt-3" style={{ fontFamily: 'Figtree, sans-serif' }}>
                  We'll contact you within 24 hours. No spam, ever.
                </p>
              </motion.form>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact info card */}
            <motion.div variants={fadeUp} custom={0}
              className="p-6 rounded-2xl border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="text-lg font-black text-white mb-5" style={{ fontFamily: 'Figtree, sans-serif' }}>Contact Info</h3>
              <div className="flex flex-col gap-4">
                <a href={BUSINESS.phoneHref} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(57,70,150,0.2)' }}>
                    <Phone size={15} className="text-[#394696]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Figtree, sans-serif' }}>Phone</p>
                    <p className="text-white font-bold group-hover:text-[#394696] transition-colors" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.phone}</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(57,70,150,0.2)' }}>
                    <MapPin size={15} className="text-[#394696]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Figtree, sans-serif' }}>Address</p>
                    <p className="text-white font-bold" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.address}</p>
                    <p className="text-white/50 text-sm" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.addressShort}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(57,70,150,0.2)' }}>
                    <Clock size={15} className="text-[#394696]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Figtree, sans-serif' }}>Hours</p>
                    <p className="text-sm text-white/70" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.hours.weekdays}</p>
                    <p className="text-sm text-white/70" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.hours.saturday}</p>
                    <p className="text-sm text-white/70" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.hours.sunday}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(57,70,150,0.2)' }}>
                    <Mail size={15} className="text-[#394696]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Figtree, sans-serif' }}>Service Area</p>
                    <p className="text-white/70 text-sm" style={{ fontFamily: 'Figtree, sans-serif' }}>{BUSINESS.serviceArea}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ratings card */}
            <motion.div variants={fadeUp} custom={1}
              className="p-6 rounded-2xl border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="text-lg font-black text-white mb-4" style={{ fontFamily: 'Figtree, sans-serif' }}>Our Ratings</h3>
              {[
                { platform: "Angie's List", rating: 4.9, reviews: '320 reviews' },
                { platform: 'Google', rating: 4.5, reviews: '91 reviews' },
                { platform: 'Houzz', rating: 4.6, reviews: '23 reviews' },
                { platform: 'Facebook', rating: 4.8, reviews: '21 votes' },
              ].map((r) => (
                <div key={r.platform} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-sm font-bold text-white/70" style={{ fontFamily: 'Figtree, sans-serif' }}>{r.platform}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={i < Math.floor(r.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
                      ))}
                    </div>
                    <span className="text-sm font-black text-white" style={{ fontFamily: 'Figtree, sans-serif' }}>{r.rating}</span>
                    <span className="text-xs text-white/30" style={{ fontFamily: 'Figtree, sans-serif' }}>{r.reviews}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Mascot */}
            <motion.div variants={fadeUp} custom={2} className="flex justify-center">
              <img src={MASCOT_URL} alt="Sure-Fix Mascot" className="w-40 h-auto drop-shadow-xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
