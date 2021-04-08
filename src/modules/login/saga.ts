import { call, put, takeLatest } from 'redux-saga/effects';
import { loginAPI } from '../../lib/api/login';
import { AuthAction } from './types';

function* fetch(action: AuthAction) {
  console.log('4-fetch befor start');
  try {
    const response = yield call(loginAPI, action.payload);
    console.log('5-fetch response');
    yield put({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: 'LOGIN_FAILURE',
      payload: err.message,
      error: true,
    });
  }
}

export function* originalLoginSaga() {
  console.log('3-originalLoginSaga');
  yield takeLatest('LOGIN', fetch);
}
