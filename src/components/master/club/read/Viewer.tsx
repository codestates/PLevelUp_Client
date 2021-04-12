import styles from '../../../../styles/pages/master/read_page/ReadPage.module.scss';;
export default function Viewer() {
  return (
    <div className={styles.masterReadWrapper}>
      <div className={styles.readHead}>
        <h1>제목</h1>
        <div className={styles.subInfo}>
          <span>
            <b>tester</b>작성자
          </span>
          <span>{new Date().toLocaleDateString()}</span>작성 시간
        </div>
        <div>장소</div>
        <div>금액</div>
        <div>요일</div>
        <div>시작일</div>
        <div>종료일</div>
        <div>최대인원</div>
      </div>
      <div
        className={styles.readContent}
        dangerouslySetInnerHTML={{ __html: '<p>HTML<b>요약</b>입니다.</p>' }}
      />
      <div
        className={styles.readContent}
        dangerouslySetInnerHTML={{ __html: '<p>HTML<b>주제</b>입니다.</p>' }}
      />
    </div>
  );
}
