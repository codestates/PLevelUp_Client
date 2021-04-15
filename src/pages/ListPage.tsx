import React from 'react';
import styles from '../styles/pages/list_page/ListPage.module.scss';
import ClubListContainer from '../containers/club/list/ClubListContainer';
const ListPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1> 리스트페이지 </h1>
      <ClubListContainer />
    </div>
  );
};

export default ListPage;
