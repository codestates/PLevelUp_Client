import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { MainLoginReqType, MainSignUpReqType } from '../../api/main/auth';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import kakaoLoginBtn from '../../asset/btn-kakao.png';
import googleLoginBtn from '../../asset/btn-google.png';
import FindPasswordModal from '../../components/auth/FindPasswordModal';
import { SERVER_HOST } from '../../config';

type LoginFormProps = {
  form: MainSignUpReqType | MainLoginReqType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
  modal: boolean;
  onFindPasswordClick: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => void;
  onConfirm: (email: string) => void;
  onCancel: () => void;
  tempPasswordError: string;
};

export default function LoginForm({
  form,
  onChange,
  onSubmit,
  error,
  modal,
  onFindPasswordClick,
  onCancel,
  onConfirm,
  tempPasswordError,
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
              {/* <span className={styles.findLink}>이메일 찾기</span>
              <span>ㅣ</span> */}
              <span className={styles.findLink} onClick={onFindPasswordClick}>
                비밀번호 찾기
              </span>
              <FindPasswordModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
                tempPasswordError={tempPasswordError}
              />
            </div>
          </>
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
        </form>
      </div>
    </div>
  );
}
