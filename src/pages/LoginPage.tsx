import React from 'react';
import LoginForm from '../containers/auth/LoginForm';
import AuthTemplate from '../components/auth/AuthTemplate';

export default function LoginPage() {
  return (
    <AuthTemplate type="login">
      <LoginForm />
    </AuthTemplate>
  );
}
