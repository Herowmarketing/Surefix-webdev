import { Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = '/manus-storage/SureFixLogoFullColor2_e8812903.svg';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] px-6"
      style={{ fontFamily: 'Figtree, sans-serif' }}>
      <div className="mb-10">
        <img src={LOGO_URL} alt="Sure-Fix Remodeling" className="h-10 w-auto"
          style={{ filter: 'brightness(0) invert(1)' }} />
      </div>
      <div className="text-[8rem] font-black leading-none text-white/5 select-none mb-2">
        404
      </div>
      <h1 className="text-2xl font-black text-white mb-3">Page Not Found</h1>
      <p className="text-white/45 text-center max-w-sm mb-8" style={{ fontFamily: 'Georgia, serif' }}>
        The page you're looking for doesn't exist. Let's get you back to the right place.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => setLocation('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide text-white transition-all duration-200 hover:scale-105"
          style={{ background: '#394696', border: '2px solid #394696' }}
        >
          <Home size={16} /> Go Home
        </button>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide text-white/70 hover:text-white transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    </div>
  );
}
