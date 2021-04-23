import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  masterChangeField,
  masterInitializeForm,
  masterInitializeAuth,
  masterSignUpThunk,
} from '../../../modules/master/auth';
import { RootState } from '../../../modules';
import AuthForm from '../../../components/master/auth/AuthForm';
import MasterSignUpForm from '../../../components/master/auth/MasterSignUpForm';
import { masterIsLoginThunk } from '../../../modules/master/user';
import { withRouter } from 'react-router-dom';

export default withRouter(function SignUpForm({ history }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    loading: authLoading,
    error: authError,
  } = useSelector(({ masterAuth, masterAuthAsync }: RootState) => ({
    form: masterAuth.signUp,
    data: masterAuthAsync.auth.data,
    loading: masterAuthAsync.auth.loading,
    error: masterAuthAsync.auth.error,
  }));
  const { data: user, loading: userLoading, error: userError } = useSelector(
    ({ masterUser }: RootState) => ({
      data: masterUser.user?.data,
      loading: masterUser.user?.loading,
      error: masterUser.user?.error,
    }),
  );

  const loading = authLoading || userLoading;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      masterChangeField({
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
      dispatch(
        masterChangeField({ form: 'signUp', key: 'password', value: '' }),
      );
      dispatch(
        masterChangeField({
          form: 'signUp',
          key: 'passwordConfirm',
          value: '',
        }),
      );
      return;
    }
    dispatch(masterSignUpThunk({ email, username, password, passwordConfirm }));
  };

  useEffect(() => {
    dispatch(masterInitializeForm('signUp'));
    return () => {
      dispatch(masterInitializeAuth(''));
    };
  }, []);

  useEffect(() => {
    if (authError) {
      if (authError.response?.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      // console.log('회원가입 성공');
      // console.log(auth);
      dispatch(masterIsLoginThunk());
    }
  }, [auth, authError]);
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
    <>
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      <MasterSignUpForm
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
});
