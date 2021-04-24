import ApplyFAQItem from './ApplyFAQItem';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';
import { FaqDummyType } from '../../../asset/data/dummy';

//faq area
export default function ApplyFAQList({ faqList }: { faqList: FaqDummyType[] }) {
  return (
    <div className={styles.faqWrapper}>
      <div className={styles.faqContainer}>
        <div className={styles.faqContents}>
          <div className={styles.faqTitle}>FAQ</div>
          {faqList.map(data => (
            <ApplyFAQItem key={data.id} faq={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
