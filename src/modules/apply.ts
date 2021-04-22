import createAsyncThunk, {
  createRequestActionTypes,
} from '../lib/createAsyncThunk';
import {
  ActionType,
  createAsyncAction,
  createAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AsyncState, asyncState } from '../lib/reducerUtils';
import { mainApplyList, MainApplyListResType } from '../api/main/myPage';

const [
  MAIN_APPLY,
  MAIN_APPLY_SUCCESS,
  MAIN_APPLY_FAILURE,
] = createRequestActionTypes('main-apply/ MAIN_APPLY');

export const mainApplyAsync = createAsyncAction(
  MAIN_APPLY,
  MAIN_APPLY_SUCCESS,
  MAIN_APPLY_FAILURE,
)<any, MainApplyListResType, AxiosError>();

const MAIN_APPLY_UNLOAD = 'main-apply/MAIN_APPLY_UNLOAD';

export const mainApplyUnload = createAction(MAIN_APPLY_UNLOAD);

const asyncActions = { mainApplyAsync, mainApplyUnload };
type ApplyAsyncAction = ActionType<typeof asyncActions>;

type ApplyAsyncState = {
  apply: AsyncState<MainApplyListResType, Error>;
};

const asyncInitialState: ApplyAsyncState = {
  apply: asyncState.initial(),
};

export const mainApplyListAsync = createReducer<
  ApplyAsyncState,
  ApplyAsyncAction
>(asyncInitialState, {
  [MAIN_APPLY]: state => ({
    ...state,
    apply: asyncState.load(),
  }),
  [MAIN_APPLY_SUCCESS]: (state, action) => ({
    ...state,
    apply: asyncState.success(action.payload),
  }),
  [MAIN_APPLY_FAILURE]: (state, action) => ({
    ...state,
    apply: asyncState.error(action.payload),
  }),
  [MAIN_APPLY_UNLOAD]: () => asyncInitialState,
});
export default mainApplyListAsync;

export const mainApplyThunk = createAsyncThunk(mainApplyAsync, mainApplyList);
