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
  createAt: Date;
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
  type: string;
};

export type MainSendPasswordResType = {
  accepted: string[];
  rejected: string[];
  envelopTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelop: {
    from: string;
    to: string[];
  };
  messageId: string;
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

export const mainSendPassword = async (email: string) => {
  const response = await api.post<MainSendPasswordResType>(
    '/api/main/auth/findPassword',
    {
      email,
    },
  );
  console.log(response);
  return response.data;
};
