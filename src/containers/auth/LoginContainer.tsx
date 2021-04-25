import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  mainChangeField,
  mainInitializeForm,
  mainInitializeAuth,
  mainLoginThunk,
  mainLoginKakaoThunk,
  mainLoginGoogleThunk,
  mainSendPasswordThunk,
  mainSendTemporaryPasswordUnload,
} from '../../modules/auth';
import { RootState } from '../../modules';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { mainIsLoginThunk } from '../../modules/user';
import { useCookies } from 'react-cookie';

export default withRouter(function LoginContainer({ history }) {
  const [error, setError] = useState('');
  const [tempPasswordError, setTempPasswordError] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const {
    form,
    data: auth,
    error: authError,
    email: emailData,
    emailError,
  } = useSelector(({ mainAuth, mainAuthAsync }: RootState) => ({
    form: mainAuth.login,
    data: mainAuthAsync.auth.data,
    error: mainAuthAsync.auth.error,
    email: mainAuthAsync.email.data,
    emailError: mainAuthAsync.email.error,
  }));

  useEffect(() => {
    if (cookies.access_token) {
      dispatch(mainIsLoginThunk());
    }
  }, [cookies.access_token]);

  const { data: user, userError } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
    userError: mainUser.user?.error,
  }));
  const handleOAuth = () => {
    dispatch(mainLoginKakaoThunk());
  };

  const handleOAuthGoogle = () => {
    dispatch(mainLoginGoogleThunk());
  };

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
      dispatch(mainInitializeAuth());
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
    if (userError) {
      setError('로그인 실패');
      return;
    }

    if (user) {
      history.push('/');
      try {
        localStorage.setItem('main', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  const onSendMail = (email: string) => {
    dispatch(mainSendPasswordThunk(email));
    console.log(email + '로보냈습니다.');
  };
  const [modal, setModal] = useState(false);
  const onFindPasswordClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = (email: string) => {
    onSendMail(email);
  };
  useEffect(() => {
    if (emailData) {
      alert('임시비밀번호가 정상발급 되었습니다.');
      setModal(false);
      dispatch(mainSendTemporaryPasswordUnload());
    }
    if (emailError) {
      if (emailError.response?.status === 401) {
        setTempPasswordError('존재하지 않는 이메일입니다.');
      } else {
        setTempPasswordError(
          '알 수 없는 에러가 발생했습니다. 다시 한 번 시도해주세요.',
        );
      }
      dispatch(mainSendTemporaryPasswordUnload());
    }
  }, [emailData, emailError]);
  return (
    <LoginForm
      form={form}
      handleOAuth={handleOAuth}
      handleOAuthGoogle={handleOAuthGoogle}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      tempPasswordError={tempPasswordError}
      modal={modal}
      onFindPasswordClick={onFindPasswordClick}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
});
