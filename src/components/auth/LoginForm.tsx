import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { MainLoginReqType, MainSignUpReqType } from '../../api/main/auth';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import kakaoLoginBtn from '../../asset/btn-kakao.png';
import googleLoginBtn from '../../asset/btn-google.png';
import googleNoBack from '../../asset/googleNoBack.png';
import kakaoNoBack from '../../asset/kakao_login.png';
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
              placeholder="이메일을 입력해주세요"
              onChange={onChange}
              value={form.email}
            />
            <input
              className={styles.loginInput}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChange}
              value={form.password}
            />
            <div className={styles.findInfoWrapper}>
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
            {/* <hr /> */}
            <div className={styles.socialLoginWrapper}>
              <div className={styles.description}> or </div>
              {/* <span className={styles.description}>다른 방식으로 로그인</span> */}
            </div>
          </>
          <div className={styles.socialBtnWrapper}>
            <div>
              <a href={`${SERVER_HOST}/api/main/auth/login/kakao`}>
                <img
                  className={styles.socialBtnKakao}
                  src={kakaoNoBack}
                  alt="kakaoNoBack"
                />
              </a>
            </div>
            <div>
              <a href={`${SERVER_HOST}/api/main/auth/login/google`}>
                <img
                  className={styles.socialBtnGoogle}
                  src={googleNoBack}
                  alt="googleNoBack"
                />
              </a>
            </div>
          </div>
          {/* //TODO: 변경동의하면 주석 전부 제거할 것 */}
          {/* <a href={`${SERVER_HOST}/api/main/auth/login/google`}>
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
          </a> */}
        </form>
      </div>
    </div>
  );
}
