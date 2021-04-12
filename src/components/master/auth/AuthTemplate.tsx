import React from 'react';
import styles from '../../../styles/pages/login_page/LoginPage.module.scss';

export default function AuthTemplate({ children, type }: any) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <div className={styles.title}>
          {type === 'login' ? '로그인' : '회원가입'}
        </div>
        {children}
      </div>
    </div>
  );
}
