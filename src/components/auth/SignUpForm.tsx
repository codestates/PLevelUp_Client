import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { MainLoginReqType, MainSignUpReqType } from '../../api/main/auth';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import kakaoLoginBtn from '../../asset/btn-kakao.png';
import googleLoginBtn from '../../asset/btn-google.png';
import FindPasswordModal from '../../components/auth/FindPasswordModal';
import { SERVER_HOST } from '../../config';

type SignUpFormProps = {
  form: MainSignUpReqType | MainLoginReqType;
  handleOAuth: MouseEventHandler<HTMLButtonElement>;
  handleOAuthGoogle: MouseEventHandler<HTMLButtonElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

export default function SignUpForm({
  form,
  handleOAuth,
  handleOAuthGoogle,
  onChange,
  onSubmit,
  error,
}: SignUpFormProps) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <div className={styles.title}>회원가입</div>
        <hr className={styles.hr} />
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <div className={styles.inputBox}>
            <span className={styles.label}>이메일*</span>
            <input
              className={styles.loginInput}
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={onChange}
              value={form.email}
            />
          </div>
          <div className={styles.inputBox}>
            <span className={styles.label}>이름*</span>
            <input
              className={styles.loginInput}
              name="username"
              placeholder="이름을 입력해주세요"
              onChange={onChange}
              value={form.username}
            />
          </div>
          <div className={styles.inputBox}>
            <span className={styles.label}>비밀번호*</span>
            <input
              className={styles.loginInput}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChange}
              value={form.password}
            />
          </div>
          <div className={styles.inputBox}>
            <span className={styles.label}>비밀번호 확인*</span>
            <input
              className={styles.loginInput}
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          </div>
          <button className={styles.loginBtn}>회원가입</button>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <>
            <div className={styles.registerWrapper}>
              <div>이미 프레벨업 멤버이신가요?</div>
              <div>
                <Link className={styles.registerLink} to="/login">
                  프레벨업 로그인하러가기
                </Link>
              </div>
            </div>
            <hr />
            <span className={styles.findLink}>또는</span>
            <a href={`${SERVER_HOST}/api/main/auth/login/google`}>
              <img
                className={styles.socialBtn}
                src={googleLoginBtn}
                alt="googleLoginBtn"
              />
            </a>
            <a href={`${SERVER_HOST}/api/main/auth/login/kakao`}>
              <img
                className={styles.socialBtn}
                src={kakaoLoginBtn}
                alt="kakaoLoginBtn"
              />
            </a>
          </>
        </form>
      </div>
    </div>
  );
}
