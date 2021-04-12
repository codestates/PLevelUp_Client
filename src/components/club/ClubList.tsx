import React from 'react';
import styles from '../../styles/pages/list_page/ClubList.module.scss';
import ClubCard from '../common/ClubCard';
export default function ClubList() {
  return (
    <div className={styles.container}>
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
    </div>
  );
}
