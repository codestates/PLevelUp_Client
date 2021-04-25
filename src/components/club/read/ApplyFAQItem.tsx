import downArrow from '../../../asset/readPageInFAQ/downArrow.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';
import { FaqDummyType } from '../../../asset/data/dummy';

export default function ApplyFAQItem({ faq }: {
  faq: {
    id: number;
    category?: string;
    question: string;
    answer: string | string[];
  };
}) {
  const [isToggle, setIsToggle] = useState(false);

  const onClick = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className={styles.faqList} onClick={onClick}>
      <div className={styles.qnaItem}>
        <div className={styles.qnaQuestionFalse}>{faq.question}</div>
        <img src={downArrow} className={styles.ArrowIcon} alt="downArrow" />
      </div>
      {isToggle ? (
        <div className={styles.answerBox}>
          {Array.isArray(faq.answer) &&
            faq.answer.map((a: string) => (
              <span className={styles.answer}>
                {a}
                <br />
              </span>
            ))}
          <p>
            <span>{'> '}</span>
            <Link to={`/help`} className={styles.LinkMoreInfo}>
              자세히 보러 가기
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}
