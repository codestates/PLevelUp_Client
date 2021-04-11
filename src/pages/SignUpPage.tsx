import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import SignUpForm from '../containers/auth/SignUpForm';
export default function SignUpPage() {
  return (
    <AuthTemplate type="signUp">
      <SignUpForm />
    </AuthTemplate>
  );
}
