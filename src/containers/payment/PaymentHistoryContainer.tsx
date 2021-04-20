import PaymentHistoryTemplate from 'components/payment/PaymentHistoryTemplate';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  mainHistoryAsync,
  mainPaymentThunk,
  mainPaymentUnloadHistory,
} from '../../modules/payment';

export default withRouter(function PaymentHistoryContainer() {
  const dispatch = useDispatch();

  const { data: payment, error, loading } = useSelector(
    ({ mainHistoryAsync }: RootState) => ({
      data: mainHistoryAsync.payment.data!,
      error: mainHistoryAsync.payment.error,
      loading: mainHistoryAsync.payment.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainPaymentThunk());
  }, []);

  return (
    <PaymentHistoryTemplate payment={payment} error={error} loading={loading} />
  );
});
