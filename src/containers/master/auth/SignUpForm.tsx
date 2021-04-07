import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  masterChangeField,
  masterInitializeForm,
  masterSignUpThunk,
} from '../../../modules/master/auth';
import { RootState } from '../../../modules';
import AuthForm from '../../../components/master/auth/AuthForm';
import { masterIsLoginThunk } from '../../../modules/master/user';
import { withRouter } from 'react-router-dom';

export default withRouter(function SignUpForm({ history }) {
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
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(masterSignUpThunk({ email, username, password, passwordConfirm }));
  };

  useEffect(() => {
    dispatch(masterInitializeForm('singUp'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(masterIsLoginThunk());
    }
  }, [auth, authError]);
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      <AuthForm
        formType="signUp"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
});
