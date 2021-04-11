import api from '../index';

export type MasterLoginReqType = {
  [index: string]: string;
  email: string;
  password: string;
};

export type MasterLoginResType = {
  id: number;
  email: string;
  username: string;
  createAd: Date;
  updatedAt: null;
};

export async function masterLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post<MasterLoginResType>(
    `/api/master/auth/login`,
    {
      email,
      password,
    },
  );
  return response.data;
}

export type MasterSignUpReqType = {
  [index: string]: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export async function masterSignUp({
  email,
  username,
  password,
  passwordConfirm,
}: {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}) {
  const response = await api.post<MasterLoginResType>(
    `/api/master/auth/signup`,
    {
      email,
      username,
      password,
    },
  );
  return response.data;
}

export type MasterIsLoginResType = {
  _id: number;
  email: string;
};

export const masterIsLogin = async () =>
  await api.get<MasterIsLoginResType>('/api/master/auth/islogin');

export type MasterLogoutResType = {};

export const masterLogout = async () =>
  await api.post<MasterLogoutResType>('/api/master/auth/logout');
