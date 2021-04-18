import styles from '../../styles/pages/my_page/ChangePasswordPage.module.scss';
import React, { ChangeEvent, FormEvent } from 'react';
import { MainMyPageChangePasswordReqType } from '../../api/main/myPage';

type ChangePasswordFormProps = {
  form: MainMyPageChangePasswordReqType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

export default function ChangePasswordForm({
  form,
  onChange,
  onSubmit,
  error,
}: ChangePasswordFormProps) {
  return (
    <div className={styles.passwordWrapper}>
      <div className={styles.changePasswordHeader}>비밀번호 변경</div>
      <div className={styles.changePasswordContent}>
        <form className={styles.formGroup} onSubmit={onSubmit}>
          <input
            className={styles.basicInput}
            name="password"
            type="password"
            placeholder="기존 비밀번호"
            onChange={onChange}
            value={form.password}
          />
          <input
            className={styles.basicInput}
            name="changePassword"
            type="password"
            placeholder="새 비밀번호"
            onChange={onChange}
            value={form.changePassword}
          />
          <input
            className={styles.basicInput}
            name="changePasswordConfirm"
            type="password"
            placeholder="새 비밀번호 확인"
            onChange={onChange}
            value={form.changePasswordConfirm}
          />
          <button className={styles.changeBtn}>변경</button>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
