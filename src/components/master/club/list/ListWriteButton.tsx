import styles from '../../../../styles/pages/master/list_page/ListPage.module.scss';
import { Link } from 'react-router-dom';

export default function List() {
  return (
    <div className={styles.masterListWrapper}>
      <div className={styles.writeListButtonWrapper}>
        <Link to="/master/edit">
          <button className={styles.writeBtn}>새 글 작성하기</button>
        </Link>
      </div>
    </div>
  );
}
