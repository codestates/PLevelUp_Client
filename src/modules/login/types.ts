import { ActionType } from 'typesafe-actions';
import { changeField } from './actions';

export type SignUpType = {
  [index: string]: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};
export type LoginType = {
  [index: string]: string;
  email: string;
  password: string;
};

export type authType = {
  id: number;
  email: string;
  createdAt: string;
  updateAt: null | string;
  username: string;
} | null;
export type authErrorType = any | null;

export type AuthState = {
  [index: string]: SignUpType | LoginType | authType | authErrorType;
};

const actions = {
  changeField,
};
export type AuthAction = ActionType<typeof actions>;
