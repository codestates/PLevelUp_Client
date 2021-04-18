import produce from 'immer';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';

import { AxiosError } from 'axios';
import { asyncState, AsyncState } from '../../lib/reducerUtils';
import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThunk';
import {
  mainMyPageChangePassword,
  MainMyPageChangePasswordReqType,
  MainMyPageChangePasswordResType,
} from '../../api/main/myPage';

// async 액션 타입
const [
  MAIN_MYPAGE_CHANGE_PASSWORD,
  MAIN_MYPAGE_CHANGE_PASSWORD_SUCCESS,
  MAIN_MYPAGE_CHANGE_PASSWORD_FAILURE,
] = createRequestActionTypes('main-my-page/MAIN_MYPAGE_CHANGE_PASSWORD');

const MAIN_MYPAGE_UNLOAD_CHANGE_PASSWORD =
  'main-my-page/MAIN_MYPAGE_UNLOAD_CHANGE_PASSWORD';

export const mainMyPageChangePasswordAsync = createAsyncAction(
  MAIN_MYPAGE_CHANGE_PASSWORD,
  MAIN_MYPAGE_CHANGE_PASSWORD_SUCCESS,
  MAIN_MYPAGE_CHANGE_PASSWORD_FAILURE,
)<any, MainMyPageChangePasswordResType, AxiosError>();

export const mainMyPageUnloadChangePassword = createAction(
  MAIN_MYPAGE_UNLOAD_CHANGE_PASSWORD,
);

const asyncActions = {
  mainMyPageChangePasswordAsync,
  mainMyPageUnloadChangePassword,
};

type ChangePasswordAsyncAction = ActionType<typeof asyncActions>;

// 액션타입
const MYPAGE_CHANGE_FIELD = 'myPage/MYPAGE_CHANGE_FIELD';
const MYPAGE_INITIALIZE = 'myPage/MYPAGE_INITIALIZE';

// 액션생성함수
type ChangeFieldProps = {
  key: string;
  value: string;
};

export const myPageChangeField = createAction(
  MYPAGE_CHANGE_FIELD,
)<ChangeFieldProps>();

export const myPageInitializeForm = createAction(MYPAGE_INITIALIZE)<string>();

const actions = { myPageChangeField, myPageInitializeForm };

type ChangePasswordAction = ActionType<typeof actions>;

type ChangePasswordAsyncState = AsyncState<
  MainMyPageChangePasswordResType,
  Error
>;

const asyncInitialState: ChangePasswordAsyncState = asyncState.initial();

type ChangePasswordState = MainMyPageChangePasswordReqType;

const initialState: ChangePasswordState = {
  password: '',
  changePassword: '',
  changePasswordConfirm: '',
};

export const mainChangePasswordAsync = createReducer<
  ChangePasswordAsyncState,
  ChangePasswordAsyncAction
>(asyncInitialState, {
  [MAIN_MYPAGE_CHANGE_PASSWORD]: _ => asyncState.load(),
  [MAIN_MYPAGE_CHANGE_PASSWORD_SUCCESS]: (_, action) =>
    asyncState.success(action.payload),
  [MAIN_MYPAGE_CHANGE_PASSWORD_FAILURE]: (_, action) =>
    asyncState.error(action.payload),
  [MAIN_MYPAGE_UNLOAD_CHANGE_PASSWORD]: _ => asyncState.initial(),
});

export const mainChangePassword = createReducer<
  ChangePasswordState,
  ChangePasswordAction
>(initialState, {
  [MYPAGE_CHANGE_FIELD]: (state, { payload: { key, value } }) =>
    produce(state, draft => {
      draft[key] = value;
    }),
  [MYPAGE_INITIALIZE]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
  }),
});

export const mainChangePasswordThunk = createAsyncThunk(
  mainMyPageChangePasswordAsync,
  mainMyPageChangePassword,
);
