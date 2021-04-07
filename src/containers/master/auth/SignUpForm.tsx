import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import {
  masterChangeField,
  masterInitializeForm,
} from '../../../modules/master/auth';
import { RootState } from '../../../modules';
import AuthForm from '../../../components/master/auth/AuthForm';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const { form } = useSelector(({ masterAuth }: RootState) => ({
    form: masterAuth.signUp,
  }));

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
  };

  useEffect(() => {
    dispatch(masterInitializeForm('singUp'));
  }, [dispatch]);

  return (
    <AuthForm
      formType="signUp"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
