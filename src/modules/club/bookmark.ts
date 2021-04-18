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
import { BookmarkResType } from '../../api/main/club';
import { addBookmarkAPI, removeBookmarkAPI } from '../../api/main/club';
import produce from 'immer';

// async 액션 타입

const [
  MAIN_CLUB_BOOKMARK_ADD,
  MAIN_CLUB_BOOKMARK_ADD_SUCCESS,
  MAIN_CLUB_BOOKMARK_ADD_FAILURE,
] = createRequestActionTypes('main-bookmark/MAIN_CLUB_BOOKMARK_ADD'); // 북마크 추가하기

const [
  MAIN_CLUB_BOOKMARK_REMOVE,
  MAIN_CLUB_BOOKMARK_REMOVE_SUCCESS,
  MAIN_CLUB_BOOKMARK_REMOVE_FAILURE,
] = createRequestActionTypes('main-bookmark/MAIN_CLUB_BOOKMARK_REMOVE'); // 북마크 취소하기

// 액션 타입
const MAIN_CLUB_BOOKMARK_UNLOAD = 'main-bookmark/MAIN_CLUB_BOOKMARK_UNLOAD';

// async 생성 함수

export const addBookmarkAsync = createAsyncAction(
  MAIN_CLUB_BOOKMARK_ADD,
  MAIN_CLUB_BOOKMARK_ADD_SUCCESS,
  MAIN_CLUB_BOOKMARK_ADD_FAILURE,
)<any, BookmarkResType, AxiosError>(); //TODO payload type , response type

export const removeBookmarkAsync = createAsyncAction(
  MAIN_CLUB_BOOKMARK_REMOVE,
  MAIN_CLUB_BOOKMARK_REMOVE_SUCCESS,
  MAIN_CLUB_BOOKMARK_REMOVE_FAILURE,
)<any, BookmarkResType, AxiosError>(); //TODO payload type , response type

// 액션 생성함수
export const mainClubBookmarkUnload = createAction(MAIN_CLUB_BOOKMARK_UNLOAD);

// async 액션
const asyncActions = {
  addBookmarkAsync,
  removeBookmarkAsync,
};
type BookmarkAsyncAction = ActionType<typeof asyncActions>;

export type BookmarkType = {
  clubId: number | null;
  userId: number | null;
  isBookmark: boolean;
};
type BookmarkAsyncState = {
  bookmark: AsyncState<BookmarkType, Error>;
};

const asyncInitialState: BookmarkAsyncState = {
  bookmark: asyncState.initial(),
};

export const mainBookmarkAsync = createReducer<
  BookmarkAsyncState,
  BookmarkAsyncAction
>(asyncInitialState, {
  [MAIN_CLUB_BOOKMARK_ADD]: (state, action) => {
    return {
      ...state,
    };
  },
  [MAIN_CLUB_BOOKMARK_ADD_SUCCESS]: (state, action) => {
    console.log(action.payload); // 북마크 response : {UserId :1 , ClubId: 99}
    return {
      ...state,
      bookmark: asyncState.success({
        clubId: action.payload.ClubId,
        userId: action.payload.UserId,
        isBookmark: true,
      }),
    };
  },
  [MAIN_CLUB_BOOKMARK_ADD_FAILURE]: (state, action) => {
    console.log(action.payload);
    return {
      ...state,
      bookmark: asyncState.error(action.payload),
    };
  },
  [MAIN_CLUB_BOOKMARK_REMOVE]: (state, action) => {
    return {
      ...state,
    };
  },
  [MAIN_CLUB_BOOKMARK_REMOVE_SUCCESS]: (state, action) => {
    return {
      ...state,
      bookmark: asyncState.success({
        clubId: action.payload.ClubId,
        userId: action.payload.UserId,
        isBookmark: false,
      }), // 바뀐상태 넣어준다.
    };
  },
  [MAIN_CLUB_BOOKMARK_REMOVE_FAILURE]: (state, action) => {
    console.log(action.payload); // 에러 확인
    return {
      ...state,
      bookmark: asyncState.error(action.payload),
    };
  },
  [MAIN_CLUB_BOOKMARK_UNLOAD]: () => asyncInitialState,
});

export default mainBookmarkAsync;

export const addBookmarkThunk = createAsyncThunk(
  addBookmarkAsync,
  addBookmarkAPI,
);
export const removeBookmarkThunk = createAsyncThunk(
  removeBookmarkAsync,
  removeBookmarkAPI,
);
