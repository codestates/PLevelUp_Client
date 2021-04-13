import createAsyncThunk, { createRequestActionTypes } from '../../../lib/createAsyncThunk';
import { ActionType, createAction, createAsyncAction, createReducer } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { MasterClubEditReqType, MasterClubEditResType, masterClubWrite } from '../../../api/master/club';
import { AsyncState, asyncState } from '../../../lib/reducerUtils';

// async 액션 타입
const [
  MASTER_CLUB_WRITE,
  MASTER_CLUB_WRITE_SUCCESS,
  MASTER_CLUB_WRITE_FAILURE,
] = createRequestActionTypes('master-edit/MASTER_CLUB_WRITE'); // 클럽 작성


// async 생성 함수
export const masterClubWriteAsync = createAsyncAction(
  MASTER_CLUB_WRITE,
  MASTER_CLUB_WRITE_SUCCESS,
  MASTER_CLUB_WRITE_FAILURE,
)<any, MasterClubEditResType, AxiosError>();

// async 액션
const asyncActions = {
  masterClubWriteAsync,
};
type EditAsyncAction = ActionType<typeof asyncActions>;

// 액션 타입
const MASTER_EDIT_INITIALIZE = 'master-edit/MASTER_EDIT_INITIALIZE'; // 모든 내용 초기화
const MASTER_EDIT_CHANGE_FIELD = 'master-edit/MASTER_EDIT_CHANGE_FIELD';

// 액션 생성 함수
type ChangeFieldProps = {
  key: string;
  value: string | Date | number;
};

export const masterEditInitialize = createAction(MASTER_EDIT_INITIALIZE)();
export const masterEditChangeField = createAction(MASTER_EDIT_CHANGE_FIELD)<ChangeFieldProps>();

// 액션
const actions = {
  masterEditInitialize,
  masterEditChangeField,
};
type EditAction = ActionType<typeof actions>;

type EditAsyncState = {
  club: AsyncState<MasterClubEditResType, Error>;
};

const asyncInitialState: EditAsyncState = {
  club: asyncState.initial(),
};

// type EditState = {
//   [index: string]: string | number | Date;
// };

type EditState = MasterClubEditReqType;

const initialState: EditState = {
    title: '',
    summary: '',
    place: '',
    price: 0,
    description: '',
    topic: '',
    startDate: new Date(),
    endDate: new Date(),
    day: '',
    limitUserNumber: 1,
};

export const masterEditAsync = createReducer<EditAsyncState, EditAsyncAction>(
  asyncInitialState,
  {
    [MASTER_CLUB_WRITE]: state => ({
      ...state,
      club: asyncState.load(),
    }),
    [MASTER_CLUB_WRITE_SUCCESS]: (state, action) => ({
      ...state,
      club: asyncState.success(action.payload),
    }),
    [MASTER_CLUB_WRITE_FAILURE]: (state, action) => ({
      ...state,
      club: asyncState.error(action.payload),
    }),
  },
);

export const masterEdit = createReducer<EditState, EditAction>(
  initialState,
  {
  [MASTER_EDIT_CHANGE_FIELD]: (state, { payload: { key, value } }) =>
    ({
      ...state,
      [key]: value,
    }),
  [MASTER_EDIT_INITIALIZE]: _ => initialState, // initialState를 넣으면 초기 상태로 바뀜
  },
);

export const masterClubWriteThunk = createAsyncThunk(masterClubWriteAsync, masterClubWrite);
