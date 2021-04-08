import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { AuthAction, AuthState } from './types';
import { CHANGE_FIELD } from './actions';

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

const auth = createReducer(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value; // 예: state.register.username을 바꾼다
    }),
});

export default auth;
