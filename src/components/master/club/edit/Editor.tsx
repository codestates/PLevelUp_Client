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
  onChangeField: (key: string, value: string | number | Date) => void;
};

export default function Editor({ club, onChangeField }: EditorType) {
  const summaryQuillElement = useRef<any>(); // Quill을 적용할 DivElement 를 설정
  const summaryQuillInstance = useRef<Quill>(); // Quill 인스턴스를 설정
  const descriptionQuillElement = useRef<any>(); // Quill을 적용할 DivElement 를 설정
  const descriptionQuillInstance = useRef<Quill>(); // Quill 인스턴스를 설정
  const topicQuillElement = useRef<any>(); // Quill을 적용할 DivElement 를 설정
  const topicQuillInstance = useRef<Quill>(); // Quill 인스턴스를 설정
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const quillChange = (key: string, quill: Quill) => {
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField(key, quill.root.innerHTML);
      }
    });
  };

  useEffect(() => {
    summaryQuillInstance.current = createQuill(
      summaryQuillElement,
      '요약을 입력하세요.',
    );
    descriptionQuillInstance.current = createQuill(
      descriptionQuillElement,
      '설명을 입력하세요.',
    );
    topicQuillInstance.current = createQuill(
      topicQuillElement,
      '주제를 입력하세요.',
    );

    quillChange('summary', summaryQuillInstance.current);
    quillChange('description', descriptionQuillInstance.current);
    quillChange('topic', topicQuillInstance.current);
  }, [onChangeField]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <span>종료일: </span>
        <span style={{ marginLeft: '10px' }}>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => {
              setEndDate(date);
              if (date) {
                onChangeField('endDate', date);
              }
            }}
          />
        </span>
        <input
          className={styles.etcInput}
          placeholder="요일을 입력하세요."
          onChange={onChange}
          value={club.day}
          name="day"
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
        <QuillWrapper>
          <div ref={summaryQuillElement} />
        </QuillWrapper>
        <hr />
        <QuillWrapper>
          <div ref={topicQuillElement} />
        </QuillWrapper>
        <hr />
        <QuillWrapper>
          <div ref={descriptionQuillElement} />
        </QuillWrapper>
      </EditorBlock>
    </div>
  );
}
