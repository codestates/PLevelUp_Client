import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeAuth,
  mainLoginThunk,
} from '../../modules/auth';
import { RootState } from '../../modules';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { mainIsLoginThunk } from '../../modules/user';

export default withRouter(function LoginForm({ history }) {
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

  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));
  const loading = authLoading;

  // 인풋 변경 이벤트 핸들러
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

  // 폼 등록 이벤트 핸들러
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
  // 컴포넌트가 처음 렌더링될 때 form 을 초기화 함
  useEffect(() => {
    dispatch(mainInitializeForm('login'));
    return () => {
      dispatch(mainInitializeAuth(''));
    };
  }, []);

  useEffect(() => {
    if (authError) {
      // console.log('오류 발생');
      // console.log(authError);
      setError('이메일 혹은 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (auth) {
      // console.log('로그인 성공');
      // console.log(auth);
      dispatch(mainIsLoginThunk());
    }
  }, [auth, authError]);

  // user 값이 잘 설정되었는지 확인
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
    <AuthForm
      formType="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
});
