import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useCallback, useEffect, useContext } from 'react';

import {
  postCheckCode,
  postRegisterMember,
  getDuplicateCheck,
  getSendEmailCheckingCode,
  getUserData,
  putUserName,
  putPassword,
} from './member.api';
import { useToast } from '../toast';

import { AuthContext } from '@/providers';

export const useCheckingEmailDuplication = (
  email: string,
  enabled: boolean = false,
) =>
  useQuery({
    queryKey: ['/duplicate/email', email],
    queryFn: () => getDuplicateCheck(email),
    enabled,
  });

export const useSendEmailCheckingCode = (
  email: string,
  enabled: boolean = false,
) =>
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

export const useRegisterMember = (
  email: string,
  password: string,
  name: string,
) =>
  useMutation({
    mutationFn: () => postRegisterMember(email, password, name),
    onSuccess: (data) => data.data,
  });

export const useUserData = () =>
  useQuery({
    queryKey: ['/mypage'],
    queryFn: () => getUserData(),
  });

export const useChangeUserName = () =>
  useMutation({
    mutationFn: (newName: string) => putUserName(newName),
    onSuccess: (data) => data.data,
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => putPassword(oldPassword, newPassword),
    onSuccess: (data) => data,
  });

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider Error');
  }
  return context;
};

export const useEmailDuplicationCheck = (email: string) => {
  const [isEmailChecked, setIsEmailChecked] = useState<boolean | null>(null);
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
  setTime: React.Dispatch<React.SetStateAction<number | null>>,
  isActive: boolean,
  onTimeout: () => void,
) => {
  useEffect(() => {
    if (!isActive) return;

    setTime(600);
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime == null) return null;

        return prevTime <= 1 ? (onTimeout(), 0) : prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);
};

export const useAuthenticationCode = (
  email: string,
  uuid: string,
  onSuccess: () => void,
) => {
  const { createToast } = useToast();
  const { mutate: checkCode, data: result } = useCheckCode(email, uuid);

  useEffect(() => {
    if (result?.data === false) createToast('error', '인증번호가 틀렸습니다.');
    else if (result?.data === true) onSuccess();
  }, [result]);

  return { checkCode, result };
};
