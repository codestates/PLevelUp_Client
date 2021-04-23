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
      <div className={styles.price}>
        <MdMonetizationOn size="17" />
        <div className={styles.priceData}>  {price}원</div>
      </div>
      <div className={styles.paymentDate}>
        <MdDateRange size="17" />
        <div className={styles.dateData}>  {createdAt}</div>
      </div>
    </div>

  );
}
