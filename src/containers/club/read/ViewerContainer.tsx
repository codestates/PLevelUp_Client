import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../modules';
import {
  mainClubReadThunk,
  mainClubUnloadRead,
} from '../../../modules/club/read';
import {
  addBookmarkThunk,
  removeBookmarkThunk,
} from '../../../modules/club/bookmark';
import Viewer from '../../../components/club/read/Viewer';

export default withRouter(function ViewerContainer({ match, history }) {
  // 처음 마운트 될 떄 클럽 읽기 API 요청
  const { clubId } = match.params;
  const dispatch = useDispatch();
  // TODO: ! bookmark 제거 해야함
  const { data: club, error, loading, bookmark } = useSelector(
    ({ mainReadAsync, mainBookmarkAsync }: RootState) => ({
      data: mainReadAsync.club.data,
      error: mainReadAsync.club.error,
      loading: mainReadAsync.club.loading,
      bookmark: mainBookmarkAsync.bookmark.data!,
    }),
  );
  const onAddBookmark = () => {
    if (club) {
      dispatch(addBookmarkThunk(club.id));
    }
  };
  const onRemoveBookmark = () => {
    if (club) {
      dispatch(removeBookmarkThunk(club.id));
    }
  };
  const [isBookmarked, setIsBookmarked] = useState(club?.isBookmark); //TODO: 현재 오류 이슈발견! 이전 북마크 선택한것으로 반영이되는 이슈 : 일단해결 로직확인필요

  useEffect(() => {
    setIsBookmarked(club?.isBookmark);
  }, [loading]);
  useEffect(() => {
    setIsBookmarked(bookmark?.isBookmark);
  }, [bookmark]);

  useEffect(() => {
    dispatch(mainClubReadThunk(clubId));
    // 언마운트 될 때 리덕스에서 클럽데이터 없애기
    return () => {
      dispatch(mainClubUnloadRead());
    };
  }, []);

  // TODO: 오류 소스인데 시간 없어서 isBookmarked false 로 해놨음
  return (
    <Viewer
      club={club}
      onAddBookmark={onAddBookmark}
      onRemoveBookmark={onRemoveBookmark}
      isBookmarked={isBookmarked}
      loading={loading}
      error={error}
    />
  );
});
