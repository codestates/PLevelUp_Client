import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm.js';
//* import about saga
import { useDispatch, useSelector } from 'react-redux';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeFormForError,
  mainLoginThunk,
} from '../../modules/main/auth';
import { mainIsLoginThunk } from '../../modules/main/user';
import { RootState } from '../../modules';

export default withRouter(function LoginFormContainer({ history }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    loading: authLoading,
    error: authError,
  } = useSelector(({ mainAuth, mainAuthAsync }: RootState) => ({
    form: mainAuth.login,
    data: mainAuthAsync.auth.data,
    loading: mainAuthAsync.auth.loading,
    error: mainAuthAsync.auth.error,
  }));

  const loading = authLoading;

  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));
  //인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      mainChangeField({
        form: 'login',
        key: name,
        value: value,
      }),
    );
  };
  // 폼 제출 이벤트 핸들러
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = form;
    if (email === '') {
      setError('이메일을 입력해주세요.');
      return;
    }
    if (password === '') {
      setError('비밀번호를 입력해주세요.');
      return;
    }
    dispatch(mainLoginThunk({ email, password }));
  };

  //제출 시 인풋 폼 초기화
  useEffect(() => {
    dispatch(mainInitializeForm('login'));
    dispatch(mainInitializeFormForError(''));
  }, [dispatch]);

  // 로그인으로 auth인증 성공 시 isLogin으로 로그인유저정보 받기
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      dispatch(mainInitializeFormForError(''));
      return;
    }

    if (auth) {
      console.log('로그인 성공');
      console.log(auth);
      dispatch(mainIsLoginThunk());
      dispatch(mainInitializeFormForError(''));
    }
  }, [auth, authError]);

  // isLogin으로 로그인 유저정보 받아올 경우 로컬스토리지에 해당 유저정보 저장
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('main', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  return (
    <LoginForm
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      form={form}
    />
  );
});
