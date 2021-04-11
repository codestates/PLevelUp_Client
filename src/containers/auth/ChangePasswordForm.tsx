import { faRoad } from '@fortawesome/free-solid-svg-icons';
import ChangePasswordForm from 'components/auth/ChangePasswordForm';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeFormForError,
  mainChangePasswordThunk,
} from '../../modules/main/auth';
import { mainIsLoginThunk } from '../../modules/main/user';
import { RootState } from '../../modules';

export default withRouter(function ChangePassword({ history }) {
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

  useEffect(() => {
    dispatch(mainInitializeForm('changePassword'));
    dispatch(mainInitializeFormForError(''));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response?.status === 401) {
        setError('존재하지 않는 회원입니다.');
        dispatch(mainInitializeFormForError(''));
        return;
      }
      setError('비밀번호 변경에 실패했습니다');
      dispatch(mainInitializeFormForError(''));
      return;
    }
    if (auth) {
      console.log('변경 성공');
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
      <ChangePasswordForm
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        form={form}
      />
    </>
  );
});
