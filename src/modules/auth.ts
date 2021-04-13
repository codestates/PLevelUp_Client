import produce from 'immer';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import createAsyncThunk, {
  createRequestActionTypes,
} from '../lib/createAsyncThunk';
import {
  mainLogin,
  MainLoginReqType,
  MainLoginResType,
  mainSignUp,
  MainSignUpReqType,
  mainChangePassword,
  MainChangePasswordReqType,
  MainChangePasswordResType,
} from '../api/main/auth';
import { AxiosError } from 'axios';
import { asyncState, AsyncState } from '../lib/reducerUtils';

const [
  MAIN_LOGIN,
  MAIN_LOGIN_SUCCESS,
  MAIN_LOGIN_FAILURE,
] = createRequestActionTypes('main-auth/MAIN_LOGIN');

const [
  MAIN_SIGN_UP,
  MAIN_SIGN_UP_SUCCESS,
  MAIN_SIGN_UP_FAILURE,
] = createRequestActionTypes('main-auth/MAIN_SIGN_UP');

const [
  MAIN_CHANGE_PASSWORD,
  MAIN_CHANGE_PASSWORD_SUCCESS,
  MAIN_CHANGE_PASSWORD_FAILURE,
] = createRequestActionTypes('main-auth/MAIN_CHANGE_PASSWORD');

const MAIN_INITIALIZE_AUTH = 'main-auth/MAIN_INITIALIZE_AUTH';

export const mainSignUpAsync = createAsyncAction(
  MAIN_SIGN_UP,
  MAIN_SIGN_UP_SUCCESS,
  MAIN_SIGN_UP_FAILURE,
)<any, MainLoginResType, AxiosError>();

export const mainLoginAsync = createAsyncAction(
  MAIN_LOGIN,
  MAIN_LOGIN_SUCCESS,
  MAIN_SIGN_UP_FAILURE,
)<any, MainLoginResType, AxiosError>();

export const mainChangePasswordAsync = createAsyncAction(
  MAIN_CHANGE_PASSWORD,
  MAIN_CHANGE_PASSWORD_SUCCESS,
  MAIN_CHANGE_PASSWORD_FAILURE,
)<any, MainChangePasswordResType, AxiosError>();

export const mainInitializeAuth = createAction(MAIN_INITIALIZE_AUTH)<string>();

const asyncActions = {
  mainSignUpAsync,
  mainLoginAsync,
  mainChangePasswordAsync,
  mainInitializeAuth,
};

type AuthAsyncAction = ActionType<typeof asyncActions>;

const MAIN_CHANGE_FIELD = 'main-auth/MAIN_CHANGE_FIELD';
const MAIN_INITIALIZE_FORM = 'main-auth/MAIN_INITIALIZE_FORM';

type ChangeFieldProps = {
  form: string;
  key: string;
  value: string;
};

export const mainChangeField = createAction(
  MAIN_CHANGE_FIELD,
)<ChangeFieldProps>();

export const mainInitializeForm = createAction(MAIN_INITIALIZE_FORM)<string>();

const actions = { mainChangeField, mainInitializeForm };
type AuthAction = ActionType<typeof actions>;

type AuthAsyncState = {
  auth: AsyncState<MainLoginResType, Error>;
};

const asyncInitialState: AuthAsyncState = {
  auth: asyncState.initial(),
};

type AuthState = {
  [index: string]:
    | MainSignUpReqType
    | MainLoginReqType
    | MainChangePasswordReqType;
  signUp: MainSignUpReqType;
  login: MainLoginReqType;
  changePassword: MainChangePasswordReqType;
};

const initialState: AuthState = {
  signUp: {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    email: '',
    password: '',
  },
  changePassword: {
    email: '',
    password: '',
    changePassword: '',
  },
};
export const mainAuthAsync = createReducer<AuthAsyncState, AuthAsyncAction>(
  asyncInitialState,
  {
    [MAIN_LOGIN]: state => ({
      ...state,
      auth: asyncState.load(),
    }),
    [MAIN_LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      auth: asyncState.success(action.payload),
    }),
    [MAIN_LOGIN_FAILURE]: (state, action) => ({
      ...state,
      auth: asyncState.error(action.payload),
    }),
    [MAIN_SIGN_UP]: state => ({
      ...state,
      auth: asyncState.load(),
    }),
    [MAIN_SIGN_UP_SUCCESS]: (state, action) => ({
      ...state,
      auth: asyncState.success(action.payload),
    }),
    [MAIN_SIGN_UP_FAILURE]: (state, action) => ({
      ...state,
      auth: asyncState.error(action.payload),
    }),
    [MAIN_CHANGE_PASSWORD]: state => ({
      ...state,
      auth: asyncState.load(),
    }),
    [MAIN_CHANGE_PASSWORD_SUCCESS]: (state, action) => ({
      ...state,
      auth: asyncState.success(action.payload),
    }),
    [MAIN_CHANGE_PASSWORD_FAILURE]: (state, action) => ({
      ...state,
      auth: asyncState.error(action.payload),
    }),

    [MAIN_INITIALIZE_AUTH]: (state, _) => ({
      ...state,
      auth: asyncState.initial(),
    }),
  },
);

export const mainAuth = createReducer<AuthState, AuthAction>(initialState, {
  [MAIN_CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value;
    }),
  [MAIN_INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
  }),
});

export const mainLoginThunk = createAsyncThunk(mainLoginAsync, mainLogin);
export const mainSignUpThunk = createAsyncThunk(mainSignUpAsync, mainSignUp);
export const mainChangePasswordThunk = createAsyncThunk(
  mainChangePasswordAsync,
  mainChangePassword,
);
