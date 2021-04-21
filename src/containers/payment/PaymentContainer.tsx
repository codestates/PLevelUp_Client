import PaymentTemplate from 'components/payment/PaymentTemplate';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { useEffect } from 'react';
import { mainClubReadThunk, mainClubUnloadRead } from '../../modules/club/read';

export default withRouter(function PaymentContainer({ match, history }) {
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
    return () => {
      dispatch(mainClubUnloadRead());
    };
  }, []);

  if (!club) return <div />;
  return (
    <PaymentTemplate user={user} club={club} error={error} loading={loading} />
  );
});
