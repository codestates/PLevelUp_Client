import { useEffect, useState } from 'react';
import {
  faqClubData,
  faqApplyData,
  faqRefundData,
  FaqDummyType,
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
      return faqRefundData;
    } else {
      return [];
    }
  }
  const [faqData, setFaqData] = useState(faqClubData);
  useEffect(() => {
    const dummyData: FaqDummyType[] = setDummy(category); //TODO: 4 정재 더미로 아직 들어올 타입이 미정 -> 타입 지정 해놨으니 수정해서 처리, 이해 못했으면 질문 !!
    if (dummyData.length > 0) {
      setFaqData(dummyData);
    }
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
