import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { mainIsLoginThunk } from '../../modules/user';
import { RootState } from '../../modules';
import {
  mainChangePasswordThunk,
  mainMyPageUnloadChangePassword,
  myPageChangeField,
} from '../../modules/my-page/changePassword';
import ChangePasswordForm from '../../components/my-page/ChangePasswordForm';

export default withRouter(function ChangePasswordFormContainer({ history }) {
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    loading: authLoading,
    error: authError,
  } = useSelector(
    ({ mainChangePassword, mainChangePasswordAsync }: RootState) => ({
      form: mainChangePassword,
      data: mainChangePasswordAsync.data,
      loading: mainChangePasswordAsync.loading,
      error: mainChangePasswordAsync.error,
    }),
  );
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const loading = authLoading;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      myPageChangeField({
        key: name,
        value: value,
      }),
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, changePassword, changePasswordConfirm } = form;
    if (!password || !changePassword || !changePasswordConfirm) {
      setError('빈칸을 모두 입력해주세요.');
      return;
    }
    if (changePassword !== changePasswordConfirm) {
      setError('새 비밀번호와 새 비밀번호 확인이 다릅니다.');
      return;
    }
    dispatch(
      mainChangePasswordThunk({
        password,
        changePassword,
        changePasswordConfirm,
      }),
    );
  };

  useEffect(() => {
    if (authError) {
      if (authError.response?.status === 401)
        setError('비밀번호를 다시 확인해주세요.');
      return;
    }
    if (auth) {
      dispatch(mainIsLoginThunk());
    }
  }, [auth, authError]);

  useEffect(() => {
    dispatch(mainMyPageUnloadChangePassword());
  }, []);

  useEffect(() => {
    if (auth && user) {
      history.push('/mypage');
      try {
        localStorage.setItem('main', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user, auth]);
  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      <ChangePasswordForm
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
});
