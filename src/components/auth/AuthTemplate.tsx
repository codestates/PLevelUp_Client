import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import React from 'react';
import Responsive from '../common/Responsive';

export default function AuthTemplate({ children, type }: any) {
  return (
    <Responsive>
      <div className={styles.loginWrapper}>
        <div className={styles.loginContent}>
          <div className={styles.title}>
            {type === 'login' ? '로그인' : '회원가입'}
          </div>
          <button className={styles.googleBtn}>구글로 시작하기</button>
          <hr className={styles.hr} />
          {children}
          <div className={styles.noLoginLink}>
            혹시 구글 로그인이 안되시나요?
          </div>
        </div>
      </div>
    </Responsive>
  );
}
