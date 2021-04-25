import ApplyFAQItem from './ApplyFAQItem';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';
import { FaqDummyType } from '../../../asset/data/dummy';


export default function ApplyFAQList({ faqList }: {
  faqList: {
    id: number;
    category?: string;
    question: string;
    answer: string | string[];
  }[];
}) {
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
