import AuthTemplate from '../../components/master/auth/AuthTemplate';
import LoginForm from '../../containers/master/auth/LoginForm';

export default function MasterLoginPage() {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
}
