import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { masterEditInitialize, masterEditChangeField } from '../../../../modules/master/club/edit';
import Editor from '../../../../components/master/club/edit/Editor';
import { RootState } from '../../../../modules';

export default function EditorContainer() {
  const dispatch = useDispatch();
  const { data: club, loading: clubLoading, error: clubError } = useSelector(({ masterEditAsync }: RootState) => ({
      data: masterEditAsync.club?.data,
      loading: masterEditAsync.club?.loading,
      error: masterEditAsync.club?.error,
  }));

  const onChangeField = useCallback((key:string, value:string | number| Date) => {
    return dispatch(masterEditChangeField({key, value}))
  }, [
    dispatch,
  ]);

  // 언마운트될 때 초기화
  useEffect(
    () => () => {
      dispatch(masterEditInitialize());
    },
    [],
  );
  return <Editor club={club} onChangeField={onChangeField} />;
}
