import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { TravelScheduleStoreProvider } from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'P의 여행',
  description: 'P의 여행과 함께 지금 여행을 시작하세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko-kr'>
      <body className={inter.className}>
        <TravelScheduleStoreProvider>{children}</TravelScheduleStoreProvider>
      </body>
    </html>
  );
}
