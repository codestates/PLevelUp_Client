import styled from 'styled-components';

/**
 * 회원 가입 / 로그인 페이지의 레이아웃을 담당
 */
const AuthTemplateBlock = styled.div``;

export default function AuthTemplate({ children }: any) {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>;
}
