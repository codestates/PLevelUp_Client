import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  masterChangeField,
  masterInitializeForm,
  masterInitializeFormForError,
  masterLoginThunk,
} from '../../../modules/master/auth';
import { RootState } from '../../../modules';
import AuthForm from '../../../components/master/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { masterIsLoginThunk } from '../../../modules/master/user';

export default withRouter(function LoginForm({ history }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    loading: authLoading,
    error: authError,
  } = useSelector(({ masterAuth, masterAuthAsync }: RootState) => ({
    form: masterAuth.login,
    data: masterAuthAsync.auth.data,
    loading: masterAuthAsync.auth.loading,
    error: masterAuthAsync.auth.error,
  }));

  const { data: user } = useSelector(({ masterUser }: RootState) => ({
    data: masterUser.user?.data,
  }));

  const loading = authLoading;

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      masterChangeField({
        form: 'login',
        key: name,
        value: value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(masterLoginThunk({ email, password }));
  };

  useEffect(() => {
    dispatch(masterInitializeForm('login'));
    dispatch(masterInitializeFormForError(''));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      dispatch(masterInitializeFormForError(''));
      return;
    }

    if (auth) {
      console.log('로그인 성공');
      console.log(auth);
      dispatch(masterIsLoginThunk());
      dispatch(masterInitializeFormForError(''));
    }
  }, [auth, authError]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('master', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  return (
    <AuthForm
      formType="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
});
