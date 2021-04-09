import React from 'react';
import SignUpFormContainer from '../containers/auth/SignUpFormContainer';
import styles from '../styles/pages/login_page/LoginPage.module.scss';
import Responsive from '../components/common/Responsive';
const SignUpPage = () => {
  return (
    <Responsive>
      <div className={styles.loginWrapper}>
        <div className={styles.loginContent}>
          <div className={styles.title}> 회원가입 </div>
          <button className={styles.googleBtn}>구글로 시작하기</button>
          <hr className={styles.hr} />
          <SignUpFormContainer />
          <div className={styles.noLoginLink}>
            혹시 구글 로그인이 안되시나요?
          </div>
        </div>
      </div>
    </Responsive>
  );
};

export default SignUpPage;
