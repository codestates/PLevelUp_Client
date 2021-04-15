import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  MainClubListResType,
  MainClubReadResType,
} from '../../../api/main/club';
import styles from '../../../styles/pages/list_page/ListPage.module.scss';
import ClubCard from '../../common/ClubCard';
import React, { memo } from 'react';

type ListType = {
  clubs: MainClubListResType;
  bookmark: any | null;
};

export default function List({ clubs, bookmark }: ListType) {
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
