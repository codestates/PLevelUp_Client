import ClubCardContainer from '../../containers/common/ClubCardContainer';
import styles from '../../styles/pages/my_page/MyPage.module.scss';
import { MainClubListResType, MainClubReadResType } from '../../api/main/club';

type BookmarkListPropsType = {
  clubs: MainClubListResType;
};
export default function BookmarkList({ clubs }: BookmarkListPropsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}> 찜리스트</div>
      <div className={styles.container}>
        {clubs?.map((club: MainClubReadResType) => {
          return <ClubCardContainer club={club} key={club.id} isMain={true} />;
        })}
      </div>
    </div>
  );
}
