import { AxiosError } from 'axios';
import {
  MainPaymentResType,
  MainPaymentHistoryResType,
} from '../../api/main/payment';
import PaymentCard from './PaymentCard';
import styles from '../../styles/pages/payment_page/PaymentHistoryPage.module.scss';
import { IoIosArrowBack } from 'react-icons/io';

export default function PaymentHistoryTemplate({
  payment,
  error,
  loading,
}: {
  payment: MainPaymentHistoryResType | any;
  error: AxiosError | null;
  loading: boolean;
}) {
  return (
    <div className={styles.container}>
      {loading && <div>로딩중..</div>}
      <div className={styles.historyHeader}>
        <div className={styles.wrapper}>
          <div className={styles.backBtn}>
            <span className={styles.arrowIcon}>
              <IoIosArrowBack size="30" color="#a1a1a1" />
            </span>
          </div>
          결제내역
        </div>
      </div>
      <div className={styles.listClubBox}>클럽</div>

      <div className={styles.historyBody}>
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            {!error ? (
              <div>
                {payment &&
                  payment.map((el: MainPaymentResType) => (
                    <PaymentCard
                      key={el.id}
                      title={el.title}
                      price={el.price}
                      createdAt={el.createdAt}
                    />
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
