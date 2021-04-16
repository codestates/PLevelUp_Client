import createAsyncThunk, {
  createRequestActionTypes,
} from '../../lib/createAsyncThunk';
import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../../lib/reducerUtils';
import { mainClubList, MainClubListResType } from '../../api/main/club';
import { bookmarkAPI } from '../../api/main/club';
import produce from 'immer';
import { FaRoad } from 'react-icons/fa';
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
)<any, any, AxiosError>(); //TODO payload type , response type

// async 액션
const asyncActions = {
  mainClubListAsync,
  bookmarkAsync,
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

export const mainListAsync = createReducer<any, ListAsyncAction>( //! ListAsyncState 에서 produce 사용이되질않아 일단 any로 바꾸어봄
  asyncInitialState,
  {
    [MAIN_CLUB_LIST]: state => ({
      ...state,
      clubs: asyncState.load(),
    }),
    [MAIN_CLUB_LIST_SUCCESS]: (state, action) => {
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        clubs: asyncState.success(action.payload.data),
        lastPage: parseInt(action.payload.headers['last-page'], 10), // 문자열을 숫자로 변환 // 뭐하는 부분인지 질 이해가 안가긴함..help
      };
    },
    [MAIN_CLUB_LIST_FAILURE]: (state, action) => ({
      ...state,
      clubs: asyncState.error(action.payload),
    }),
    [BOOKMARK_CLUB]: (state, action) => {
      console.log(state);
      return {
        ...state,
        clubs: asyncState.load(state.clubs.data),
      };
    },
    [BOOKMARK_CLUB_SUCCESS]: (state, action) => {
      // produce(state, (draft: any) => {
      //TODO 시작값을 지금현재의 clubs로 하고 싶다.
      console.log(state.clubs.data);
      // console.log(action.payload);
      state.clubs.data.map((club: any) => {
        if (club.id === action.payload.ClubId) {
          club.Bookmarkers.push({ id: action.payload.UserId });
          console.log(club);
        }
      });
      console.log(state.clubs.data);
      return {
        ...state,
        clubs: asyncState.success(state.clubs.data),
      };
      // const club = draft.clubs.data.find(
      //   (club: any) => club.id === action.payload.ClubId,
      // );
      // club.Bookmarkers.push({ id: action.payload.UserId });
      // console.log(club);
      // draft.clubs.loading = false;
      // draft.clubs.error = null;
      // draft.clubs = state;
      // return {
      //   ...state,
      //   clubs: asyncState.success(club), // 바뀐 상태데이터
      // };
      // });
    },
    [BOOKMARK_CLUB_FAILURE]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        clubs: asyncState.error(action.payload),
      };
    },
  },
);

// bookmark를 여기다가 옮겨야겠구나 리스트상태를 바꿔주는 것이니
export default mainListAsync;

export const mainListThunk = createAsyncThunk(mainClubListAsync, mainClubList);
export const bookmarkThunk = createAsyncThunk(bookmarkAsync, bookmarkAPI);
