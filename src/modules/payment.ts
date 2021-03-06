import createAsyncThunk, {
  createRequestActionTypes,
} from '../lib/createAsyncThunk';
import {
  ActionType,
  createAsyncAction,
  createAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import {
  mainPaymentHistory,
  MainPaymentHistoryResType,
} from '../api/main/payment';

const [
  MAIN_PAYMENT_HISTORY,
  MAIN_PAYMENT_HISTORY_SUCCESS,
  MAIN_PAYMENT_HISTORY_FAILURE,
] = createRequestActionTypes('main-payment/MAIN_PAYMENT_HISTORY');

export const mainPaymentHistoryAsync = createAsyncAction(
  MAIN_PAYMENT_HISTORY,
  MAIN_PAYMENT_HISTORY_SUCCESS,
  MAIN_PAYMENT_HISTORY_FAILURE,
)<any, MainPaymentHistoryResType, AxiosError>();

const MAIN_PAYMENT_UNLOAD_HISTORY = 'main-payment/MAIN_PAYMENT_UNLOAD_HISTORY';

export const mainPaymentUnloadHistory = createAction(
  MAIN_PAYMENT_UNLOAD_HISTORY,
);

const asyncActions = { mainPaymentHistoryAsync, mainPaymentUnloadHistory };
type HistoryAsyncAction = ActionType<typeof asyncActions>;

type HistoryAsyncState = {
  payment: AsyncState<MainPaymentHistoryResType, Error>;
};

const asyncInitialState: HistoryAsyncState = {
  payment: asyncState.initial(),
};

export const mainHistoryAsync = createReducer<
  HistoryAsyncState,
  HistoryAsyncAction
>(asyncInitialState, {
  [MAIN_PAYMENT_HISTORY]: state => ({
    ...state,
    payment: asyncState.load(),
  }),
  [MAIN_PAYMENT_HISTORY_SUCCESS]: (state, action) => ({
    ...state,
    payment: asyncState.success(action.payload),
  }),
  [MAIN_PAYMENT_HISTORY_FAILURE]: (state, action) => ({
    ...state,
    payment: asyncState.error(action.payload),
  }),
  [MAIN_PAYMENT_UNLOAD_HISTORY]: () => asyncInitialState,
});
export default mainHistoryAsync;

export const mainPaymentThunk = createAsyncThunk(
  mainPaymentHistoryAsync,
  mainPaymentHistory,
);
