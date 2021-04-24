import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  masterEditInitialize,
  masterEditChangeField,
  masterClubUpdateThunk,
  masterClubWriteThunk,
  masterClubUnloadEdit,
} from '../../../../modules/master/club/edit';
import Editor from '../../../../components/master/club/edit/Editor';
import { RootState } from '../../../../modules';
import { withRouter } from 'react-router-dom';
import EditActionButtons from '../../../../components/master/club/edit/EditActionButtons';
import LoadingModal from '../../../../components/common/LoadingModal';

export type errorsType = {
  title: string;
  summary: string;
  price: string;
  place: string;
  description: string;
  startDate: string;
  times: string;
  limitUserNumber: string;
  coverImg: string;
  server: string;
};

export default withRouter(function EditorContainer({ history }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<errorsType>({
    title: '',
    summary: '',
    price: '',
    place: '',
    description: '',
    startDate: '',
    times: '',
    limitUserNumber: '',
    coverImg: '',
    server: '',
  });
  const { localClub, data: club, loading, error } = useSelector(
    ({ masterEdit, masterEditAsync }: RootState) => ({
      localClub: masterEdit.club,
      data: masterEditAsync.club.data,
      loading: masterEditAsync.club.loading,
      error: masterEditAsync.club.error,
    }),
  );

  const onChangeField = useCallback(
    (key: string, value: string | number | Date | File) => {
      return dispatch(masterEditChangeField({ key, value }));
    },
    [dispatch],
  );

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (club) {
      const { id } = club;
      // console.log('등록 or 수정 성공');
      history.push(`/master/${id}`);
    }
    if (error) {
      if (error.response?.status === 400) {
        const key = error.response.data.split('"')[1];

        setErrors(prevError => {
          return {
            ...prevError,
            [key]: `${key}을/를 입력해주세요.`,
          };
        });
      } else {
        setErrors(prevError => {
          return {
            ...prevError,
            server: error.response?.data,
          };
        });
        // console.log(error);
      }
    }
  }, [history, club, error]);

  // 언마운트될 때 초기화
  useEffect(
    () => () => {
      dispatch(masterEditInitialize());
      dispatch(masterClubUnloadEdit());
    },
    [],
  );

  // 포스트 등록
  const onConfirm = () => {
    const {
      title,
      summary,
      price,
      place,
      description,
      startDate,
      times,
      limitUserNumber,
      coverImg,
      coverUrl,
    } = localClub;
    setErrors({
      title: '',
      summary: '',
      price: '',
      place: '',
      description: '',
      startDate: '',
      times: '',
      limitUserNumber: '',
      coverImg: '',
      server: '',
    });
    if (
      !title ||
      !summary ||
      !price ||
      !place ||
      !description ||
      !startDate ||
      !times ||
      !limitUserNumber ||
      (!coverUrl && !coverImg)
    ) {
      if (!title) {
        setErrors(prevError => {
          return {
            ...prevError,
            title: '제목을 입력해주세요.',
          };
        });
      }

      if (!summary) {
        setErrors(prevError => {
          return {
            ...prevError,
            summary: '요약을 입력해주세요.',
          };
        });
      }

      if (!price) {
        setErrors(prevError => {
          return {
            ...prevError,
            price: '가격을 입력해주세요.',
          };
        });
      }

      if (!place) {
        setErrors(prevError => {
          return {
            ...prevError,
            place: '장소를 입력해주세요.',
          };
        });
      }

      if (!description) {
        setErrors(prevError => {
          return {
            ...prevError,
            description: '설명을 입력해주세요.',
          };
        });
      }

      if (!startDate) {
        setErrors(prevError => {
          return {
            ...prevError,
            startDate: '시작일을 입력해주세요.',
          };
        });
      }

      if (!times) {
        setErrors(prevError => {
          return {
            ...prevError,
            times: '횟수를 입력해주세요.',
          };
        });
      }
      if (!limitUserNumber) {
        console.log('anjwl?');
        setErrors(prevError => {
          return {
            ...prevError,
            limitUserNumber: '최대 인원을 입력해주세요.',
          };
        });
      }

      if (!coverUrl && !coverImg) {
        setErrors(prevError => {
          return {
            ...prevError,
            coverImg: '커버 이미지를 등록해주세요.',
          };
        });
      }
      return;
    }

    if (localClub.id) {
      dispatch(masterClubUpdateThunk(localClub));
      return;
    }
    dispatch(masterClubWriteThunk(localClub));
  };

  // 취소
  const onCancel = () => {
    history.goBack();
  };

  return (
    <>
      <Editor club={localClub} onChangeField={onChangeField} errors={errors} />
      <EditActionButtons
        onConfirm={onConfirm}
        onCancel={onCancel}
        isUpdate={!!localClub.id}
      />
      <LoadingModal isVisible={loading} />
    </>
  );
});
