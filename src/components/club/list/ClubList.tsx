import React from 'react';
import styles from '../../../styles/pages/list_page/ClubList.module.scss';
import ClubCard from '../ClubCard';
import { MainClubListResType } from '../../../api/main/club';
import { AxiosError } from 'axios';

type ClubListPropsType = {
  clubs: MainClubListResType | null;
  error: AxiosError | null;
  loading: boolean;
};

export default function ClubList({ loading, error, clubs }: ClubListPropsType) {
  if (error) {
    return (
      <div>
        클럽리스트를 받아오는 중에 어떤 문제가 발생했군요. 어서 고치러 가보세요!
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
        <div className={styles.container}>
          {clubs?.map(club => {
            return <ClubCard club={club} key={club.id} />;
          })}
        </div>
      )}
    </>
  );
}
