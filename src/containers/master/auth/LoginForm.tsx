import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  masterChangeField,
  masterInitializeForm,
  masterInitializeAuth,
  masterLoginThunk,
} from '../../../modules/master/auth';
import { RootState } from '../../../modules';
import MasterLoginForm from '../../../components/master/auth/MasterLoginForm';
import { withRouter } from 'react-router-dom';
import { masterIsLoginThunk } from '../../../modules/master/user';

export default withRouter(function LoginForm({ history }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { form, data: auth, error: authError } = useSelector(
    ({ masterAuth, masterAuthAsync }: RootState) => ({
      form: masterAuth.login,
      data: masterAuthAsync.auth.data,
      loading: masterAuthAsync.auth.loading,
      error: masterAuthAsync.auth.error,
    }),
  );

  const { data: user, userError } = useSelector(
    ({ masterUser }: RootState) => ({
      data: masterUser.user?.data,
      userError: masterUser.user?.error,
    }),
  );

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
    return () => {
      dispatch(masterInitializeAuth(''));
    };
  }, []);

  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
      return;
    }

    if (auth) {
      dispatch(masterIsLoginThunk());
    }
  }, [auth, authError]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (userError) {
      setError('로그인 실패');
    }

    if (user) {
      history.push('/master');
      try {
        localStorage.setItem('master', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  return (
    <MasterLoginForm
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
});
