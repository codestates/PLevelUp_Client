import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter from './counter';
// import auth, { authSaga } from './auth';
import loading from './loading.js';
// import user, { userSaga } from './user';

import auth from './login/reducer';
const rootReducer = combineReducers({
  // user,
  counter,
  auth,
  loading,
});
// export function* rootSaga(): Generator {
//   yield all([authSaga(), userSaga()]);
// }
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
// RootState는 추후 컨테이너 컴포넌트를 만들 때, 스토어에서 관리하고 있는 상태를 조회하기 위해
// useSelector 를 사용할 때에 필요로 하는 코드
