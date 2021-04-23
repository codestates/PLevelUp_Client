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
import { updateBookmark } from '../../api/main/club';

// async 액션 타입

const [
  MAIN_CLUB_BOOKMARK,
  MAIN_CLUB_BOOKMARK_SUCCESS,
  MAIN_CLUB_BOOKMARK_FAILURE,
] = createRequestActionTypes('main-bookmark/MAIN_CLUB_BOOKMARK'); // 북마크 추가하기

// 액션 타입
const MAIN_CLUB_BOOKMARK_UNLOAD = 'main-bookmark/MAIN_CLUB_BOOKMARK_UNLOAD';

// async 생성 함수

export const mainClubBookmarkAsync = createAsyncAction(
  MAIN_CLUB_BOOKMARK,
  MAIN_CLUB_BOOKMARK_SUCCESS,
  MAIN_CLUB_BOOKMARK_FAILURE,
)<any, BookmarkResType, AxiosError>();

// 액션 생성함수
export const mainClubBookmarkUnload = createAction(MAIN_CLUB_BOOKMARK_UNLOAD);

// async 액션
const asyncActions = {
  mainClubBookmarkAsync,
};
type BookmarkAsyncAction = ActionType<typeof asyncActions>;

type BookmarkAsyncState = AsyncState<BookmarkResType, Error>;

const asyncInitialState: BookmarkAsyncState = asyncState.initial();

export const mainBookmarkAsync = createReducer<
  BookmarkAsyncState,
  BookmarkAsyncAction
>(asyncInitialState, {
  [MAIN_CLUB_BOOKMARK]: () => asyncState.load(),
  [MAIN_CLUB_BOOKMARK_SUCCESS]: (_, { payload }) => asyncState.success(payload),
  [MAIN_CLUB_BOOKMARK_FAILURE]: (_, { payload }) => asyncState.error(payload),
  [MAIN_CLUB_BOOKMARK_UNLOAD]: () => asyncInitialState,
});

export default mainBookmarkAsync;

export const mainBookmarkThunk = createAsyncThunk(
  mainClubBookmarkAsync,
  updateBookmark,
);
