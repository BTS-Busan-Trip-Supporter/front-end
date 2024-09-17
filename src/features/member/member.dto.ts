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
