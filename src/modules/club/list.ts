import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThunk';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../../lib/reducerUtils';
import {
  mainClubList,
  getBookmarkListAPI,
  MainClubListResType,
} from '../../api/main/club';

// async 액션 타입
const [
  MAIN_CLUB_LIST,
  MAIN_CLUB_LIST_SUCCESS,
  MAIN_CLUB_LIST_FAILURE,
] = createRequestActionTypes('main-list/MAIN_CLUB_LIST'); // 클럽 목록 조회

const [
  GET_BOOKMARK_LIST,
  GET_BOOKMARK_LIST_SUCCESS,
  GET_BOOKMARK_LIST_FAILURE,
] = createRequestActionTypes('mypage-bookmark-list/GET_BOOKMARK_LIST');

// 액션 타입
const MAIN_CLUB_UNLOAD_LIST = 'main-list/MAIN_CLUB_UNLOAD_LIST';

// async 생성 함수
export const mainClubListAsync = createAsyncAction(
  MAIN_CLUB_LIST,
  MAIN_CLUB_LIST_SUCCESS,
  MAIN_CLUB_LIST_FAILURE,
)<any, MainClubListResType, AxiosError>();

export const getBookmarkListAsync = createAsyncAction(
  GET_BOOKMARK_LIST,
  GET_BOOKMARK_LIST_SUCCESS,
  GET_BOOKMARK_LIST_FAILURE,
)<any, MainClubListResType, AxiosError>();
// 액션 생성함수
export const mainClubUnloadList = createAction(MAIN_CLUB_UNLOAD_LIST);

// async 액션
const asyncActions = {
  mainClubListAsync,
  mainClubUnloadList,
  getBookmarkListAsync,
};
type ListAsyncAction = ActionType<typeof asyncActions>;

type ListAsyncState = {
  clubs: AsyncState<MainClubListResType, Error>;
  lastPage: number;
};

const asyncInitialState: ListAsyncState = {
  clubs: asyncState.initial(),
  lastPage: 1,
};

export const mainListAsync = createReducer<ListAsyncState, ListAsyncAction>(
  asyncInitialState,
  {
    [MAIN_CLUB_LIST]: state => ({
      ...state,
      clubs: asyncState.load(),
    }),
    [MAIN_CLUB_LIST_SUCCESS]: (state, action) => ({
      ...state,
      clubs: asyncState.success(action.payload.data),
      lastPage: parseInt(action.payload.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [MAIN_CLUB_LIST_FAILURE]: (state, action) => ({
      ...state,
      clubs: asyncState.error(action.payload),
    }),
    [MAIN_CLUB_UNLOAD_LIST]: () => asyncInitialState,
    [GET_BOOKMARK_LIST]: state => ({
      ...state,
      clubs: asyncState.load(),
    }),
    [GET_BOOKMARK_LIST_SUCCESS]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        clubs: asyncState.success(action.payload),
      };
    },
    [GET_BOOKMARK_LIST_FAILURE]: (state, action) => ({
      ...state,
      clubs: asyncState.error(action.payload),
    }),
  },
);

export default mainListAsync;

export const mainListThunk = createAsyncThunk(mainClubListAsync, mainClubList);
export const mainGetBookmarkListThunk = createAsyncThunk(
  getBookmarkListAsync,
  getBookmarkListAPI,
);
