import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreatorBet - Predict, Engage, and Earn on Creator Streams',
  description: 'CreatorBet enables creators to host instant prediction markets tied to their live content, with dynamic pricing and tokenized rewards for their audience.',
  openGraph: {
    title: 'CreatorBet',
    description: 'Predict, Engage, and Earn on Creator Streams',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
