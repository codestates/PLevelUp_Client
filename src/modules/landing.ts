import createAsyncThunk, {
  createRequestActionTypes,
} from '../lib/createAsyncThunk';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { mainLandingList, MainLandingResType } from '../api/main';

// async 액션 타입
const [
  MAIN_LANDING_LIST,
  MAIN_LANDING_LIST_SUCCESS,
  MAIN_LANDING_LIST_FAILURE,
] = createRequestActionTypes('main-landing/MAIN_LANDING_LIST'); // 클럽 목록 조회

// 액션 타입
const MAIN_LANDING_UNLOAD_LIST = 'main-list/MAIN_LANDING_UNLOAD_LIST';

// async 생성 함수
export const mainLandingListAsync = createAsyncAction(
  MAIN_LANDING_LIST,
  MAIN_LANDING_LIST_SUCCESS,
  MAIN_LANDING_LIST_FAILURE,
)<any, MainLandingResType, AxiosError>();

export const mainLandingUnloadList = createAction(MAIN_LANDING_UNLOAD_LIST);

// async 액션
const asyncActions = {
  mainLandingListAsync,
  mainLandingUnloadList,
};
type LandingAsyncAction = ActionType<typeof asyncActions>;

type LandingAsyncState = AsyncState<MainLandingResType, Error>;

const asyncInitialState: LandingAsyncState = asyncState.initial();

export const mainLandingAsync = createReducer<
  LandingAsyncState,
  LandingAsyncAction
>(asyncInitialState, {
  [MAIN_LANDING_LIST]: () => asyncState.load(),
  [MAIN_LANDING_LIST_SUCCESS]: (_, { payload: clubList }) =>
    asyncState.success(clubList),
  [MAIN_LANDING_LIST_FAILURE]: (_, { payload: error }) =>
    asyncState.error(error),
  [MAIN_LANDING_UNLOAD_LIST]: () => asyncInitialState,
});

export default mainLandingAsync;

export const mainLandingListThunk = createAsyncThunk(
  mainLandingListAsync,
  mainLandingList,
);
