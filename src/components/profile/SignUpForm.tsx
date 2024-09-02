'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface Input {
  type: string;
  id: string;
  label: string;
  onRequestCode?: () => void;
  isTimerActive?: boolean;
}

export function SignUpForm() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  return (
    <styles.container>
      <styles.formWrapper>
        <InputField type='text' id='name' label='닉네임' />
        <InputField
          type='text'
          id='email'
          label='이메일'
          onRequestCode={() => setIsTimerActive(true)}
        />
        <InputField
          type='text'
          id='authentication'
          label='인증번호'
          isTimerActive={isTimerActive}
        />
        <InputField type='password' id='password' label='비밀번호' />
      </styles.formWrapper>
      <styles.submitButton>완료</styles.submitButton>
    </styles.container>
  );
}

function InputField({ type, id, label, onRequestCode, isTimerActive }: Input) {
  return (
    <styles.inputWrapper>
      <styles.inputField type={type} id={id} placeholder=' ' />
      <styles.inputLabel htmlFor={id}>{label}</styles.inputLabel>
      {id === 'email' && (
        <styles.button onClick={onRequestCode}>인증번호 받기</styles.button>
      )}
      {id === 'authentication' && <Authentication isActive={isTimerActive} />}
    </styles.inputWrapper>
  );
}

function Authentication({ isActive }: { isActive?: boolean }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    setTime(180);

    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      {time !== 0 && <styles.time>{formatTime(time)}</styles.time>}
      <styles.button>확인</styles.button>
    </>
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

  inputWrapper: styled.li`
    position: relative;
    margin-top: 1.25rem;
    width: 100%;
    border-bottom: 0.4px solid #d3d3d3;
  `,

  inputField: styled.input`
    width: 100%;
    padding: 1rem 0.3rem;
    color: #505050;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.01875rem;
    border: none;
    outline: none;
    background: transparent;

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -0.625rem;
      left: 0.3125rem;
      font-size: 0.75rem;
      color: #605eff;
    }
  `,

  inputLabel: styled.label`
    position: absolute;
    left: 0.625rem;
    top: 0.625rem;
    color: #b5b5b5;
    font-family: 'Noto Sans KR';
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.01875rem;
    transition: all 0.3s ease;
    pointer-events: none;
  `,

  submitButton: styled.button`
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

  button: styled.button`
    padding: 0.15rem 0.38rem;
    border-radius: 0.25rem;
    border: 0.4px solid #c9c9c9;
    background-color: transparent;

    color: #b5b5b5;
    font-family: 'Noto Sans KR';
    font-size: 0.625rem;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0125rem;

    position: absolute;
    right: 0;
    transform: translateY(50%);
  `,

  time: styled.span`
    color: #676767;
    font-family: 'Noto Sans KR';
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0125rem;
    position: absolute;
    right: 2.5rem;
    transform: translateY(80%);
  `,
};
