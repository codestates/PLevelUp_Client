import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';
import Button from '../../common/Button';

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
};

export default function AuthForm({ formType }: AuthFormProps) {
  const text = formTypeMap[formType];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form>
        <StyledInput autoComplete="email" name="email" placeholder="이메일" />
        {formType === 'signUp' && (
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="유저네임"
          />
        )}
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        {formType === 'signUp' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
          />
        )}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
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
