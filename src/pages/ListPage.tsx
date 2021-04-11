import React from 'react';
import styles from '../styles/pages/list_page/ListPage.module.scss';
import ClubCard from '../components/common/ClubCard';
const ListPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1> 리스트페이지 </h1>
      <ClubCard />
    </div>
  );
};

export default ListPage;
