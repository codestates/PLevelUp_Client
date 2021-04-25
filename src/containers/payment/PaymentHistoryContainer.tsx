import PaymentHistoryTemplate from 'components/payment/PaymentHistoryTemplate';
import { RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainPaymentThunk } from '../../modules/payment';
import ErrorView from 'components/common/ErrorView';

export default withRouter(function PaymentHistoryContainer({
  history,
}: RouteComponentProps) {
  const dispatch = useDispatch();

  const { data: paymentList, error, loading } = useSelector(
    ({ mainHistoryAsync }: RootState) => ({
      data: mainHistoryAsync.payment.data,
      error: mainHistoryAsync.payment.error,
      loading: mainHistoryAsync.payment.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainPaymentThunk());
  }, []);

  if (!paymentList) {
    return <ErrorView children={'결제내역이 없습니다.'} />;
  }

  return (
    <PaymentHistoryTemplate
      paymentList={paymentList}
      error={error}
      loading={loading}
    />
  );
});
