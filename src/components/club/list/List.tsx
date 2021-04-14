import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  MainClubListResType,
  MainClubReadResType,
} from '../../../api/main/club';

type ListItemType = {
  club: MainClubReadResType;
};

const ListItem = ({ club }: ListItemType) => {
  const { title, id, createdAt, summary, Master: master } = club;
  return (
    <div>
      <h2>
        <Link to={`/club/${id}`}>{title}</Link>
      </h2>
      <div>
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
  clubs: MainClubListResType | null;
  error: AxiosError | null;
  loading: boolean;
};

export default function List({ clubs, loading, error }: ListType) {
  if (error) return <div>Oops..? 알수 없는 에러가 발생했나봐요..</div>;

  return (
    <div>
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
