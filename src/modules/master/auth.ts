import produce from 'immer';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThunk';
import {
  masterLogin,
  MasterLoginReqType,
  MasterLoginResType,
  masterSignUp,
  MasterSignUpReqType,
} from '../../api/master/auth';
import { AxiosError } from 'axios';
import { asyncState, AsyncState } from '../../lib/reducerUtils';

const [
  MASTER_LOGIN,
  MASTER_LOGIN_SUCCESS,
  MASTER_LOGIN_FAILURE,
] = createRequestActionTypes('master-auth/MASTER_LOGIN');

const [
  MASTER_SIGN_UP,
  MASTER_SIGN_UP_SUCCESS,
  MASTER_SIGN_UP_FAILURE,
] = createRequestActionTypes('master-auth/MASTER_SIGN_UP');

const MASTER_INITIALIZE_AUTH = 'master-auth/MASTER_INITIALIZE_FORM_FOR_ERROR';

export const masterSignUpAsync = createAsyncAction(
  MASTER_SIGN_UP,
  MASTER_SIGN_UP_SUCCESS,
  MASTER_SIGN_UP_FAILURE,
)<any, MasterLoginResType, AxiosError>();

export const masterLoginAsync = createAsyncAction(
  MASTER_LOGIN,
  MASTER_LOGIN_SUCCESS,
  MASTER_LOGIN_FAILURE,
)<any, MasterLoginResType, AxiosError>();

export const masterInitializeAuth = createAction(
  MASTER_INITIALIZE_AUTH,
)<string>();

const asyncActions = {
  masterSignUpAsync,
  masterLoginAsync,
  masterInitializeAuth,
};

type AuthAsyncAction = ActionType<typeof asyncActions>;

const MASTER_CHANGE_FIELD = 'master-auth/MASTER_CHANGE_FIELD';
const MASTER_INITIALIZE_FORM = 'master-auth/MASTER_INITIALIZE_FORM';

type ChangeFieldProps = {
  form: string;
  key: string;
  value: string;
};

export const masterChangeField = createAction(
  MASTER_CHANGE_FIELD,
)<ChangeFieldProps>();

export const masterInitializeForm = createAction(
  MASTER_INITIALIZE_FORM,
)<string>();

const actions = { masterChangeField, masterInitializeForm };
type AuthAction = ActionType<typeof actions>;

type AuthAsyncState = {
  auth: AsyncState<MasterLoginResType, Error>;
};

const asyncInitialState: AuthAsyncState = {
  auth: asyncState.initial(),
};

type AuthState = {
  [index: string]: MasterSignUpReqType | MasterLoginReqType;
  signUp: MasterSignUpReqType;
  login: MasterLoginReqType;
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
};
export const masterAuthAsync = createReducer<AuthAsyncState, AuthAsyncAction>(
  asyncInitialState,
  {
    [MASTER_LOGIN]: state => ({
      ...state,
      auth: asyncState.load(),
    }),
    [MASTER_LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      auth: asyncState.success(action.payload),
    }),
    [MASTER_LOGIN_FAILURE]: (state, action) => ({
      ...state,
      auth: asyncState.error(action.payload),
    }),
    [MASTER_SIGN_UP]: state => ({
      ...state,
      auth: asyncState.load(),
    }),
    [MASTER_SIGN_UP_SUCCESS]: (state, action) => ({
      ...state,
      auth: asyncState.success(action.payload),
    }),
    [MASTER_SIGN_UP_FAILURE]: (state, action) => ({
      ...state,
      auth: asyncState.error(action.payload),
    }),
    [MASTER_INITIALIZE_AUTH]: (state, _) => ({
      ...state,
      auth: asyncState.initial(),
    }),
  },
);

export const masterAuth = createReducer<AuthState, AuthAction>(initialState, {
  [MASTER_CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value;
    }),
  [MASTER_INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
  }),
});

export const masterLoginThunk = createAsyncThunk(masterLoginAsync, masterLogin);
export const masterSignUpThunk = createAsyncThunk(
  masterSignUpAsync,
  masterSignUp,
);
