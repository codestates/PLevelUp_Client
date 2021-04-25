import styles from '../../styles/pages/introduce_page/IntroducePage.module.scss';
import introduceContent from '../../asset/introduceContent/introduceContent.png';

export default function IntroduceContent() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <hr />
          <img
            className={styles.contentImg}
            src={introduceContent}
            alt="introduce"
          ></img>
        </div>
      </div>
    </div>
  );
}
