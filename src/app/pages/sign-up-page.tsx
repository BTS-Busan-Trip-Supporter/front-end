'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import { Header, SignUpForm } from '@/components/profile';

export function SignUp() {
  const router = useRouter();
  return (
    <styles.container>
      <Header
        h2='회원가입'
        prevButtonHandler={() => {
          router.replace('/login');
        }}
      />
      <SignUpForm />
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
