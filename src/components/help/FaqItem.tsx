import { useState } from 'react';
import styles from '../../styles/pages/help_page/HelpPage.module.scss';

export default function FaqItem({
  data,
}: {
  data: {
    id: number;
    category?: string;
    question: string;
    answer: string | string[];
  };
}) {
  // TODO: 4 정재 더미로 아직 들어올 타입이 미정 -> 수정 해 놨으니 참고해서 변경 하고, 다 변경 후 TODO 제거 요망 (이해 어려울 시 질문!!)
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
