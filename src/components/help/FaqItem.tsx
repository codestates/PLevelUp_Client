import { useState } from 'react';
import styles from '../../styles/pages/help_page/HelpPage.module.scss';

export default function FaqItem({ data }: { data: any }) {
  const [isToggle, setIsToggle] = useState(false);

  const onClick = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className={styles.itemContainer} onClick={onClick}>
      <div className={styles.questionBox}>
        <span className={styles.questionMark}>Q.</span>
        <span className={styles.category}>{`[${data.category}]`}</span>
        <span className={styles.question}>{data.question}</span>
      </div>
      {isToggle ? (
        <div className={styles.answerBox}>
          <span className={styles.answer}>{data.answer}</span>
        </div>
      ) : null}
    </div>
  );
}
