import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

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

  const { refetch: checkingEmail } = useCheckingEmailDuplication(email, false);

  const handleCheckButton = useCallback(() => {
    checkingEmail().then((data) => {
      if (data == null) return;

      setIsEmailChecked(data.data?.data ?? false);
    });
  }, [checkingEmail]);

  return { isEmailChecked, handleCheckButton };
};
