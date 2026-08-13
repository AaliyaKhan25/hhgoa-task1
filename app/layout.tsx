import './globals.css';
import { Bodoni_Moda, VT323, JetBrains_Mono, Pacifico } from 'next/font/google';

const bodoni = Bodoni_Moda({ 
  subsets: ['latin'], 
  variable: '--font-bodoni',
  display: 'swap',
});

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-vt323',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

export const metadata = {
  title: 'HH Goa 2026 - ID Generator',
  description: 'Generate your HH Goa 2026 Builder Card',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${vt323.variable} ${mono.variable} ${pacifico.variable}`}>
      <body className="bg-[#044D29] text-[#FFFDEB] font-mono antialiased">
        {children}
      </body>
    </html>
  );
}