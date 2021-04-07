import React, { useState, useEffect, useRef } from 'react';
import LoginForm from '../../components/auth/LoginForm.js';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginFormContainer = ({ history }) => {
  // type LoginFormProps = {
  //   onSubmit: (id: number) => void;
  // };

  // const LoginForm = () => {
  //   const [value, setValue] = useState('');
  //   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     setValue(e.target.value);
  //   };
  //   const onSubmit = (e: FormEvent) => {
  //     e.preventDefault();
  //     //   onInsert(value);
  //     setValue('');
  //   };
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const onChange = e => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = async e => {
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
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);
  useEffect(() => {
    if (authError) {
      console.log('오류발생!');
      console.log(authError.toString());
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        console.log('localStorage is not working');
      }
    }
  }, [user, history]);
  return (
    <LoginForm
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      form={form}
    />
  );
};

export default withRouter(LoginFormContainer);
