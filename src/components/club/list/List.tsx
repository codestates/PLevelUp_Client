import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from 'axios';
import {
  MainClubListResType,
  MainClubReadResType,
} from '../../../api/main/club';
import ApplyList from '../../../components/club/list/ApplyList';
import styles from '../../../styles/pages/list_page/ListPage.module.scss';
import ClubCard from '../../common/ClubCard';
import React, { memo, useCallback, useState, useEffect } from 'react';

type ListType = {
  clubs: MainClubListResType;

  bookmark: any | null;
  // filter: any
};



export default function List({ clubs, bookmark }: ListType) {

  return (
    <div className={styles.wrapper}>
      {/* <h1>리스트페이지 </h1> */}
      <ApplyList clubs={clubs} bookmark={bookmark} />
      <div className={styles.container}>
        {clubs.map(club => {
          return <ClubCard club={club} isRes={isRes} key={club.id} bookmark={bookmark} />;
        })}
      </div>
    </div>
  );
}
