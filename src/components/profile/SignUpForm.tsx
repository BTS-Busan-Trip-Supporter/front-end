'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { InputField } from '../InputField';

import {
  useAuthenticationCode,
  useAuthenticationTimer,
  useEmailDuplicationCheck,
  useRegisterMember,
  useSendEmailCheckingCode,
} from '@/features/member';
import { useToast } from '@/features/toast';

export function SignUpForm() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [time, setTime] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isEmailChecked, handleCheckButton, update } =
    useEmailDuplicationCheck(email);
  const { refetch: sendCode } = useSendEmailCheckingCode(email, false);

  const { mutate: registerMember } = useRegisterMember(email, password, name);

  const { createToast } = useToast();

  useEffect(() => {
    if (email) {
      setTime(0);
      setIsTimerActive(false);
    }
  }, [email]);

  useEffect(() => {
    if (isEmailChecked === false) {
      createToast('error', '이미 등록된 이메일입니다.');
    } else if (isEmailChecked) {
      createToast('info', '인증번호가 이메일로 발송되었습니다.');
      sendCode();
      setIsTimerActive(true);
    }
  }, [isEmailChecked, update]);

  return (
    <styles.container>
      <styles.formWrapper>
        <InputField
          type='text'
          id='name'
          label='닉네임'
          value={name}
          set={setName}
        />
        <EmailField
          email={email}
          setEmail={setEmail}
          handleCheckButton={handleCheckButton}
        />
        <AuthenticationField
          email={email}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
          time={time}
          setTime={setTime}
        />
        <InputField
          type='password'
          id='password'
          label='비밀번호'
          value={password}
          set={setPassword}
        />
      </styles.formWrapper>
      <styles.submitButton
        onClick={() => {
          registerMember();
        }}
      >
        완료
      </styles.submitButton>
    </styles.container>
  );
}

function EmailField({
  email,
  setEmail,
  handleCheckButton,
}: {
  email: string;
  setEmail: (value: string) => void;
  handleCheckButton: () => void;
}) {
  return (
    <styles.inputWrapper>
      <styles.inputField
        type='text'
        id='email'
        placeholder=' '
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <styles.inputLabel htmlFor='email'>이메일</styles.inputLabel>
      <styles.button onClick={handleCheckButton}>인증번호 받기</styles.button>
    </styles.inputWrapper>
  );
}

function AuthenticationField({
  email,
  isTimerActive,
  setIsTimerActive,
  time,
  setTime,
}: {
  email: string;
  isTimerActive: boolean;
  setIsTimerActive: (f: boolean) => void;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { createToast } = useToast();

  const [uuid, setUuid] = useState('');

  useAuthenticationTimer(setTime, isTimerActive, () => {
    setIsTimerActive(false);
    setTimeout(() => {
      createToast('error', '시간초과되었습니다.');
    }, 100);
  });

  const { checkCode } = useAuthenticationCode(email, uuid, () => {
    setTime(0);
    setUuid('');
    createToast('success', '인증이 완료되었습니다.');
  });

  return (
    <styles.inputWrapper>
      <styles.inputField
        type='text'
        id='authentication'
        placeholder=' '
        value={uuid}
        onChange={(e) => setUuid(e.target.value)}
      />
      <styles.inputLabel htmlFor='authentication'>인증번호</styles.inputLabel>
      {time !== 0 && (
        <styles.time>{`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}</styles.time>
      )}
      <styles.button onClick={() => checkCode()}>확인</styles.button>
    </styles.inputWrapper>
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
