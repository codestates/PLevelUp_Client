import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  MainIsLoginResType,
  mainIsLogin,
  mainLogout,
} from '../../api/main/auth';
import { asyncState, AsyncState } from '../../lib/reducerUtils';
import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThuck';

const IsNotLogin = () => {
  try {
    localStorage.removeItem('main'); // localStorage 에서 main 를 제거
  } catch (e) {
    console.log('localStorage is not working');
  }
};

const [
  MAIN_IS_LOGIN,
  MAIN_IS_LOGIN_SUCCESS,
  MAIN_IS_LOGIN_FAILURE,
] = createRequestActionTypes('main-auth/MAIN_IS_LOGIN');

const [
  MAIN_LOGOUT,
  MAIN_LOGOUT_SUCCESS,
  MAIN_LOGOUT_FAILURE,
] = createRequestActionTypes('main-auth/MAIN_LOGOUT');
// Async 액션 함수
export const mainIsLoginAsync = createAsyncAction(
  MAIN_IS_LOGIN,
  MAIN_IS_LOGIN_SUCCESS,
  MAIN_IS_LOGIN_FAILURE,
)<any, MainIsLoginResType, AxiosError>();

export const mainLogoutAsync = createAsyncAction(
  MAIN_LOGOUT,
  MAIN_LOGOUT_SUCCESS,
  MAIN_LOGOUT_FAILURE,
)<any, MainIsLoginResType, AxiosError>();

// 액션 타입
const MAIN_TEMP_SET_USER = 'main-auth/MAIN_TEMP_SET_USER';

// 액션 함수
export const mainTempSetUser = createAction(
  MAIN_TEMP_SET_USER,
)<MainIsLoginResType>();

const actions = { mainIsLoginAsync, mainTempSetUser, mainLogoutAsync };
type UserAction = ActionType<typeof actions>;

// 액션 상태 및 초기화 상태
type UserState = {
  [index: string]: AsyncState<MainIsLoginResType, Error> | null;
  user: AsyncState<MainIsLoginResType, Error> | null;
};

const initialState: UserState = {
  user: null,
};

const mainUser = createReducer<UserState, UserAction>(initialState, {
  [MAIN_IS_LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    user: asyncState.success(action.payload),
  }),
  [MAIN_IS_LOGIN_FAILURE]: (state, action) => {
    IsNotLogin();
    return {
      ...state,
      user: asyncState.error(action.payload),
    };
  },
  [MAIN_TEMP_SET_USER]: (state, { payload: user }) => ({
    ...state,
    user: user,
  }),
  [MAIN_LOGOUT_SUCCESS]: (state, _) => {
    IsNotLogin();
    return {
      ...state,
      user: null,
    };
  },
});

export default mainUser;

// thunk
export const mainIsLoginThunk = createAsyncThunk(mainIsLoginAsync, mainIsLogin);
export const mainLogoutThunk = createAsyncThunk(mainLogoutAsync, mainLogout);
