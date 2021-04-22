import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { MainLoginReqType, MainSignUpReqType } from '../../api/main/auth';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import kakaoLoginBtnOfficial from '../../asset/kakao_login_medium_wide.png';
import kakaoLoginBtn from '../../asset/kakao_login.png';
import googleLoginBtn from '../../asset/google_login.png';
import FindPasswordModal from '../../components/auth/FindPasswordModal';

type LoginFormProps = {
  form: MainSignUpReqType | MainLoginReqType;
  handleOAuth: MouseEventHandler<HTMLButtonElement>;
  handleOAuthGoogle: MouseEventHandler<HTMLButtonElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
  modal: any;
  onFindPasswordClick: any;
  onCancel: any;
  onConfirm: any;
};

export default function LoginForm({
  form,
  handleOAuth,
  handleOAuthGoogle,
  onChange,
  onSubmit,
  error,
  modal,
  onFindPasswordClick,
  onCancel,
  onConfirm,
}: LoginFormProps) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <div className={styles.title}>로그인</div>
        <hr className={styles.hr} />
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <div className={styles.inputBox}>
            <input
              className={styles.loginInput}
              name="email"
              placeholder="이메일"
              onChange={onChange}
              value={form.email}
            />
            <input
              className={styles.loginInput}
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChange}
              value={form.password}
            />
          </div>
          <button className={styles.loginBtn}>로그인</button>
          {error && <div className={styles.errorMessage}>{error}</div>}

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
              <span className={styles.findLink}>이메일 찾기</span>
              <span>ㅣ</span>
              <span className={styles.findLink} onClick={onFindPasswordClick}>
                비밀번호 찾기
              </span>
              <FindPasswordModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
              />
            </div>
          </>

          <img src={kakaoLoginBtnOfficial} />
          {/* <img className={styles.socialBtn} src={googleLoginBtn} />
        <img className={styles.socialBtn} src={kakaoLoginBtn} /> */}
          <button className={styles.googleBtn} onClick={handleOAuthGoogle}>
            구글로 시작하기
          </button>
          <button
            className={styles.googleBtn}
            name="kakao"
            onClick={handleOAuth}
          >
            카카오로 시작하기
          </button>
          <a href={`http://localhost:5000/api/main/auth/login/google`}>
            구글로 시작하기
          </a>
          <br />
          <a href={`http://localhost:5000/api/main/auth/login/kakao`}>
            카카오로 시작하기
          </a>
        </form>
        <div className={styles.noLoginLink}>혹시 구글 로그인이 안되시나요?</div>
      </div>
    </div>
  );
}
