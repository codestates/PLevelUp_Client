import React from 'react';
import styles from '../styles/pages/list_page/ListPage.module.scss';
import ClubList from '../components/club/ClubList';
const ListPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1> 리스트페이지 </h1>
      <ClubList />
    </div>
  );
};

export default ListPage;
