import client from './client';

//로그인
export const login = ({ email, password }) =>
  client.post('/api/main/auth/login', { email, password });

//회원가입
export const signup = ({ email, password, username }) =>
  client.post('/api/main/auth/signup', { email, password, username });
//로그인 상태 확인
export const check = () => client.get('/api/main/auth/check');

// 로그아웃
export const logout = () => client.post('/api/main/auth/logout');
