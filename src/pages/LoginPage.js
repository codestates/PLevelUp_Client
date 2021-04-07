import React from 'react';
import LoginFormContainer from '../containers/auth/LoginFormContainer.js';
import styles from '../styles/pages/login_page/LoginPage.module.scss';
const LoginPage = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <div className={styles.title}> 로그인 </div>
        <button className={styles.googleBtn}>구글로 시작하기</button>
        <hr className={styles.hr} />
        <LoginFormContainer />
        <div className={styles.noLoginLink}>혹시 구글 로그인이 안되시나요?</div>
      </div>
    </div>
  );
};

export default LoginPage;
