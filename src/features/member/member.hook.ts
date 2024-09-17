import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { getDuplicateCheck, getSendEmailCheckingCode } from './member.api';

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

export const useEmailDuplicationCheck = (email: string) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const { data: duplicateResult, refetch: checkingEmail } =
    useCheckingEmailDuplication(email, false);

  useEffect(() => {
    if (duplicateResult == null) return;

    if (duplicateResult.data) setIsEmailChecked(true);
    else setIsEmailChecked(false);
  }, [duplicateResult]);

  const handleCheckButton = () => {
    checkingEmail();
  };

  return { isEmailChecked, handleCheckButton };
};
