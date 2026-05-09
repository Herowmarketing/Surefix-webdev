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
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
