import { createAction } from 'typesafe-actions';
import createRequestActionTypes from '../../lib/createRequestSaga';
//액션타입

export const CHANGE_FIELD = 'auth/CHANGE_FIELD';
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const SIGNUP = 'auth/SIGNUP';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FALILURE = 'auth/SIGNUP_FALILURE';

export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
)();

// export const [
//   SIGNUP,
//   SIGNUP_SUCCESS,
//   SIGNUP_FALILURE,
// ] = createRequestActionTypes('auth/SIGNUP');
// const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
//   'auth/LOGIN',
// );
