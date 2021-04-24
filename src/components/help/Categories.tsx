import styles from '../../styles/pages/help_page/HelpPage.module.scss';

export default function Categories({
  category,
  onSelect,
}: {
  category: string;
  onSelect: (category: string) => void;
}) {
  const categories = [
    {
      name: 'Club',
      text: '개발모임',
    },
    {
      name: 'Apply',
      text: '신청',
    },
    {
      name: 'Refund',
      text: '환불/변경',
    },
  ];

  return (
    <>
      <div className={styles.title}>FAQ</div>
      <div className={styles.categoryContainer}>
        {categories.map(c => (
          <div
            className={`${styles.categoryBtn} ${
              category === c.name ? styles['active'] : ''
            }`}
            key={c.name}
            onClick={() => onSelect(c.name)}
          >
            {c.text}
          </div>
        ))}
      </div>
    </>
  );
}
