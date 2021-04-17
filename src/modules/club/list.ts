import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThunk';
import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../../lib/reducerUtils';
import {
  mainClubList,
  MainClubListResType,
  MainClubReadResType,
  BookmarkResType,
} from '../../api/main/club';
import { bookmarkAPI, cancelBookmarkAPI } from '../../api/main/club';
import produce from 'immer';

// async 액션 타입
const [
  MAIN_CLUB_LIST,
  MAIN_CLUB_LIST_SUCCESS,
  MAIN_CLUB_LIST_FAILURE,
] = createRequestActionTypes('main-list/MAIN_CLUB_LIST'); // 클럽 목록 조회

const [
  BOOKMARK_CLUB,
  BOOKMARK_CLUB_SUCCESS,
  BOOKMARK_CLUB_FAILURE,
] = createRequestActionTypes('main-bookmark/BOOKMARK_CLUB'); // 북마크 추가하기

const [
  CANCEL_BOOKMARK_CLUB,
  CANCEL_BOOKMARK_CLUB_SUCCESS,
  CANCEL_BOOKMARK_CLUB_FAILURE,
] = createRequestActionTypes('main-bookmark/CANCEL_BOOKMARK_CLUB'); // 북마크 추가하기

// async 생성 함수
export const mainClubListAsync = createAsyncAction(
  MAIN_CLUB_LIST,
  MAIN_CLUB_LIST_SUCCESS,
  MAIN_CLUB_LIST_FAILURE,
)<any, MainClubListResType[], AxiosError>();

export const bookmarkAsync = createAsyncAction(
  BOOKMARK_CLUB,
  BOOKMARK_CLUB_SUCCESS,
  BOOKMARK_CLUB_FAILURE,
)<any, BookmarkResType, AxiosError>(); //TODO payload type , response type

export const cancelBookmarkAsync = createAsyncAction(
  CANCEL_BOOKMARK_CLUB,
  CANCEL_BOOKMARK_CLUB_SUCCESS,
  CANCEL_BOOKMARK_CLUB_FAILURE,
)<any, BookmarkResType, AxiosError>(); //TODO payload type , response type

// async 액션
const asyncActions = {
  mainClubListAsync,
  bookmarkAsync,
  cancelBookmarkAsync,
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
    [MAIN_CLUB_LIST_SUCCESS]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        clubs: asyncState.success(action.payload.data),
        lastPage: parseInt(action.payload.headers['last-page'], 10), // 문자열을 숫자로 변환
      };
    },
    [MAIN_CLUB_LIST_FAILURE]: (state, action) => ({
      ...state,
      clubs: asyncState.error(action.payload),
    }),
    [BOOKMARK_CLUB]: (state, action) => {
      console.log(state); //초기state값 확인
      return {
        ...state,
        clubs: asyncState.load(state.clubs.data), //Bookmark 액션의 초기 상태는 club_list가 실행된 상태의 클럽들이다.
      };
    },
    [BOOKMARK_CLUB_SUCCESS]: (state, action) => {
      // produce(state, (draft: any) => { //불변성 편하게 하기 위헤 immer/produce 사용 but return오류발생
      console.log(state.clubs.data); // 클럽배열들
      console.log(action.payload); // 북마크 response : {UserId :1 , ClubId: 99}
      state.clubs.data?.map((club: any) => {
        if (club.id === action.payload.ClubId) {
          // 북마크한 클럽 찾아서
          club.Bookmarkers.push({ id: action.payload.UserId }); // 해당 클럽에 북마커에 user추가
          console.log(club); // 추가확인
        }
      });
      console.log(state.clubs.data); // 전체 클럽상태변경확인
      return {
        ...state,
        clubs: asyncState.success(state.clubs.data), // 바뀐상태 넣어준다.
      };
    },
    [BOOKMARK_CLUB_FAILURE]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        clubs: asyncState.error(action.payload),
      };
    },
    [CANCEL_BOOKMARK_CLUB]: (state, action) => {
      console.log(state); //초기state값 확인
      return {
        ...state,
        clubs: asyncState.load(state.clubs.data), //Bookmark 액션의 초기 상태는 club_list가 실행된 상태의 클럽들이다.
      };
    },
    [CANCEL_BOOKMARK_CLUB_SUCCESS]: (state, action) => {
      state.clubs.data?.map((club: any) => {
        if (club.id === action.payload.ClubId) {
          // 북마크한 클럽 찾아서
          console.log(club.Bookmarkers); // 해당 클럽 북마크한 유저리스트
          club.Bookmarkers = club.Bookmarkers.filter((el: any) => {
            return el.id !== action.payload.UserId; // 요청유저는 북마크유저리스트에서 제외
          }); // 해당 클럽에 북마커에 user추가
          console.log(club.Bookmarkers); // 북마크한 유저리스트에서 제거 확인
        }
      });
      return {
        ...state,
        clubs: asyncState.success(state.clubs.data), // 바뀐상태 넣어준다.
      };
    },
    [CANCEL_BOOKMARK_CLUB_FAILURE]: (state, action) => {
      console.log(action.payload); // 에러 확인
      return {
        ...state,
        clubs: asyncState.error(action.payload),
      };
    },
  },
);

export default mainListAsync;

export const mainListThunk = createAsyncThunk(mainClubListAsync, mainClubList);
export const bookmarkThunk = createAsyncThunk(bookmarkAsync, bookmarkAPI);
export const cancelBookmarkThunk = createAsyncThunk(
  cancelBookmarkAsync,
  cancelBookmarkAPI,
);
