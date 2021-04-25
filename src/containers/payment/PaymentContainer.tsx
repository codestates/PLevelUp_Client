import PaymentTemplate from 'components/payment/PaymentTemplate';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { useEffect } from 'react';
import { mainClubReadThunk } from '../../modules/club/read';
import ErrorView from 'components/common/ErrorView';

export default withRouter(function PaymentContainer({ match }) {
  const { clubId } = match.params;
  const dispatch = useDispatch();

  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));

  const { data: club, error, loading } = useSelector(
    ({ mainReadAsync }: RootState) => ({
      data: mainReadAsync.club.data,
      error: mainReadAsync.club.error,
      loading: mainReadAsync.club.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainClubReadThunk(clubId));
  }, []);

  if (!club || !user) {
    return <ErrorView children={'로그인이 필요한 서비스입니다.'} />;
  }

  return (
    <PaymentTemplate user={user} club={club} error={error} loading={loading} />
  );
});
