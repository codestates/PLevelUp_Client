import AuthTemplate from '../../components/master/auth/AuthTemplate';
import SignUpForm from '../../containers/master/auth/SignUpForm';

export default function MasterSignUpPage() {
  return (
    <AuthTemplate type="signUp">
      <SignUpForm />
    </AuthTemplate>
  );
}
