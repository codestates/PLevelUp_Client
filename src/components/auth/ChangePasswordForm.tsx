import styles from '../../styles/pages/myPage/My_modify.module.scss';
import classNames from 'classnames/bind';
import { ChangeEvent, FormEvent } from 'react';
import { MainChangePasswordReqType } from 'api/main/auth';
import { defaultCipherList } from 'node:constants';

const cx = classNames.bind(styles);

const ChangePasswordForm = ({ error, onChange, onSubmit, form }: any) => {
  return (
    <form className={cx('modify_form')} onSubmit={onSubmit}>
      <input
        className={cx('inputBox')}
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={form.email}
      />
      <input
        className={cx('inputBox')}
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={onChange}
        value={form.password}
      />
      <input
        className={cx('inputBox')}
        name="changePassword"
        type="password"
        placeholder="새 비밀번호"
        onChange={onChange}
        value={form.changePassword}
      />
      <input
        className={cx('inputBox')}
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호확인"
        onChange={onChange}
        value={form.passwordConfirm}
      />
      <button className={cx('changePasswordBtn')}>비밀번호 변경하기</button>
      {error && <div className={cx('errorMessage')}>{error}</div>}
    </form>
  );
};

export default ChangePasswordForm;
