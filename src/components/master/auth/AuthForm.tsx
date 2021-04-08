import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';
import Button from '../../common/Button';
import { ChangeEvent, FormEvent } from 'react';
import {
  MasterLoginReqType,
  MasterSignUpReqType,
} from '../../../api/master/auth';

/**
 * 회원 가입 / 로그인 폼 보여주기
 */
const AuthFormBlock = styled.div`
  h3 {
    color: ${palette.gray[8]};
    margin: 0 0 1rem;
  }
`;

/**
 * 스타일링된 input
 */

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;

  &:focus {
    color: #0ca678; // $oc-teal-7
    border-bottom: 1px solid ${palette.gray[7]};
  }

  & + & {
    margin-top: 1rem;
  }
`;
/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;

  a {
    color: ${palette.gray[6]};
    text-decoration: underline;

    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

type formTypeMapType = {
  [index: string]: string;
  login: string;
  signUp: string;
};

const formTypeMap: formTypeMapType = {
  login: '로그인',
  signUp: '회원가입',
};

type AuthFormProps = {
  formType: string;
  form: MasterSignUpReqType | MasterLoginReqType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

export default function AuthForm({
  formType,
  form,
  onChange,
  onSubmit,
  error,
}: AuthFormProps) {
  const formTypeText = formTypeMap[formType];
  return (
    <AuthFormBlock>
      <h3>{formTypeText}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onChange={onChange}
          value={form.email}
        />
        {formType === 'signUp' && (
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="유저네임"
            onChange={onChange}
            value={form.username}
          />
        )}
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {formType === 'signUp' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {(error !== '' || error) && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth>
          {formTypeText}
        </ButtonWithMarginTop>
      </form>
      <footer>
        {formType === 'login' ? (
          <Link to="/master/sign-up">회원가입</Link>
        ) : (
          <Link to="/master/login">로그인</Link>
        )}
      </footer>
    </AuthFormBlock>
  );
}
