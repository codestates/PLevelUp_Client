import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/pages/landing_page/LandingPage.module.scss';
import { Link } from 'react-router-dom';
import SlickClubCard from './SlickClubCard';
import { MainClubListResType } from '../../api/main/club';

type LandingClubType = {
  clubs: MainClubListResType;
  to: string;
  title: string;
  type: string;
};

export default function LandingTemplate({
  landingClubsList,
}: {
  landingClubsList: LandingClubType[];
}) {
  return (
    <>
      {landingClubsList.map((landingClubs, index) => {
        return (
          <div
            className={styles.container}
            key={`landingList-container-${index}`}
          >
            <div className={styles.listHeader}>
              <div className={styles.title}>{landingClubs.title}</div>
              <Link to={landingClubs.to} className={styles.link}>
                <div className={styles.headerBtn}>전체보기</div>
              </Link>
            </div>
            <SlickClubCard data={landingClubs.clubs} type={landingClubs.type} />
          </div>
        );
      })}
    </>
  );
}
