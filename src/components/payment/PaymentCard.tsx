import { MainPaymentResType } from 'api/main/payment';
import styles from '../../styles/pages/payment_page/PaymentHistoryPage.module.scss';
import { MdDateRange } from 'react-icons/md';
import { MdMonetizationOn } from 'react-icons/md';
export default function PaymentCard({
  title,
  price,
  createdAt,
}: MainPaymentResType) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.priceWrapper}>
        <MdMonetizationOn size="17" />
        <div className={styles.price}>
          {`${price.toLocaleString('ko-KR')}원`}
        </div>
      </div>
      <div className={styles.dateWrapper}>
        <MdDateRange size="17" />
        <div className={styles.date}> {createdAt}</div>
      </div>
    </div>
  );
}
