import styles from '../../../../styles/pages/master/list_page/ListPage.module.scss';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  MasterClubListResType,
  MasterClubReadResType,
} from '../../../../api/master/club';

type ListItemType = {
  club: MasterClubReadResType;
};

const ListItem = ({ club }: ListItemType) => {
  const { title, id, createdAt, summary, Master: master } = club;
  return (
    <div className={styles.listItemBlock}>
      <h2>
        <Link to={`/master/${id}`}>{title}</Link>
      </h2>
      <div className={styles.subInfo}>
        <span>
          <b>{master.username}</b>
        </span>
        <span>{`${createdAt}`}</span>
      </div>
      <p>{summary}</p>
    </div>
  );
};

type ListType = {
  clubs: MasterClubListResType | null;
  error: AxiosError | null;
  loading: boolean;
  isMasterLogged: boolean;
};

export default function List({
  clubs,
  loading,
  error,
  isMasterLogged,
}: ListType) {
  if (!isMasterLogged)
    return (
      <div className={styles.masterListWrapper}>
        클럽장만 볼 수 있는 페이지 입니다.
      </div>
    );
  if (error)
    return (
      <div className={styles.masterListWrapper}>
        Oops..? 알수 없는 에러가 발생했나봐요..
      </div>
    );

  return (
    <div className={styles.masterListWrapper}>
      <div className={styles.writeListButtonWrapper}>
        {isMasterLogged && (
          <Link to="/master/edit">
            <button>새 글 작성하기</button>
          </Link>
        )}
      </div>
      <div>
        {/* 로딩 중이 아니고, clubs가 존재할 때만 보여 줌 */}
        {!loading && clubs && (
          <div>
            {clubs.map(club => (
              <ListItem club={club} key={club.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
