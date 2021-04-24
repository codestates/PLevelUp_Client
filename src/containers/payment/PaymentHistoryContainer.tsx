import PaymentHistoryTemplate from 'components/payment/PaymentHistoryTemplate';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainPaymentThunk } from '../../modules/payment';

export default withRouter(function PaymentHistoryContainer() {
  const dispatch = useDispatch();

  const { data: payment, error, loading } = useSelector(
    // TODO: 3 민정 payment 보다는 paymentList가 낫지 않을까 싶음?
    ({ mainHistoryAsync }: RootState) => ({
      data: mainHistoryAsync.payment.data, // TODO: 3 민정 .data! -> data ! 제거했음
      error: mainHistoryAsync.payment.error,
      loading: mainHistoryAsync.payment.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainPaymentThunk());
  }, []);

  if (!payment) {
    return <div />; // TODO: 3 민정 !payment 일때 조건 임시 조치 해두었으니 payment가 없을 때 어떻게 보여야 할지 체크
  }

  return (
    <PaymentHistoryTemplate payment={payment} error={error} loading={loading} />
  );
});
