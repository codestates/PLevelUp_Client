import React from 'react';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';

const SignUpForm = ({ error, onChange, onSubmit, form }) => {
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
      <input
        className={styles.loginInput}
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={onChange}
        value={form.passwordConfirm}
      />
      <input
        className={styles.loginInput}
        name="username"
        placeholder="회원이름"
        onChange={onChange}
        value={form.username}
      />
      <button className={styles.loginBtn}>회원가입</button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};

export default SignUpForm;
