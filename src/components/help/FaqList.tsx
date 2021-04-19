import { useEffect, useState } from 'react';
import {
  faqClubData,
  faqApplyData,
  faqRefundata,
} from '../../asset/data/dummy';
import styles from '../../styles/pages/help_page/HelpPage.module.scss';
import FaqItem from './FaqItem';

export default function FaqList({ category }: { category: string }) {
  function setDummy(category: string) {
    if (category === 'Club') {
      return faqClubData;
    } else if (category === 'Apply') {
      return faqApplyData;
    } else if (category === 'Refund') {
      return faqRefundata;
    }
  }
  const [faqData, setFaqData] = useState(faqClubData);
  useEffect(() => {
    const dummyData: any = setDummy(category);
    setFaqData(dummyData);
  }, [category]);
  return (
    <>
      <div className={styles.listContainer}>
        {faqData.map(faq => (
          <FaqItem key={faq.id} data={faq} />
        ))}
      </div>
    </>
  );
}
