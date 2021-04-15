import PaymentTemplate from 'components/payment/PaymentTemplate';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../modules';
import { mainIamPort, mainRequestPay } from '../../api/main/payment';
import userEvent from '@testing-library/user-event';

export default withRouter(function PaymentContainer() {
  const dispatch = useDispatch();

  //읽은 클럽의 정보를 불러와야해서 mainRead를 가져와야함 -> 클럽 정보 payment템플릿에서 띄워야함(정보)
  const { data: club } = useSelector(({ mainReadAsync }: RootState) => ({
    data: mainReadAsync.club.data,
  }));

  const { data: user } = useSelector(({ masterUser, mainUser }: RootState) => ({
    data: masterUser.user?.data || mainUser.user?.data,
  }));

  useEffect(() => {
    dispatch(mainIamPort('imp67413694'));
  }, []);

  const onPay = () => {
    dispatch(
      mainRequestPay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: club?.id,
        name: club?.title,
        amount: club?.price, //결제금액
        buyer_email: user?.email,
        buyer_name: userEvent.username,
        notice_url: '/api/main/mypage',
        card_quota: [1, 2, 3, 4],
      }),
    );
  };

  return <PaymentTemplate club={club} onPay={onPay} />;
});
