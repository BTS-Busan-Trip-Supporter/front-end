'use client';

import styled from '@emotion/styled';

import { Background } from '@/components';

const styles = {
  container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
};

export function LoginPage() {
  return (
    <>
      <Background page='login' />
      <styles.container></styles.container>
    </>
  );
}
