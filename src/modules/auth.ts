import { createAction, createReducer, ActionType } from 'typesafe-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

//액션타입
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FALILURE] = createRequestActionTypes(
  'auth/SIGNUP',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export type changeFieldActionProps = {
  form: string;
  key: string;
  value: string;
};

export type loginActionProps = {
  email: string;
  password: string;
};
//액션 생성 함수
export const changeField = createAction(CHANGE_FIELD)<changeFieldActionProps>();

export const initializeForm = createAction(INITIALIZE_FORM)<string>(); // signup / login

export const signup = createAction(SIGNUP, ({ email, password, username }) => ({
  email,
  password,
  username,
}));
const actions = {
  changeField,
  initializeForm,
  signup,
};
export const login = createAction(LOGIN)<loginActionProps>();
export type AuthAction = ActionType<typeof actions>;

// 사가 생성\
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
}

export type signupState = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
};
export type loginState = {
  email: string;
  password: string;
};
export type AuthState = {
  signup: signupState;
  login: loginState;
  auth: string | null;
  authError: string | null;
};
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
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    authError: null,
  }),
  [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    auth,
    authError: null,
  }),
  [SIGNUP_FALILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
  [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    authError: null,
    auth,
    sample: 'changed',
  }),
  // 로그인 실패
  [LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
});
// function auth(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_FIELD:
//       return {
//         ...state,
//         login: {
//           ...state,
//           [action.payload.key]: action.payload.value,
//         },
//       };
//     case INITIALIZE_FORM:
//       return {
//         ...state,
//         [action.payload.form]: initialState,
//       };
//     case LOGIN:
//       return {
//         ...state,
//         isLoggedIn: true,
//         accessToken: action.payload.accessToken,
//       };
//     default:
//       return state;
//   }
// }

export default auth;
