import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { mainLogoutThunk } from '../../modules/user';
import { withRouter } from 'react-router';
import { mainApplyThunk } from '../../modules/apply';
import { useEffect } from 'react';
import MyPageForm from 'components/user/MyPageForm';
import ErrorView from '../../components/common/ErrorView';

export default withRouter(function MyPageContainer({ history }) {
  const dispatch = useDispatch();
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data!,
  }));

  const { data: apply, error, loading } = useSelector(
    ({ mainApplyAsync }: RootState) => ({
      data: mainApplyAsync.apply.data!,
      error: mainApplyAsync.apply.error,
      loading: mainApplyAsync.apply.loading,
    }),
  );

  useEffect(() => {
    dispatch(mainApplyThunk());
  }, []);

  const onLogout = () => {
    dispatch(mainLogoutThunk());
    history.push('/');
  };

  if (!user) {
    return <ErrorView children={'잘못된 요청입니다.'} />;
  }

  return (
    <MyPageForm
      user={user}
      onLogout={onLogout}
      apply={apply}
      error={error}
      loading={loading}
    />
  );
});
