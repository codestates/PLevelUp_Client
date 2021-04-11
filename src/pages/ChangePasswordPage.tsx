import React from 'react';
import styles from '../styles/pages/my_page/ChangePasswordPage.module.scss';
import ChangePasswordForm from '../components/auth/ChangePasswordForm';

export default function ChangePasswordPage() {
  return (
    <div>
      <body className="wrapper">
        <div className={styles.modifyInfo_flex}>
          <div
            className={styles.modifyInfo_header}
            style={{ border: '1px solid #2A2A2A' }}
          >
            <div className={styles.modifyInfo_header_text}>내 정보 수정</div>
          </div>
          <div className={styles.modifyInfo_body}>
            <div className={styles.modifyInfo_body_header}>비밀번호 변경</div>
            <div className={styles.modifyInfo_body_body}>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
