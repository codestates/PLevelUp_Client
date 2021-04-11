import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent } from 'react';
import {
  MasterLoginReqType,
  MasterSignUpReqType,
} from '../../../api/master/auth';
import styles from '../../../styles/pages/login_page/LoginPage.module.scss';

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
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <input
        className={styles.loginInput}
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={form.email}
      />
      {formType === 'signUp' && (
        <input
          className={styles.loginInput}
          name="username"
          placeholder="회원이름"
          onChange={onChange}
          value={form.username}
        />
      )}
      <input
        className={styles.loginInput}
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={onChange}
        value={form.password}
      />
      {formType === 'signUp' && (
        <input
          className={styles.loginInput}
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 확인"
          onChange={onChange}
          value={form.passwordConfirm}
        />
      )}
      <button className={styles.loginBtn}>{formTypeText}</button>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {formType === 'login' && (
        <>
          <div className={styles.registerWrapper}>
            <div>클럽장 가입을 원하시나요?</div>
            <div>
              <Link className={styles.registerLink} to="/master/signup">
                프레벨업 클럽장 가입하기
              </Link>
            </div>
          </div>
          <hr />
          <div className={styles.findInfoWrapper}>
            <span className={styles.findLink}>아이디 찾기</span>
            <span>ㅣ</span>
            <span className={styles.findLink}>비밀번호 찾기</span>
          </div>
        </>
      )}
      {formType === 'signUp' && (
        <>
          <div className={styles.registerWrapper}>
            <div>클럽장 로그인을 원하시나요?</div>
            <div>
              <Link className={styles.registerLink} to="/master/login">
                클럽장 로그인 하러가기
              </Link>
            </div>
          </div>
          <hr />
          <div className={styles.findInfoWrapper}>
            <span className={styles.findLink}>아이디 찾기</span>
            <span>ㅣ</span>
            <span className={styles.findLink}>비밀번호 찾기</span>
          </div>
        </>
      )}
    </form>
  );
}
