import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';

import {
  postCheckCode,
  getDuplicateCheck,
  getSendEmailCheckingCode,
} from './member.api';

export const useCheckingEmailDuplication = (email: string, enabled: boolean) =>
  useQuery({
    queryKey: ['/duplicate/email', email],
    queryFn: () => getDuplicateCheck(email),
    enabled,
  });

export const useSendEmailCheckingCode = (email: string, enabled: boolean) =>
  useQuery({
    queryKey: ['/send/mail', email],
    queryFn: () => getSendEmailCheckingCode(email),
    enabled,
  });

export const useCheckCode = (email: string, uuid: string) =>
  useMutation({
    mutationFn: () => postCheckCode(email, uuid),
    onSuccess: (data) => data.data,
  });

export const useEmailDuplicationCheck = (email: string) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [update, setUpdate] = useState(false);

  const { refetch: checkingEmail } = useCheckingEmailDuplication(email, false);

  const handleCheckButton = useCallback(() => {
    checkingEmail().then((data) => {
      if (data == null) return;

      setIsEmailChecked(data.data?.data ?? false);
      setUpdate((prev) => !prev);
    });
  }, [checkingEmail]);

  return { isEmailChecked, handleCheckButton, update };
};

export const useAuthenticationTimer = (
  setTime: React.Dispatch<React.SetStateAction<number>>,
  isActive: boolean,
  onTimeout: () => void,
) => {
  useEffect(() => {
    if (!isActive) return;

    setTime(600);
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime <= 1 ? (onTimeout(), 0) : prevTime - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);
};

export const useAuthenticationCode = (
  email: string,
  uuid: string,
  setErrorMessage: (msg: string | null) => void,
  onSuccess: () => void,
) => {
  const { mutate: checkCode, data: result } = useCheckCode(email, uuid);

  useEffect(() => {
    if (result?.data === false) setErrorMessage('인증번호가 틀렸습니다.');
    else if (result?.data === true) onSuccess();
  }, [result, setErrorMessage]);

  return { checkCode, result };
};
