import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThunk';
import {
  ActionType,
  createAsyncAction,
  createAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../../lib/reducerUtils';
import { mainPayment } from '../../api/main/payment';
import { IamportPaymentResType } from '../../api/main/payment';

// async 액션 타입
const [
  MAIN_PAYMENT_READ,
  MAIN_PAYMENT_READ_SUCCESS,
  MAIN_PAYMENT_READ_FAILURE,
] = createRequestActionTypes('main-read/MAIN_PAYMENT_READ'); // 클럽 작성

// async 생성 함수
export const mainPaymentReadAsync = createAsyncAction(
  MAIN_PAYMENT_READ,
  MAIN_PAYMENT_READ_SUCCESS,
  MAIN_PAYMENT_READ_FAILURE,
)<any, IamportPaymentResType, AxiosError>();

// 액션 타입
const MAIN_PAYMENT_UNLOAD_READ = 'main-read/MAIN_PAYMENT_UNLOAD_READ';

export const mainPaymentUnloadRead = createAction(MAIN_PAYMENT_UNLOAD_READ);

// async 액션
const asyncActions = { mainPaymentReadAsync, mainPaymentUnloadRead };
type ReadAsyncAction = ActionType<typeof asyncActions>;

type ReadAsyncState = {
  payment: AsyncState<IamportPaymentResType, Error>;
};

const asyncInitialState: ReadAsyncState = {
  payment: asyncState.initial(),
};

export const mainReadAsync = createReducer<ReadAsyncState, ReadAsyncAction>(
  asyncInitialState,
  {
    [MAIN_PAYMENT_READ]: state => ({
      ...state,
      club: asyncState.load(),
    }),
    [MAIN_PAYMENT_READ_SUCCESS]: (state, action) => ({
      ...state,
      club: asyncState.success(action.payload),
    }),
    [MAIN_PAYMENT_READ_FAILURE]: (state, action) => ({
      ...state,
      club: asyncState.error(action.payload),
    }),
    [MAIN_PAYMENT_UNLOAD_READ]: () => asyncInitialState,
  },
);

export const mainPaymentReadThunk = createAsyncThunk(
  mainPaymentReadAsync,
  mainPayment,
);
