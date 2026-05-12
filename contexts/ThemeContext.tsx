import { ReactNode, useEffect } from 'react';

/** Minimal theme shell — applies `.dark` on <html> so Tailwind dark tokens apply site-wide. */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
}: {
  children: ReactNode;
  defaultTheme?: string;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', defaultTheme === 'dark');
    root.classList.toggle('light', defaultTheme !== 'dark');
  }, [defaultTheme]);

  return <>{children}</>;
}
