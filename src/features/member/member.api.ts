import axios from 'axios';

import {
  type GetSendEmailCodeDTO,
  type GetDuplicateEmailDTO,
} from './member.dto';

export const getDuplicateCheck = (email: string) =>
  axios
    .get<GetDuplicateEmailDTO>(
      `/p-travel-log/duplicate/email/${encodeURIComponent(email)}`,
    )
    .then((res) => res.data);

export const getSendEmailCheckingCode = (email: string) =>
  axios
    .get<GetSendEmailCodeDTO>(
      `/p-travel-log/send/mail/${encodeURIComponent(email)}`,
    )
    .then((res) => res.data);
