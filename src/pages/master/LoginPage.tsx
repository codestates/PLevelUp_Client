import AuthTemplate from '../../components/master/auth/AuthTemplate';
import AuthForm from '../../components/master/auth/AuthForm';

export default function MasterLoginPage() {
  return (
    <AuthTemplate>
      <AuthForm formType="login" />
    </AuthTemplate>
  );
}
