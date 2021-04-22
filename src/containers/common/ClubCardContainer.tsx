import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  mainBookmarkThunk,
  mainClubBookmarkUnload,
} from '../../modules/club/bookmark';
import { withRouter } from 'react-router-dom';
import ClubCard from '../../components/common/ClubCard';
import { MainClubReadResType } from '../../api/main/club';
import { RouteComponentProps } from 'react-router-dom';
import { MasterClubReadResType } from '../../api/master/club';

type ClubCardPropsType = {
  club: MainClubReadResType | MasterClubReadResType;
  isMain: boolean;
};
export default withRouter(function ClubCardContainer({
  club,
  history,
  isMain,
}: ClubCardPropsType & RouteComponentProps) {
  const dispatch = useDispatch();
  const { user, bookmark } = useSelector(
    ({ mainUser, mainBookmarkAsync }: RootState) => ({
      user: mainUser.user?.data,
      bookmark: mainBookmarkAsync.data,
    }),
  );
  const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMain) {
      history.push(`/club/${club.id}`);
    } else {
      history.push(`/master/${club.id}`);
    }
  };

  const onUpdateBookmark = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    isBookmark: boolean,
  ) => {
    e.stopPropagation(); //상위이벤트 제어
    if (!user?.id) {
      history.push('/login');
    }
    if ('isBookmark' in club && club.isBookmark) {
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
    'isBookmark' in club && setIsBookmarked(club.isBookmark);
    dispatch(mainClubBookmarkUnload());
  }, [club]);

  return (
    <ClubCard
      club={club}
      onClickCard={onClickCard}
      onUpdateBookmark={onUpdateBookmark}
      isMain={isMain}
      isBookmarked={isBookmarked}
    />
  );
});
