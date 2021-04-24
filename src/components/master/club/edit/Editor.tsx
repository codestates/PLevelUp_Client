// 등록 및 수정에서 사용되는 Editor
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styles from '../../../../styles/pages/master/edit_page/EditPage.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../../styles/pages/master/edit_page/EditPageEditor.css';
import { MasterClubEditReqType } from '../../../../api/master/club';
import { errorsType } from '../../../../containers/master/club/edit/EditorContainer';

function createQuill(
  element: React.MutableRefObject<any>,
  placeholderString: string,
) {
  return new Quill(element.current, {
    theme: 'bubble',
    placeholder: placeholderString,
    modules: {
      // 더 많은 옵션
      // https://quilljs.com/docs/modules/toolbar / 참고
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block', 'link', 'image'],
      ],
    },
  });
}

type EditorType = {
  club: MasterClubEditReqType;
  onChangeField: (key: string, value: string | number | Date | File) => void;
  errors: errorsType;
};

export default function Editor({ club, onChangeField, errors }: EditorType) {
  const descriptionQuillElement = useRef<any>(); // Quill을 적용할 DivElement 를 설정
  const descriptionQuillInstance = useRef<Quill>(); // Quill 인스턴스를 설정
  const [startDate, setStartDate] = useState<Date>();

  const quillChange = (key: string, quill: Quill) => {
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField(key, quill.root.innerHTML);
      }
    });
  };

  useEffect(() => {
    descriptionQuillInstance.current = createQuill(
      descriptionQuillElement,
      '설명을 입력하세요.',
    );
    quillChange('description', descriptionQuillInstance.current);
  }, [onChangeField]);

  // 수정 시 기존 데이터를 화면에 출력해준다.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (club && descriptionQuillInstance.current) {
      descriptionQuillInstance.current.root.innerHTML = club.description;
    }
    setStartDate(new Date(club.startDate.toString()));
  }, [club]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'coverImg' && e.target.files) {
      onChangeField(e.target.name, e.target.files[0]);
      return;
    }
    onChangeField(e.target.name, e.target.value);
  };

  return (
    <div className={styles.masterEditWrapper}>
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>제목</span>
        <input
          className={styles.editInput}
          placeholder="제목을 입력하세요."
          onChange={onChange}
          value={club.title}
          name="title"
        />
      </div>
      {errors.title !== '' && (
        <div className={styles.editErrorMessage}>{errors.title}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>장소</span>
        <input
          className={styles.editInput}
          placeholder="장소를 입력하세요."
          onChange={onChange}
          value={club.place}
          name="place"
        />
      </div>
      {errors.place !== '' && (
        <div className={styles.editErrorMessage}>{errors.place}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>금액</span>
        <input
          className={styles.editInput}
          placeholder="금액을 입력하세요."
          onChange={onChange}
          value={club.price}
          type="number"
          step="1000"
          min="0"
          name="price"
        />
      </div>
      {errors.price !== '' && (
        <div className={styles.editErrorMessage}>{errors.price}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>횟수</span>
        <input
          className={styles.editInput}
          placeholder="횟수를 입력하세요."
          onChange={onChange}
          value={club.times}
          name="times"
          type="number"
          step="1"
          min="1"
        />
      </div>
      {errors.times !== '' && (
        <div className={styles.editErrorMessage}>{errors.times}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>최대 인원</span>
        <input
          className={styles.editInput}
          placeholder="최대 인원을 입력하세요."
          onChange={onChange}
          value={club.limitUserNumber}
          type="number"
          step="1"
          min="2"
          name="limitUserNumber"
        />
      </div>
      {errors.limitUserNumber !== '' && (
        <div className={styles.editErrorMessage}>{errors.limitUserNumber}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>요약</span>
        <input
          className={styles.editInput}
          placeholder="요약을 입력하세요. 최대 40자"
          onChange={onChange}
          value={club.summary}
          type="text"
          name="summary"
        />
      </div>
      {errors.summary !== '' && (
        <div className={styles.editErrorMessage}>{errors.summary}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>커버 이미지</span>
        <input
          className={styles.editFile}
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="coverImg"
          onChange={onChange}
        />
        {club.coverUrl && <img src={club.coverUrl} alt="coverImg" />}
      </div>
      {errors.coverImg !== '' && (
        <div className={styles.editErrorMessage}>{errors.coverImg}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName} style={{ float: 'left' }}>
          시작일
        </span>
        <div className={styles.editDatePicker} style={{ float: 'left' }}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              if (date) {
                onChangeField('startDate', date);
              }
            }}
          />
        </div>
      </div>
      {errors.startDate !== '' && (
        <div className={styles.editErrorMessage}>{errors.startDate}</div>
      )}
      <div className={styles.editInputBlock}>
        <span className={styles.editName}>설명</span>
        <div className={styles.editInput}>
          <div ref={descriptionQuillElement} />
        </div>
      </div>
      {errors.description !== '' && (
        <div className={styles.editErrorMessage}>{errors.description}</div>
      )}
      {errors.server !== '' && (
        <div className={styles.editErrorMessage}>{errors.server}</div>
      )}
    </div>
  );
}
