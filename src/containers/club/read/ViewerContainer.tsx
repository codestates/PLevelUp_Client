import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../modules';
import {
  mainClubReadThunk,
  mainClubUnloadRead,
} from '../../../modules/club/read';
import {
  mainBookmarkThunk,
  mainClubBookmarkUnload,
} from '../../../modules/club/bookmark';
import Viewer from '../../../components/club/read/Viewer';

export default withRouter(function ViewerContainer({ match, history }) {
  const { clubId } = match.params;
  const dispatch = useDispatch();
  const { data: club, error, loading, bookmark, user } = useSelector(
    ({ mainReadAsync, mainBookmarkAsync, mainUser }: RootState) => ({
      data: mainReadAsync.club.data,
      error: mainReadAsync.club.error,
      loading: mainReadAsync.club.loading,
      bookmark: mainBookmarkAsync.data,
      user: mainUser.user?.data,
    }),
  );

  const onUpdateBookmark = (isBookmark: boolean) => {
    if (!user?.id) {
      history.push('/login');
    }
    if (club) {
      dispatch(mainBookmarkThunk(club.id, isBookmark));
    }
  };
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (club && bookmark && user) {
      if (bookmark.clubId === club.id && user.id === bookmark.userId) {
        setIsBookmarked(bookmark.isBookmark);
        dispatch(mainClubBookmarkUnload());
      }
    }
  }, [bookmark]);

  useEffect(() => {
    if (club) {
      setIsBookmarked(club.isBookmark);
      dispatch(mainClubBookmarkUnload());
    }
  }, [club]);

  useEffect(() => {
    dispatch(mainClubReadThunk(clubId));
    // 언마운트 될 때 리덕스에서 클럽데이터 없애기
    return () => {
      dispatch(mainClubUnloadRead());
    };
  }, []);

  return (
    <Viewer
      club={club}
      onUpdateBookmark={onUpdateBookmark}
      isBookmarked={isBookmarked}
      loading={loading}
      error={error}
    />
  );
});
