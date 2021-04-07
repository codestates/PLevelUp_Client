import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  masterChangeField,
  masterInitializeForm,
} from '../../../modules/master/auth';
import { RootState } from '../../../modules';
import AuthForm from '../../../components/master/auth/AuthForm';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { form } = useSelector(({ masterAuth }: RootState) => ({
    form: masterAuth.login,
  }));

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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(masterInitializeForm('login'));
  }, [dispatch]);

  return (
    <AuthForm
      formType="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
