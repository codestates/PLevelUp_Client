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
import { MainClubReadResType, mainClubRead } from '../../api/main/club';
import { AsyncState, asyncState } from '../../lib/reducerUtils';

// async 액션 타입
const [
  MAIN_CLUB_READ,
  MAIN_CLUB_READ_SUCCESS,
  MAIN_CLUB_READ_FAILURE,
] = createRequestActionTypes('main-read/MAIN_CLUB_READ'); // 클럽 작성

// async 생성 함수
export const mainClubReadAsync = createAsyncAction(
  MAIN_CLUB_READ,
  MAIN_CLUB_READ_SUCCESS,
  MAIN_CLUB_READ_FAILURE,
)<any, MainClubReadResType, AxiosError>();

// 액션 타입
const MAIN_CLUB_UNLOAD_READ = 'main-read/MAIN_CLUB_UNLOAD_READ';

export const mainClubUnloadRead = createAction(MAIN_CLUB_UNLOAD_READ);

// async 액션
const asyncActions = { mainClubReadAsync, mainClubUnloadRead };
type ReadAsyncAction = ActionType<typeof asyncActions>;

type ReadAsyncState = {
  club: AsyncState<MainClubReadResType, Error>;
};

const asyncInitialState: ReadAsyncState = {
  club: asyncState.initial(),
};

export const mainReadAsync = createReducer<ReadAsyncState, ReadAsyncAction>(
  asyncInitialState,
  {
    [MAIN_CLUB_READ]: state => ({
      ...state,
      club: asyncState.load(),
    }),
    [MAIN_CLUB_READ_SUCCESS]: (state, action) => {
      return {
        ...state,
        club: asyncState.success(action.payload),
      };
    },
    [MAIN_CLUB_READ_FAILURE]: (state, action) => ({
      ...state,
      club: asyncState.error(action.payload),
    }),
    [MAIN_CLUB_UNLOAD_READ]: () => asyncInitialState,
  },
);

export const mainClubReadThunk = createAsyncThunk(
  mainClubReadAsync,
  mainClubRead,
);
