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
import { bookmarkAPI, cancelBookmarkAPI } from '../../api/main/club';
import { AsyncState, asyncState } from '../../lib/reducerUtils';
import { mainClubList, MainClubListResType } from '../../api/main/club';
import produce from 'immer';
// async 액션 선언

const [
  BOOKMARK_CLUB,
  BOOKMARK_CLUB_SUCCESS,
  BOOKMARK_CLUB_FAILURE,
] = createRequestActionTypes('main-bookmark/BOOKMARK_CLUB');

// async 생성 함수

export const bookmarkAsync = createAsyncAction(
  BOOKMARK_CLUB,
  BOOKMARK_CLUB_SUCCESS,
  BOOKMARK_CLUB_FAILURE,
)<any, any, AxiosError>();

// async 액션 타입 지정
const asyncActions = {
  bookmarkAsync,
};

type BookmarkAsyncAction = ActionType<typeof asyncActions>;

type bookmarkAsyncState = {
  clubs: AsyncState<MainClubListResType, Error>;
};
// 초기state 지정
const asyncInitialState: bookmarkAsyncState = {
  clubs: asyncState.initial(),
};
//리듀스
export const BookmarkReducer = createReducer<any, BookmarkAsyncAction>(
  asyncInitialState,
  {
    [BOOKMARK_CLUB]: state => {
      return {
        ...state,
        clubs: asyncState.load(),
      };
    },
    [BOOKMARK_CLUB_SUCCESS]: (state, action) => {
      console.log('here');
      produce(state, (draft: any) => {
        console.log(draft.clubs);
        // const club = draft.find(v => v.id === action.data.PostId);
        const club = draft.clubs.find(
          (club: any) => club.id === action.payload.ClubId,
        );
        club.Bookmarkers.push({ id: action.payload.UserId });
      });
    },
    [BOOKMARK_CLUB_FAILURE]: (state, action) => {
      //   console.log(action.payload);
      return {
        ...state,
        clubs: asyncState.error(action.payload),
      };
    },
  },
);

export default BookmarkReducer;
//라덕스Thunk
export const bookmarkThunk = createAsyncThunk(bookmarkAsync, bookmarkAPI);
