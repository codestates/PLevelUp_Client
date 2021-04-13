import styles from '../../../../styles/pages/master/list_page/ListPage.module.scss';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';

const ListItem = () => {
  return (
    <div className={styles.listItemBlock}>
      <h2>제목</h2>
      <div className={styles.subInfo}>
        <span>
          <b>username</b>
        </span>
        <span>시간</span>
      </div>
      <p>요약...?</p>
    </div>
  );
};

export default function List() {
  return (
    <div className={styles.masterListWrapper}>
      <div className={styles.writePostButtonWrapper}>
        <Link to="/master/edit">
          <button>새 글 작성하기</button>
        </Link>
      </div>
      <div>
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
}
