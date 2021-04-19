import api from '../index';

export async function mainLoginKakao() {
  console.log('mainKakaoLogin API호출');
  const response = await api.get(`/api/main/auth/login/kakao`, {});
  console.log('mainKakaoLogin API', response);
  return response.data;
}

export async function mainLoginGoogle() {
  console.log('mainGoogleLogin API호출');
  const response = await api.get(`/api/main/auth/login/google`, {});
  console.log('mainGoogleLogin API', response);
  return response.data;
}

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
  id: number;
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
