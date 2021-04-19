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
  MasterClubEditReqType,
  MasterClubEditResType,
  masterClubUpdate,
  masterClubWrite,
} from '../../../api/master/club';
import { AsyncState, asyncState } from '../../../lib/reducerUtils';
import produce from 'immer';

// async 액션 타입
const [
  MASTER_CLUB_WRITE,
  MASTER_CLUB_WRITE_SUCCESS,
  MASTER_CLUB_WRITE_FAILURE,
] = createRequestActionTypes('master-edit/MASTER_CLUB_WRITE'); // 클럽 작성

const [
  MASTER_CLUB_UPDATE,
  MASTER_CLUB_UPDATE_SUCCESS,
  MASTER_CLUB_UPDATE_FAILURE,
] = createRequestActionTypes('master-edit/MASTER_CLUB_UPDATE'); // 클럽 수정

// async 생성 함수
export const masterClubWriteAsync = createAsyncAction(
  MASTER_CLUB_WRITE,
  MASTER_CLUB_WRITE_SUCCESS,
  MASTER_CLUB_WRITE_FAILURE,
)<any, MasterClubEditResType, AxiosError>();
export const masterClubUpdateAsync = createAsyncAction(
  MASTER_CLUB_UPDATE,
  MASTER_CLUB_UPDATE_SUCCESS,
  MASTER_CLUB_UPDATE_FAILURE,
)<any, MasterClubEditResType, AxiosError>();

// async 액션
const asyncActions = {
  masterClubWriteAsync,
  masterClubUpdateAsync,
};
type EditAsyncAction = ActionType<typeof asyncActions>;

// 액션 타입
const MASTER_EDIT_INITIALIZE = 'master-edit/MASTER_EDIT_INITIALIZE'; // 모든 내용 초기화
const MASTER_EDIT_CHANGE_FIELD = 'master-edit/MASTER_EDIT_CHANGE_FIELD';
const MASTER_EDIT_SET_ORIGINAL_CLUB =
  'master-edit/MASTER_EDIT_SET_ORIGINAL_CLUB';

const MASTER_CLUB_UNLOAD_EDIT = 'master-edit/MASTER_CLUB_UNLOAD_EDIT';

export const masterClubUnloadEdit = createAction(MASTER_CLUB_UNLOAD_EDIT)();

// 액션 생성 함수
type ChangeFieldProps = {
  key: string;
  value: string | Date | number | File;
};

export const masterEditInitialize = createAction(MASTER_EDIT_INITIALIZE)();
export const masterEditChangeField = createAction(
  MASTER_EDIT_CHANGE_FIELD,
)<ChangeFieldProps>();
export const masterEditSetOriginalClub = createAction(
  MASTER_EDIT_SET_ORIGINAL_CLUB,
)<MasterClubEditResType>();

// 액션
const actions = {
  masterEditInitialize,
  masterEditChangeField,
  masterEditSetOriginalClub,
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

type EditState = {
  club: MasterClubEditReqType;
};

const initialState: EditState = {
  club: {
    id: null,
    title: '',
    summary: '',
    place: '',
    price: 0,
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    day: '',
    limitUserNumber: 1,
    coverImg: null,
    coverUrl: null,
  },
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
    [MASTER_CLUB_UPDATE_SUCCESS]: (state, action) => ({
      ...state,
      club: asyncState.success(action.payload),
    }),
    [MASTER_CLUB_UPDATE_FAILURE]: (state, action) => ({
      ...state,
      club: asyncState.error(action.payload),
    }),
    [MASTER_CLUB_UNLOAD_EDIT]: _ => asyncInitialState,
  },
);

export const masterEdit = createReducer<EditState, EditAction>(initialState, {
  [MASTER_EDIT_CHANGE_FIELD]: (state, { payload: { key, value } }) =>
    produce(state, draft => {
      draft['club'][key] = value;
    }),
  [MASTER_EDIT_INITIALIZE]: _ => initialState, // initialState를 넣으면 초기 상태로 바뀜
  // 수정시
  [MASTER_EDIT_SET_ORIGINAL_CLUB]: (state, { payload: club }) =>
    produce(state, draft => {
      draft['club']['id'] = club.id;
      draft['club']['title'] = club.title;
      draft['club']['summary'] = club.summary;
      draft['club']['place'] = club.place;
      draft['club']['price'] = club.price;
      draft['club']['description'] = club.description;
      draft['club']['startDate'] = club.startDate;
      draft['club']['endDate'] = club.endDate;
      draft['club']['day'] = club.day;
      draft['club']['limitUserNumber'] = club.limitUserNumber;
      if (club.coverImg) {
        draft['club']['coverImg'] = club.coverImg;
      }
      draft['club']['coverUrl'] = club.coverUrl;
    }),
});

export const masterClubWriteThunk = createAsyncThunk(
  masterClubWriteAsync,
  masterClubWrite,
);

export const masterClubUpdateThunk = createAsyncThunk(
  masterClubUpdateAsync,
  masterClubUpdate,
);
