import api from '../../api/index';
import PaymentHistoryTemplate from 'components/payment/PaymentHistoryTemplate';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainHistoryAsync } from '../../modules/payment';

export default withRouter(function PaymentHistoryContainer() {
  const dispatch = useDispatch();

  const { data: payment, error, loading } = useSelector(
    ({ mainHistoryAsync }: RootState) => ({
      data: mainHistoryAsync.payment.data,
      error: mainHistoryAsync.payment.error,
      loading: mainHistoryAsync.payment.loading,
    }),
  );

  return (
    <PaymentHistoryTemplate payment={payment} loading={loading} error={error} />
  );
});
