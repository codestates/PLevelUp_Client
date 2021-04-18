import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  addBookmarkThunk,
  removeBookmarkThunk,
} from '../../modules/club/bookmark';
import { withRouter } from 'react-router-dom';
import ClubCard from '../../components/common/ClubCard';

//Todo: isbookmarked 리팩토링
export default withRouter(function ClubCardContainer({ club, history }: any) {
  const dispatch = useDispatch();
  const { data: user } = useSelector(({ mainUser }: RootState) => ({
    data: mainUser.user?.data,
  }));
  const onClickCard = (e: any) => {
    history.push(`/club/${club.id}`);
  };
  const onAddBookmark = (e: any) => {
    if (!user?._id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(addBookmarkThunk(club.id));
  };
  const onRemoveBookmark = (e: any) => {
    if (!user?._id) {
      e.stopPropagation(); //상위이벤트 제어
      history.push('/login');
    }
    e.stopPropagation(); //상위이벤트 제어
    dispatch(removeBookmarkThunk(club.id));
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  const isDBBookmark = club.Bookmarkers.find(
    (el: { id: number }) => el.id === user?._id,
  );

  useEffect(() => {
    if (club.isBookmark) {
      setIsBookmarked(true);
    }
    if (club.isBookmark === false) {
      setIsBookmarked(false);
    }
  }, [club]);

  useEffect(() => {
    if (isDBBookmark) {
      setIsBookmarked(true);
    }
  }, []);

  return (
    <ClubCard
      club={club}
      onClickCard={onClickCard}
      onAddBookmark={onAddBookmark}
      onRemoveBookmark={onRemoveBookmark}
      isBookmarked={isBookmarked}
    />
  );
});
