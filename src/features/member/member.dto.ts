import type { User } from './member.type';

export interface GetDuplicateEmailDTO {
  status: string;
  data: boolean;
}

export interface GetSendEmailCodeDTO {
  status: string;
  data: string;
}

export interface PostCheckCodeDTO {
  status: string;
  data: boolean;
}

export interface PostRegisterDTO {
  status: string;
  data: string;
}

export interface GetUserDataDTO {
  status: string;
  data: User;
}
