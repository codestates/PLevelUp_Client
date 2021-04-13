import styles from '../../styles/pages/login_page/LoginPage.module.scss';

export default function ChangePasswordTemplate({ children }: any) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <div className={styles.title}>비밀번호 변경</div>
        {children}
      </div>
    </div>
  );
}
