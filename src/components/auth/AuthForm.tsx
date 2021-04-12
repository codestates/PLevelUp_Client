import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent } from 'react';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import {
  MainChangePasswordReqType,
  MainLoginReqType,
  MainSignUpReqType,
} from 'api/main/auth';

type formTypeMapType = {
  [index: string]: string;
  login: string;
  signUp: string;
  changePassword: string;
};

const formTypeMap: formTypeMapType = {
  login: '로그인',
  signUp: '회원가입',
  changePassword: '비밀번호 변경',
};

type AuthFormProps = {
  formType: string;
  form: MainSignUpReqType | MainLoginReqType | MainChangePasswordReqType;
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
      {formType === 'changePassword' && (
        <input
          className={styles.loginInput}
          name="changePassword"
          type="password"
          placeholder="새 비밀번호"
          onChange={onChange}
          value={form.changePassword}
        />
      )}
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
            <div>아직 프레벨업 멤버가 아니신가요?</div>
            <div>
              <Link className={styles.registerLink} to="/signup">
                프레벨업 가입하기
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
            <div>이미 프레벨업 멤버가 아니신가요?</div>
            <div>
              <Link className={styles.registerLink} to="/login">
                프레벨업 로그인하러가기
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
