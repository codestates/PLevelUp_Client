//import ChangePasswordForm from 'components/auth/ChangePasswordForm';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeAuth,
  mainChangePasswordThunk,
} from '../../modules/auth';
import { mainIsLoginThunk } from '../../modules/user';
import { RootState } from '../../modules';
import AuthForm from '../../components/auth/AuthForm';

export default withRouter(function ChangePasswordForm({ history }) {
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    loading: authLoading,
    error: authError,
  } = useSelector(({ mainAuth, mainAuthAsync }: RootState) => ({
    form: mainAuth.changePassword,
    data: mainAuthAsync.auth.data,
    loading: mainAuthAsync.auth.loading,
    error: mainAuthAsync.auth.error,
  }));
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const loading = authLoading;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      mainChangeField({
        form: 'changePassword',
        key: name,
        value: value,
      }),
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, changePassword, passwordConfirm } = form;
    if ([email, password, changePassword, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (changePassword !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(
        mainChangeField({
          form: 'changePassword',
          key: 'changePassword',
          value: '',
        }),
      );
      dispatch(
        mainChangeField({
          form: 'changePassword',
          key: 'changePassword',
          value: '',
        }),
      );
      return;
    }
    dispatch(
      mainChangePasswordThunk({
        email,
        password,
        changePassword,
      }),
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form 을 초기화 함
  useEffect(() => {
    dispatch(mainInitializeForm('changePassword'));
    return () => {
      dispatch(mainInitializeAuth(''));
    };
  }, []);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('비밀번호 변경 실패');
      return;
    }
    if (auth) {
      console.log('변경 성공');
      console.log(auth);
      dispatch(mainIsLoginThunk());
    }
  }, [auth, authError]);

  useEffect(() => {
    if (user) {
      history.push('/mypage');
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
      <AuthForm
        formType="changePassword"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
});
