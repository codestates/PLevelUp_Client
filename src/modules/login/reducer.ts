import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { AuthAction, AuthState } from './types';
import { CHANGE_FIELD, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const initialState: AuthState = {
  signup: {
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
  },
  login: {
    email: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value; // 예: state.register.username을 바꾼다
    }),
  [LOGIN]: state => ({
    ...state,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    auth: action.payload,
    authError: null,
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    authError: action.payload,
  }),
});

export default auth;
