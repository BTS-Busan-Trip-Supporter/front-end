import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { getDuplicateCheck, getSendEmailCheckingCode } from './member.api';

export const useCheckingEmailDuplication = (email: string) =>
  useQuery({
    queryKey: ['/duplicate/email', email],
    queryFn: () => getDuplicateCheck(email),
  });

export const useSendEmailCheckingCode = (email: string) =>
  useQuery({
    queryKey: ['/send/mail', email],
    queryFn: () => getSendEmailCheckingCode(email),
  });

export const useEmailDuplicationCheck = (email: string) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data } = useCheckingEmailDuplication(email);

  useEffect(() => {
    if (data == null) return;
    if (data.data) {
      setIsEmailChecked(true);
      setErrorMessage(null);
    } else {
      setIsEmailChecked(false);
      setErrorMessage('이미 존재하는 이메일입니다.');
    }
  }, [data]);

  return { isEmailChecked, errorMessage };
};
