// import { createAction, createReducer, ActionType } from 'typesafe-actions';
// import { takeLatest, call } from 'redux-saga/effects';
// import * as authAPI from '../lib/api/auth';
// import createRequestSaga, {
//   createRequestActionTypes,
// } from '../lib/createRequestSaga';

// const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// // 회원 정보 확인
// const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
//   'user/CHECK',
// );
// const LOGOUT = 'user/LOGOUT';

// export type detailUserState = {
//   _id: number;
//   email: string;
// };
// export type UserState = {
//   user: null | detailUserState;
//   checkError: null | string;
// };

// export const tempSetUser = createAction(TEMP_SET_USER)<detailUserState>();
// export const check = createAction(CHECK)<detailUserState>();
// export const logout = createAction(LOGOUT)();

// const actions = {
//   tempSetUser,
//   check,
//   logout,
// };
// export type UserAction = ActionType<typeof actions>;
// const checkSaga = createRequestSaga(CHECK, authAPI.check);

// function checkFailureSaga() {
//   try {
//     localStorage.removeItem('user'); // localStorage 에서 user 제거하고
//   } catch (e) {
//     console.log('localStorage is not working');
//   }
// }

// function* logoutSaga() {
//   try {
//     yield call(authAPI.logout); // logout API 호출
//     localStorage.removeItem('user'); // localStorage 에서 user 제거
//   } catch (e) {
//     console.log(e);
//   }
// }

// export function* userSaga() {
//   yield takeLatest(CHECK, checkSaga);
//   yield takeLatest(CHECK_FAILURE, checkFailureSaga);
//   yield takeLatest(LOGOUT, logoutSaga);
// }

// const initialState: UserState = {
//   user: null,
//   checkError: null,
// };

// const user = createReducer<UserState, UserAction>(initialState, {
//   [CHECK_SUCCESS]: (state, { payload: user }) => ({
//     ...state,
//     user,
//     checkError: null,
//   }),
//   [CHECK_FAILURE]: (state, { payload: error }) => ({
//     ...state,
//     user: null,
//     checkError: error,
//   }),
//   [TEMP_SET_USER]: (state, { payload: user }) => ({
//     ...state,
//     user,
//   }),
//   [LOGOUT]: (state, _) => ({
//     ...state,
//     user: null,
//   }),
// });

// export default user;
export default {};
