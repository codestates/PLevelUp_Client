import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeAuth,
  mainSignUpThunk,
  mainLoginKakaoThunk,
  mainLoginGoogleThunk,
} from '../../modules/auth';
import { RootState } from '../../modules';
import AuthForm from '../../components/auth/AuthForm';
import { mainIsLoginThunk } from '../../modules/user';
import { withRouter } from 'react-router-dom';

export default withRouter(function SignUpContainer({ history }) {
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

  const handleOAuth = () => {
    dispatch(mainLoginKakaoThunk());
  };

  const handleOAuthGoogle = () => {
    dispatch(mainLoginGoogleThunk());
  };

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

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, username, password, passwordConfirm } = form;

    // 하나라도 비어 있다면
    if ([email, username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
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

  // 컴포넌트가 처음 렌더링될 때 form 을 초기화 함
  useEffect(() => {
    dispatch(mainInitializeForm('signUp'));
    return () => {
      dispatch(mainInitializeAuth(''));
    };
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      // 계정명이 이미 존재할 때
      if (authError.response?.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      if (authError.response?.status === 400) {
        if (
          authError.response.data ===
          '"password" length must be at least 6 characters long'
        )
          setError('비밀번호는 6자리 이상이어야 합니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }

    if (auth) {
      // console.log('회원가입 성공');
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
    <>
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      <AuthForm
        formType="signUp"
        form={form}
        handleOAuth={handleOAuth}
        handleOAuthGoogle={handleOAuthGoogle}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        modal={null} //TODO 임시.. 로그인/회원가입 분리해야하는 것 같다.
        onFindPasswordClick={null}
        onCancel={null}
        onConfirm={null}
      />
    </>
  );
});
