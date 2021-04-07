import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { MasterIsLoginResType, masterIsLogin } from '../../api/master/auth';
import { asyncState, AsyncState } from '../../lib/reducerUtils';
import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThuck'

const [
  MASTER_IS_LOGIN,
  MASTER_IS_LOGIN_SUCCESS,
  MASTER_IS_LOGIN_FAILURE,
] = createRequestActionTypes('master-auth/MASTER_IS_LOGIN');

// Async 액션 함수
export const masterIsLoginAsync = createAsyncAction(
  MASTER_IS_LOGIN,
  MASTER_IS_LOGIN_SUCCESS,
  MASTER_IS_LOGIN_FAILURE,
)<any, MasterIsLoginResType, AxiosError>();

// 액션 타입
const MASTER_TEMP_SET_USER = 'master-auth/MASTER_TEMP_SET_USER';

// 액션 함수
export const masterTempSetUser = createAction(
  MASTER_TEMP_SET_USER,
)<MasterIsLoginResType>();

const actions = { masterIsLoginAsync, masterTempSetUser };
type UserAction = ActionType<typeof actions>;

// 액션 상태 및 초기화 상태
type UserState = {
  [index: string]: AsyncState<MasterIsLoginResType, Error> | null;
  user: AsyncState<MasterIsLoginResType, Error> | null;
};

const initialState: UserState = {
  user: null,
};


const masterUser = createReducer<UserState, UserAction>(initialState, {
  [MASTER_IS_LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    user: asyncState.success(action.payload),
  }),
  [MASTER_IS_LOGIN_FAILURE]: (state, action) => ({
    ...state,
    user: asyncState.error(action.payload),
  }),
  [MASTER_TEMP_SET_USER]: (state, { payload: user }) => ({
    ...state,
    user: user,
  }),
});

export default masterUser;

// thunk
export const masterIsLoginThunk = createAsyncThunk(
  masterIsLoginAsync,
  masterIsLogin,
);
