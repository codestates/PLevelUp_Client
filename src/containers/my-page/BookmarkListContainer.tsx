import { mainClubBookmarkUnload } from 'modules/club/bookmark';
import { mainGetBookmarkListThunk } from 'modules/club/list';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkList from '../../components/my-page/BookmarkList';
import { RootState } from '../../modules';
import { MainClubListResType, MainClubReadResType } from '../../api/main/club';

export default function BookmarkListContainer() {
  const dispatch = useDispatch();
  const { clubs, bookmark } = useSelector(
    ({ mainListAsync, mainBookmarkAsync }: RootState) => ({
      clubs: mainListAsync.clubs.data,
      bookmark: mainBookmarkAsync.bookmark.data,
    }),
  );
  const [bookmarkClubList, setBookmarkClubList] = useState<MainClubListResType>(
    [],
  );

  //초기 렌더링
  //북마크된 클럽들만 가져오기
  useEffect(() => {
    dispatch(mainGetBookmarkListThunk());
  }, []);
  //가져온클럽들 bookmarkClubList 설정
  useEffect(() => {
    if (clubs) {
      setBookmarkClubList(clubs);
    }
  }, [clubs]);

  //북마크 바뀔 경우 상태변하도록
  const newClubList = bookmarkClubList?.map((club: MainClubReadResType) =>
    club.id === bookmark?.clubId
      ? {
          ...club,
          isBookmark: bookmark?.isBookmark,
        }
      : club,
  );
  useEffect(() => {
    setBookmarkClubList(newClubList);
    dispatch(mainClubBookmarkUnload());
  }, [bookmark]);

  return <BookmarkList clubs={bookmarkClubList} />;
}
