import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { MainLoginReqType, MainSignUpReqType } from '../../api/main/auth';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import kakaoLoginBtnOfficial from '../../asset/kakao_login_medium_wide.png';
import kakaoLoginBtn from '../../asset/kakao_login.png';
import googleLoginBtn from '../../asset/google_login.png';
import AskModal from '../common/AskModal';

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
  form: MainSignUpReqType | MainLoginReqType;
  handleOAuth: MouseEventHandler<HTMLButtonElement>;
  handleOAuthGoogle: MouseEventHandler<HTMLButtonElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

export default function AuthForm({
  formType,
  form,
  handleOAuth,
  handleOAuthGoogle,
  onChange,
  onSubmit,
  error,
}: AuthFormProps) {
  const formTypeText = formTypeMap[formType];
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <div className={styles.title}>
          {formType === 'login' ? '로그인' : '회원가입'}
        </div>
        <img src={kakaoLoginBtnOfficial} />
        <img className={styles.socialBtn} src={googleLoginBtn} />
        <img className={styles.socialBtn} src={kakaoLoginBtn} />
        <button className={styles.googleBtn} onClick={handleOAuthGoogle}>
          구글로 시작하기
        </button>
        <button className={styles.googleBtn} name="kakao" onClick={handleOAuth}>
          카카오로 시작하기
        </button>
        <a href={`http://localhost:5000/api/main/auth/login/google`}>
          구글로 시작하기
        </a>
        <br />
        <a href={`http://localhost:5000/api/main/auth/login/kakao`}>
          카카오로 시작하기
        </a>
        <hr className={styles.hr} />
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
                <AskModal
                  visible={true}
                  title="비밀번호 찾기"
                  description="임시비밀번호 발급합니다."
                  confirmText="찾기"
                  onConfirm={() => console.log('3')}
                  onCancel={() => console.log('3')}
                />
              </div>
            </>
          )}
        </form>
        <div className={styles.noLoginLink}>혹시 구글 로그인이 안되시나요?</div>
      </div>
    </div>
  );
}
