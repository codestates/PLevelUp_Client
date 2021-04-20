import styles from '../../styles/common/Error.module.scss';
import fileImg from '../../asset/file.png';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// children에 메세지 바로 받는 식으로 해두었는데
// css 하는 거에 따라 message를 분리해야할 경우 그 때 분리
export default function Error({ children }: { children: ReactNode }) {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContainer}>
        <div>
          <img src={fileImg} className={styles.errorImg} />
        </div>
        {children ?
          <div className={styles.errorMessage}>
            {children}
          </div>
          :
          <div className={styles.errorMessage}>
            {/* 임시 텍스트 */}
              앗, 원하시는 페이지를 찾을 수 없네요. 다시 접속해주세요.
              <br />
              계속해서 같은 오류가 발생하신다면 <Link to="#" className={styles.errorMessage}>contact@PLevelUp.com</Link> 으로 문의주세요 :)

          </div>
        }
        <div className={styles.RedirectBtn}>
          <Link to="/" className={styles.LinkContainer}>
            메인 페이지로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
}
