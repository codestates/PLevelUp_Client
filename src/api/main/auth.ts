import api from '../index';

export type MainLoginReqType = {
  [index: string]: string;
  email: string;
  password: string;
};

export type MainLoginResType = {
  id: number;
  email: string;
  username: string;
  createAd: Date;
  updatedAt: null;
};

export async function mainLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post<MainLoginResType>(`/api/main/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export type MainSignUpReqType = {
  [index: string]: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export async function mainSignUp({
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
  const response = await api.post<MainLoginResType>(`/api/main/auth/signup`, {
    email,
    username,
    password,
  });
  return response.data;
}

export type MainIsLoginResType = {
  _id: number;
  email: string;
  username: string;
};

export const mainIsLogin = async () => {
  const response = await api.get<MainIsLoginResType>('/api/main/auth/islogin');
  return response.data;
};
export type MainLogoutResType = {};

export const mainLogout = async () => {
  const response = await api.post<MainLogoutResType>('/api/main/auth/logout');
  return response.data;
};

export type MainChangePasswordReqType = {
  [index: string]: string;
  email: string;
  password: string;
  changePassword: string;
};

export type MainChangePasswordResType = {
  id: number;
  email: string;
  username: string;
  password: string;
  createAd: Date;
  updatedAt: Date;
};

export async function mainChangePassword({
  email,
  password,
  changePassword,
}: {
  email: string;
  password: string;
  changePassword: string;
}) {
  const response = await api.post<MainChangePasswordResType>(
    `/api/main/auth/update`,
    {
      email,
      password,
    },
  );
  return response.data;
}
