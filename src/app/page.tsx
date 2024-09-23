'use client';

import { useRouter } from 'next/navigation';

import { TravelPage } from './pages';

export default function Home() {
  const accessToken = localStorage.getItem('accessToken');
  const router = useRouter();

  if (accessToken == null) {
    router.replace('/login');
    return;
  }

  return <TravelPage />;
}
