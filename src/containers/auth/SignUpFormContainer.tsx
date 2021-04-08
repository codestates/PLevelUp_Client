import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainIsLoginThunk } from '../../modules/main/user';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeFormForError,
  mainSignUpThunk,
} from '../../modules/main/auth';

import SignUpForm from '../../components/auth/SignUpForm.js';

export default withRouter(function SignUpFormContainer({ history }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    loading: authLoading,
    error: authError,
  } = useSelector(({ mainAuth, mainAuthAsync }: RootState) => ({
    form: mainAuth.signUp,
    data: mainAuthAsync.auth.data,
    loading: mainAuthAsync.auth.loading,
    error: mainAuthAsync.auth.error,
  }));
  const { data: user, loading: userLoading, error: userError } = useSelector(
    ({ mainUser }: RootState) => ({
      data: mainUser.user?.data,
      loading: mainUser.user?.loading,
      error: mainUser.user?.error,
    }),
  );
  const loading = authLoading || userLoading;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      mainChangeField({
        form: 'signUp',
        key: name,
        value: value,
      }),
    );
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, username, password, passwordConfirm } = form;
    if ([email, username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(mainChangeField({ form: 'signUp', key: 'password', value: '' }));
      dispatch(
        mainChangeField({
          form: 'signUp',
          key: 'passwordConfirm',
          value: '',
        }),
      );
      return;
    }
    dispatch(mainSignUpThunk({ email, username, password, passwordConfirm }));
  };

  useEffect(() => {
    dispatch(mainInitializeForm('singUp'));
    dispatch(mainInitializeFormForError(''));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response?.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        dispatch(mainInitializeFormForError(''));
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      dispatch(mainInitializeFormForError(''));
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(mainIsLoginThunk());
      dispatch(mainInitializeFormForError(''));
    }
  }, [auth, authError]);
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
    <>
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      <SignUpForm
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        form={form}
      />
    </>
  );
});
