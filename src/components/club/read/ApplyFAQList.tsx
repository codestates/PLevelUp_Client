import { useState, useEffect } from 'react';
import ApplyFAQItem from './ApplyFAQItem';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';

//faq area
export default function faqArea({ faq }: { faq: any }) {

  const [faqData, setFaqData] = useState(faq);

  return (
    <div className={styles.faqWrapper}>
      <div className={styles.faqContainer}>
        <div className={styles.faqContents}>
          <div className={styles.faqTitle}>FAQ</div>
          {
            faqData.map((data: any) => (
              <ApplyFAQItem key={data.id} faq={data} />
            ))
          }

        </div>
      </div>
    </div>
  );


}
