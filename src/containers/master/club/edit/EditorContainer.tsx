import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  masterEditInitialize,
  masterEditChangeField,
} from '../../../../modules/master/club/edit';
import Editor from '../../../../components/master/club/edit/Editor';
import { RootState } from '../../../../modules';

export default function EditorContainer() {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { club } = useSelector(({ masterEdit }: RootState) => ({
    club: masterEdit.club,
  }));

  const onChangeField = useCallback(
    (key: string, value: string | number | Date | File) => {
      return dispatch(masterEditChangeField({ key, value }));
    },
    [dispatch],
  );

  // 언마운트될 때 초기화
  useEffect(
    () => () => {
      dispatch(masterEditInitialize());
    },
    [],
  );

  return <Editor club={club} onChangeField={onChangeField} />;
}
