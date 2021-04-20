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
  const [endDate, setEndDate] = useState<Date>();

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
    setEndDate(new Date(club.endDate.toString()));
  }, [club]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'coverImg' && e.target.files) {
      onChangeField(e.target.name, e.target.files[0]);
      return;
    }
    onChangeField(e.target.name, e.target.value);
  };

  const onDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeField(e.target.name, e.target.value);
  };

  return (
    <div className={styles.masterEditWrapper}>
      <EditorBlock>
        <span>제목: </span>
        <input
          className={styles.titleInput}
          placeholder="제목을 입력하세요."
          onChange={onChange}
          value={club.title}
          name="title"
        />
        <br />
        <span>장소: </span>
        <input
          className={styles.etcInput}
          placeholder="장소를 입력하세요."
          onChange={onChange}
          value={club.place}
          name="place"
        />
        <br />
        <span>금액: </span>
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
        <br />
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
        <span style={{ marginLeft: '10px' }}>종료일: </span>
        <span>
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
        {/*<input*/}
        {/*  className={styles.etcInput}*/}
        {/*  placeholder="요일을 입력하세요."*/}
        {/*  onChange={onChange}*/}
        {/*  value={club.day}*/}
        {/*  name="day"*/}
        {/*/>*/}
        <br />
        <span>요일: </span>
        <select onChange={onDayChange} name="day">
          <option value="일">일</option>
          <option value="월">월</option>
          <option value="화">화</option>
          <option value="수">수</option>
          <option value="목">목</option>
          <option value="금">금</option>
          <option value="토">토</option>
        </select>
        <br />
        <span>최대 인원: </span>
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
        <br />
        <span>요약: </span>
        <input
          className={styles.etcInput}
          placeholder="요약을 입력하세요. 최대 40자"
          onChange={onChange}
          value={club.summary}
          type="text"
          name="summary"
        />
        <br />
        <span>설명: </span>
        <QuillWrapper>
          <div ref={descriptionQuillElement} className={styles.qlContainer} />
        </QuillWrapper>
        {club.coverUrl && <img src={club.coverUrl} alt="coverImg" />}
        <br />
        <span>커버 이미지: </span>
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="coverImg"
          onChange={onChange}
        />
      </EditorBlock>
    </div>
  );
}
