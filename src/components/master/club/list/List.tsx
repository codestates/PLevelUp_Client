import styles from '../../../../styles/pages/master/list_page/ListPage.module.scss';
import { MasterClubListResType } from '../../../../api/master/club';
import ClubCardContainer from '../../../../containers/common/ClubCardContainer';
import React from 'react';

type ListType = {
  clubs: MasterClubListResType;
};

export default function List({ clubs }: ListType) {
  return (
    <div className={styles.masterListWrapper}>
      <div className={styles.container}>
        {clubs.map(club => {
          return <ClubCardContainer club={club} key={club.id} isMain={false} />;
        })}
      </div>
    </div>
  );
}
