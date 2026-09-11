import { ArrowUpRight, Clock, Phone } from 'lucide-react';
import { BUSINESS, LOGO_URL } from '@/lib/constants';
import PhoneLink from '@/components/PhoneLink';

export default function Maintenance() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{
        background: 'linear-gradient(165deg, #0d1117 0%, #1a2340 42%, #0d1117 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(57, 70, 150, 0.35) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #394696, #983631, #394696, transparent)' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <img
          src={LOGO_URL}
          alt="Sure-Fix Remodeling"
          className="mb-10 h-14 w-auto drop-shadow-lg sm:h-16"
        />

        <p
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#394696]"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          Scheduled maintenance
        </p>

        <h1
          className="mb-6 text-[clamp(1.75rem,5vw,2.25rem)] font-light leading-snug tracking-tight text-white"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Our site is undergoing temporary scheduled maintenance and will be right back!
        </h1>

        <p
          className="mb-6 max-w-md text-base leading-relaxed text-white/55"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          We&apos;re making a few updates behind the scenes. Thank you for your patience — your forever-home
          remodeling team will be online again shortly.
        </p>

        <p
          className="mb-10 max-w-md text-base leading-relaxed text-white/55"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          In the meantime, please visit our previous site for any inquiries:{' '}
          <a
            href="https://surefixremodeling.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-4 transition-opacity hover:opacity-75"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            surefixremodeling.net
            <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden />
          </a>
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <PhoneLink
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-[filter] hover:brightness-110"
            style={{ fontFamily: 'Figtree, sans-serif', background: '#983631' }}
          >
            <Phone size={16} strokeWidth={2} />
            {BUSINESS.phone}
          </PhoneLink>
          <span
            className="inline-flex items-center gap-2 text-sm text-white/45"
            style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600 }}
          >
            <Clock size={15} className="text-[#394696]" aria-hidden />
            Easton, PA · Lehigh Valley
          </span>
        </div>
      </div>
    </div>
  );
}
