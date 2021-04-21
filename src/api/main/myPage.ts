import api from '../index';
import { MainLoginResType } from './auth';

export type MainMyPageChangePasswordReqType = {
  [index: string]: string;
  password: string;
  changePassword: string;
  changePasswordConfirm: string;
};

export type MainMyPageChangePasswordResType = MainLoginResType;

export async function mainMyPageChangePassword({
  password,
  changePassword,
  changePasswordConfirm,
}: MainMyPageChangePasswordReqType) {
  const response = await api.post<MainMyPageChangePasswordResType>(
    `/api/main/auth/changepassword`,
    {
      password,
      changePassword,
    },
  );
  return response.data;
}

export type MainApplyListReqType = {
  [index: string]: string;
};

export type MainApplyResType = {
  [index: string]: string;
  title: string;
  summary: string;
  price: string;
};

export type MainApplyListResType = MainApplyResType[];

export async function mainApplyList() {
  const response = await api.get<MainApplyResType>(`/api/main/auth/mypage`);
  return response.data;
}
