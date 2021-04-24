import { Link } from 'react-router-dom';
import React, { ChangeEvent, FormEvent } from 'react';
import {
  MasterLoginReqType,
  MasterSignUpReqType,
} from '../../../api/master/auth';
import styles from '../../../styles/pages/login_page/LoginPage.module.scss';

type MasterLoginProps = {
  form: MasterSignUpReqType | MasterLoginReqType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

export default function MasterLoginForm({
  form,
  onChange,
  onSubmit,
  error,
}: MasterLoginProps) {
  return (
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
    </form>
  );
}
