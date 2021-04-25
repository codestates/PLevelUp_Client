import styles from '../../styles/pages/introduce_page/IntroducePage.module.scss';
import introContent from '../../asset/IntroContent/IntroContent.png';

export default function IntroduceContent() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <hr />
          <img
            className={styles.contentImg}
            src={introContent}
            alt="introduce"
          ></img>
        </div>
      </div>
    </div>
  );
}
