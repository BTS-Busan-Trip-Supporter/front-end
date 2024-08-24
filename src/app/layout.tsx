import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { NavigationBar, Header } from '@/components';
import { TravelScheduleStoreProvider } from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'P의 여행',
  description: 'P의 여행과 함께 지금 여행을 시작하세요!'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko-kr'>
      <head>
        <meta name='theme-color' content='#605EFF'/>
      </head>
      <body className={inter.className}>
        <TravelScheduleStoreProvider>
          <main>
            <Header />
            {children}
          </main>
          <NavigationBar />
        </TravelScheduleStoreProvider>
      </body>
    </html>
  );
}
