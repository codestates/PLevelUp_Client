import { combineReducers } from 'redux';
import counter from './counter';
import { masterAuth, masterAuthAsync } from './master/auth';
import masterUser from './master/user';

const rootReducer = combineReducers({
  counter,
  masterAuth,
  masterAuthAsync,
  masterUser
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
// RootState는 추후 컨테이너 컴포넌트를 만들 때, 스토어에서 관리하고 있는 상태를 조회하기 위해
// useSelector 를 사용할 때에 필요로 하는 코드
