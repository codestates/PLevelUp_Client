import createAsyncThunk, {
  createRequestActionTypes,
} from '../../../lib/createAsyncThunk';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  MasterClubReadResType,
  masterClubRead,
} from '../../../api/master/club';
import { AsyncState, asyncState } from '../../../lib/reducerUtils';

// async 액션 타입
const [
  MASTER_CLUB_READ,
  MASTER_CLUB_READ_SUCCESS,
  MASTER_CLUB_READ_FAILURE,
] = createRequestActionTypes('master-read/MASTER_CLUB_READ'); // 클럽 작성

// async 생성 함수
export const masterClubReadAsync = createAsyncAction(
  MASTER_CLUB_READ,
  MASTER_CLUB_READ_SUCCESS,
  MASTER_CLUB_READ_FAILURE,
)<any, MasterClubReadResType, AxiosError>();

// 액션 타입
const MASTER_CLUB_UNLOAD_READ = 'master-read/MASTER_CLUB_UNLOAD_READ';

export const masterClubUnloadRead = createAction(
  MASTER_CLUB_UNLOAD_READ,
)<string>();

// async 액션
const asyncActions = { masterClubReadAsync, masterClubUnloadRead };
type ReadAsyncAction = ActionType<typeof asyncActions>;

// const actions = { masterClubUnloadRead };
// type ReadAction = ActionType<typeof actions>;

type ReadAsyncState = {
  club: AsyncState<MasterClubReadResType, Error>;
};

const asyncInitialState: ReadAsyncState = {
  club: asyncState.initial(),
};

export const masterReadAsync = createReducer<ReadAsyncState, ReadAsyncAction>(
  asyncInitialState,
  {
    [MASTER_CLUB_READ]: state => ({
      ...state,
      club: asyncState.load(),
    }),
    [MASTER_CLUB_READ_SUCCESS]: (state, action) => ({
      ...state,
      club: asyncState.success(action.payload),
    }),
    [MASTER_CLUB_READ_FAILURE]: (state, action) => ({
      ...state,
      club: asyncState.error(action.payload),
    }),
    [MASTER_CLUB_UNLOAD_READ]: (_, __) => ({
      club: asyncState.initial(),
    }),
  },
);

export const masterClubReadThunk = createAsyncThunk(
  masterClubReadAsync,
  masterClubRead,
);
