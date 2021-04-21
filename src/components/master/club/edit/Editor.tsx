// 등록 및 수정에서 사용되는 Editor
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styles from '../../../../styles/pages/master/edit_page/EditPage.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MasterClubEditReqType } from '../../../../api/master/club';
// children을 Type으로 빼고 ReactNode 타입지정은 귀찮으니 any로..
const EditorBlock = ({ children }: any) => (
  <div className={styles.editBlock}>{children}</div>
);

type InputType = {
  placeholder: string;
  value: string | number | undefined;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const QuillWrapper = ({ children }: any) => (
  <div className={styles.quillWrapper}>{children}</div>
);

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
};

export default function Editor({ club, onChangeField }: EditorType) {
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
      <EditorBlock>
        <input
          className={styles.titleInput}
          placeholder="제목을 입력하세요."
          onChange={onChange}
          value={club.title}
          name="title"
        />
        <input
          className={styles.etcInput}
          placeholder="장소를 입력하세요."
          onChange={onChange}
          value={club.place}
          name="place"
        />
        <input
          className={styles.etcInput}
          placeholder="금액을 입력하세요."
          onChange={onChange}
          value={club.price}
          type="number"
          step="1000"
          min="0"
          name="price"
        />
        <span>시작일: </span>
        <span>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              if (date) {
                onChangeField('startDate', date);
              }
            }}
          />
        </span>
        <br />
        <input
          className={styles.etcInput}
          placeholder="횟수를 입력하세요."
          onChange={onChange}
          value={club.times}
          name="times"
          type="number"
          step="1"
          min="1"
        />
        <input
          className={styles.etcInput}
          placeholder="최대 인원을 입력하세요."
          onChange={onChange}
          value={club.limitUserNumber}
          type="number"
          step="1"
          min="0"
          name="limitUserNumber"
        />
        <input
          className={styles.etcInput}
          placeholder="요약을 입력하세요. 최대 40자"
          onChange={onChange}
          value={club.summary}
          type="text"
          name="summary"
        />
        <hr />
        <QuillWrapper>
          <div ref={descriptionQuillElement} />
        </QuillWrapper>
        {club.coverUrl && <img src={club.coverUrl} alt="coverImg" />}
        <p>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="coverImg"
            onChange={onChange}
          />
        </p>
      </EditorBlock>
    </div>
  );
}
