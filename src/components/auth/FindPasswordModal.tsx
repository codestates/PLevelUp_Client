import AskModal from '../common/AskModal';
import styles from '../../styles/pages/login_page/LoginPage.module.scss';
import { useState } from 'react';

type FindPasswordModalType = {
  visible: boolean;
  onConfirm: (email: string) => void;
  onCancel: () => void;
};

export default function FindPasswordModal({
  visible,
  onConfirm,
  onCancel,
}: FindPasswordModalType) {
  const [email, setEmail] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <AskModal
      visible={visible}
      title="임시 비밀번호 발급"
      description=""
      confirmText="임시비밀번호 발급"
      onConfirm={() => onConfirm(email)}
      onCancel={onCancel}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalDescription}>
          가입시 입력하신 이메일을 입력해주세요. <br />
          해당 이메일로 임시비밀번호를 보내드리겠습니다.
        </div>
        <input
          className={styles.modalInput}
          type="email"
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
          value={email}
          required
        />
      </div>
    </AskModal>
  );
}
