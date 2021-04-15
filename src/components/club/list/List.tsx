import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  MainClubListResType,
  MainClubReadResType,
} from '../../../api/main/club';
import styles from '../../../styles/pages/list_page/ListPage.module.scss';
import ClubCard from '../../common/ClubCard';
import React from 'react';

type ListItemType = {
  club: MainClubReadResType;
};

type ListType = {
  clubs: MainClubListResType | null;
  error: AxiosError | null;
  loading: boolean;
  bookmark: any;
};

export default function List({ clubs, loading, error, bookmark }: ListType) {
  if (error) return <div>Oops..? 알수 없는 에러가 발생했나봐요..</div>;

  if (loading || !clubs) return <div>로딩중 ..</div>;

  return (
    <div className={styles.wrapper}>
      <h1>리스트페이지 </h1>
      <div className={styles.container}>
        {clubs.map(club => {
          return <ClubCard club={club} key={club.id} bookmark={bookmark} />;
        })}
      </div>
    </div>
  );
}
