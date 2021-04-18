import api from '../../api/index';
import PaymentTemplate from 'components/payment/PaymentTemplate';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';

export default withRouter(function PaymentContainer() {
  const dispatch = useDispatch();

  const { data: user } = useSelector(({ masterUser, mainUser }: RootState) => ({
    data: masterUser.user?.data || mainUser.user?.data,
  }));

  const { data: club } = useSelector(({ mainReadAsync }: RootState) => ({
    data: mainReadAsync.club.data,
  }));

  return <PaymentTemplate user={user} club={club} />;
});
