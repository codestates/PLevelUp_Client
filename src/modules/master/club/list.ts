import createAsyncThunk, {
  createRequestActionTypes,
} from '../../../lib/createAsyncThunk';
import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions';
import {
  masterClubList,
  MasterClubListResType,
} from '../../../api/master/club';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../../../lib/reducerUtils';

// async 액션 타입
const [
  MASTER_CLUB_LIST,
  MASTER_CLUB_LIST_SUCCESS,
  MASTER_CLUB_LIST_FAILURE,
] = createRequestActionTypes('master-list/MASTER_CLUB_LIST'); // 클럽 목록 조회

// async 생성 함수
export const masterClubListAsync = createAsyncAction(
  MASTER_CLUB_LIST,
  MASTER_CLUB_LIST_SUCCESS,
  MASTER_CLUB_LIST_FAILURE,
)<any, MasterClubListResType[], AxiosError>();

// async 액션
const asyncActions = {
  masterClubListAsync,
};
type ListAsyncAction = ActionType<typeof asyncActions>;

type ListAsyncState = {
  clubs: AsyncState<MasterClubListResType, Error>;
  lastPage: number;
};

const asyncInitialState: ListAsyncState = {
  clubs: asyncState.initial(),
  lastPage: 1,
};

export const masterListAsync = createReducer<ListAsyncState, ListAsyncAction>(
  asyncInitialState,
  {
    [MASTER_CLUB_LIST]: state => ({
      ...state,
      clubs: asyncState.load(),
    }),
    [MASTER_CLUB_LIST_SUCCESS]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        clubs: asyncState.success(action.payload.data),
        lastPage: parseInt(action.payload.headers['last-page'], 10), // 문자열을 숫자로 변환
      };
    },
    [MASTER_CLUB_LIST_FAILURE]: (state, action) => ({
      ...state,
      clubs: asyncState.error(action.payload),
    }),
  },
);

export default masterListAsync;

export const masterListThunk = createAsyncThunk(
  masterClubListAsync,
  masterClubList,
);
