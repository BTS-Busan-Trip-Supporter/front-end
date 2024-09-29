import axios from 'axios';

import {
  type GetDuplicateEmailDTO,
  type GetSendEmailCodeDTO,
  type GetUserDataDTO,
  type PostCheckCodeDTO,
  type PostRegisterDTO,
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

export const postCheckCode = (email: string, uuid: string) =>
  axios
    .post<PostCheckCodeDTO>(`/p-travel-log/check/mail`, {
      email,
      uuid,
    })
    .then((res) => res.data);

export const postRegisterMember = (
  email: string,
  password: string,
  name: string,
) =>
  axios
    .post<PostRegisterDTO>(`/p-travel-log/register/member/local`, {
      email,
      password,
      name,
    })
    .then((res) => res.data);

export const getUserData = () =>
  axios.get<GetUserDataDTO>(`/p-travel-log/mypage`).then((res) => res.data);

export const putUserName = (newName: string) =>
  axios.put(`/p-travel-log/namechange`, { newName }).then((res) => res.data);

export const putPassword = (oldPassword: string, newPassword: string) =>
  axios
    .put(`/p-travel-log/pwchange`, { oldPassword, newPassword })
    .then((res) => res.data);
