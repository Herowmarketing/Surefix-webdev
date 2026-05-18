/*
 * LAYOUT — Sure-Fix Remodeling
 * Shared wrapper: Navbar + children + Footer
 * Used by every page for consistent chrome
 */
import Navbar from './Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-[#0d1117]">
      <Navbar />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
