'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

import { InputField } from '../InputField';

export function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <styles.container>
      <styles.formWrapper>
        <InputField
          type='text'
          id='email'
          label='이메일'
          value={email}
          set={setEmail}
        />
        <InputField
          type='password'
          id='password'
          label='비밀번호'
          value={password}
          set={setPassword}
        />
      </styles.formWrapper>
      <styles.logInButton>로그인</styles.logInButton>
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
    background-color: #fff;
    padding: 1.25rem;
    gap: 1.5rem;
  `,

  formWrapper: styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  logInButton: styled.button`
    background: #605eff;
    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.02rem;
    padding: 1rem;
    width: 100%;
    border-radius: 7px;
    border: none;
  `,
};
