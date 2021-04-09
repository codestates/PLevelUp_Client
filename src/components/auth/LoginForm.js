import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/pages/login_page/LoginPage.module.scss';

const LoginForm = ({ error, onChange, onSubmit, form }) => {
  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
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
      <button className={styles.loginBtn}>로그인</button>
      {error && <div className={styles.errorMessage}>{error}</div>}
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
        <span className={styles.findLink}>아이디찾기</span>
        <span>ㅣ</span>
        <span className={styles.findLink}>비밀번호 찾기</span>
      </div>
    </form>
  );
};

export default LoginForm;
