'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import { Header, LogInForm } from '@/components/profile';

export function LogIn() {
  const router = useRouter();
  return (
    <styles.container>
      <Header
        h2='로그인'
        prevButtonHandler={() => {
          router.replace('/login');
        }}
      />
      <LogInForm />
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #fafaff;
  `,
};
