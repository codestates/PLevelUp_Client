import React, { memo } from 'react';
import {
  MainClubListResType,
  MainClubReadResType,
} from '../../../api/main/club';
import styles from '../../../styles/pages/list_page/ListPage.module.scss';
// import ClubCard from '../../common/ClubCard';
import ClubCardContainer from '../../../containers/common/ClubCardContainer';

type ListType = {
  clubs: MainClubListResType;
};

export default function List({ clubs }: ListType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>모든 클럽 보기</div>
      <div className={styles.container}>
        {clubs.map(club => {
          return <ClubCardContainer club={club} key={club.id} />;
        })}
      </div>
    </div>
  );
}
