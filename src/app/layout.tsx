import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { NavigationBar } from '@/components';
import {
  AuthProvider,
  TanStackQueryProvider,
  ToastProvider,
} from '@/providers';

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
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
        />
      </head>
      <body className={inter.className}>
        <TanStackQueryProvider>
          <AuthProvider>
            <main>{children}</main>
            <ToastProvider />
            <NavigationBar />
          </AuthProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
