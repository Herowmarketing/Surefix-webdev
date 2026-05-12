import { ReactNode } from 'react';

/** Stub provider — Radix tooltip can replace this without changing call sites. */
export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
