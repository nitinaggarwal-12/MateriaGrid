import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MateriaGrid — SimiliMatrix Index Engine',
  description:
    'The Advanced Multi-Axis Repertorization & Core Case Intelligence Engine for Clinical Homeopathy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="bg-[#111215] text-slate-200 antialiased min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
