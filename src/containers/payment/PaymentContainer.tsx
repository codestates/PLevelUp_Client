import PaymentTemplate from 'components/payment/PaymentTemplate';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
  }, []);

  if (!club || !user) return <div />; // TODO: 2 민정 user 없을 때 처리 할 것 -> 안 보여야 하는 것인지, 다른 페이지로 redirect 해야할 것인지 등등, 이해 안 될 시 TODO 2 로질문!!

  return (
    <PaymentTemplate user={user} club={club} error={error} loading={loading} />
  );
});
