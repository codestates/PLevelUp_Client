import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/pages/introduce_page/IntroducePage.module.scss';
import IntroduceContent from './IntroContent';

export default function IntroduceTemplate() {
  return (
    <div>
      <div className={styles.content}>
        <IntroduceContent />
      </div>
    </div>
  );
}
