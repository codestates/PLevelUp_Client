import { createAction, handleActions } from 'redux-actions';
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

//액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // signup , login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);
// export const changeField = ({ key, value }) => ({
//   type: CHANGE_FIELD,
//   payload: {
//     key,
//     value,
//   },
// });

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // signup / login
// export const initializeForm = form => ({
//   type: INITIALIZE_FORM,
//   payload: {
//     form,
//   },
// });

export const signup = createAction(SIGNUP, ({ email, password, username }) => ({
  email,
  password,
  username,
}));

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));
// type UserAction = ReturnType<typeof login> | ReturnType<typeof changeField>;

// type UserState = {
//   isLoggedIn: boolean;
//   accessToken: string;
// };
// 사가 생성\
console.log(authAPI.signup);
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
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

const auth = handleActions(
  {
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
  },
  initialState,
);
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
