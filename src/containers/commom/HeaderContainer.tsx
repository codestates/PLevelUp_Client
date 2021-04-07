import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

export default function HeaderContainer() {
  // const { user } = useSelector(({ user }) => ({ user: user.user }));

  const { data: user } = useSelector(({ masterUser }: RootState) => ({
    data: masterUser.user?.data,
  }));
  return <Header user={user} />;
}
