import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { MainClubReadResType } from '../../../api/main/club';
import styles from '../../../styles/pages/read_page/ReadPage.module.scss';
import { Mobile, PC } from '../../../mediaQuery';
import { useState } from 'react';

import { faqforReadPagedata } from 'asset/data/dummy';
import { FaHeart } from 'react-icons/fa';
import ErrorView from '../../common/ErrorView';
import Badge from '../../common/Badge';
import upArrow from '../../../asset/readPageInFAQ/upArrow.png';
import downArrow from '../../../asset/readPageInFAQ/downArrow.png';


export default function Viewer({
  club,
  onAddBookmark,
  onRemoveBookmark,
  isBookmarked,
  error,
  loading,
}: {
  club: MainClubReadResType | null;
  onAddBookmark: () => void;
  onRemoveBookmark: () => void;
  isBookmarked: boolean | undefined;
  error: AxiosError | null;
  loading: boolean;
}) {
  // 에러 발생 시
  if (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return <ErrorView children={'존재하지 않는 클럽입니다.'} />;
      }

      if (error.response.status === 400) {
        return <ErrorView children={'잘못된 요청 입니다.'} />;
      }
    }
    return <ErrorView children={'오류 발생'} />;
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !club) {
    return null;
  }

  const {
    id,
    title,
    price,
    place,
    description,
    startDate,
    day,
    coverUrl,
    isNew,
    isMostStart,
    isEnd,
    currentUserNumber,
    limitUserNumber,
  } = club;
  const createDate = `${new Date(startDate).getMonth() + 1}
  /${new Date(startDate).getDate()}`;

  const clubInfoContents = (
    <div className={styles.floatingCard}>
      <div className={styles.cardImgWrap}>
        <img src={coverUrl} alt="coverUrl" />
      </div>
      <div className={styles.cardContentsWrap}>
        <div className={styles.floatingClubName}>
          <span className={styles.clubTitle}>
            {title}
            <span className={styles.badges}>
              {isNew ? <Badge type="new">NEW</Badge> : null}
              {isMostStart ? <Badge type="mostFull">마감임박</Badge> : null}
              {isEnd ? <Badge type="full">마감</Badge> : null}
              {place === '온라인' ? <Badge type="online">온라인</Badge> : null}
            </span>
          </span>
        </div>

        <div className={styles.placeTimeContainer}>
          {place} | 매 주 {day}요일
          <br />
          {`첫 모임일 ${createDate}(${club.day})`}
        </div>
        <div className={styles.monthlyPrice}>총 {price}원</div>
      </div>
      <div className={styles.floatingCardBtn}>
        <div className={styles.fixedAppBtnBox}>
          <div className={styles.fixedAppBtn}>
            <button className={styles.fixedAppBtn1}>
              {isBookmarked ? (
                <FaHeart
                  className={`${styles.bookmarkIcon} ${styles.active}`}
                  onClick={onRemoveBookmark}
                  size={24}
                />
              ) : (
                <FaHeart
                  className={`${styles.bookmarkIcon}`}
                  size={24}
                  onClick={onAddBookmark}
                />
              )}
            </button>
            <div className={styles.applyBtn}>
              <button className={styles.fixedAppBtn2}>
                <Link className={styles.paymentLink} to={`${id}/payment`}>
                  {`${limitUserNumber - currentUserNumber
                    }자리 남았어요! 지금 시작`}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 내부 컴포넌트
  const CardViewer = () => (
    <div className={styles.clubInfoCard}>
      <div className={styles.clubCardContents}>
        <div className={styles.clubCardPC}>
          <PC children={clubInfoContents} />
          <Mobile children={clubInfoContents} />
        </div>
      </div>
    </div>
  );

  // 내부 컴포넌트
  const DescriptionViewer = () => (
    <div className={styles.infoContainer}>
      <div className={styles.infoWrap}>
        <div className={styles.infoContents}>
          <div
            className={styles.infoMainContents}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );



  const FAQViewer = () => {
    const [isToggleOne, setIsToggleOne] = useState(false);
    const [isToggleTwo, setIsToggleTwo] = useState(false);
    const [isToggleThree, setIsToggleThree] = useState(false);
    const [isToggleFour, setIsToggleFour] = useState(false);

    //드롭다운이 모두 같은 state를 공유해서 한 메뉴를 열면 다른 메뉴가 모두 열리는 문제가 있었음.
    //컨테이너를 하나 만들어서 그걸 거쳐서 props를 여기에 전달하는 방식은 굳이 아닌것 같았고,
    //굳이 toggle state를 여러번 선언할 필요도 없을것 같았지만,
    //분리가 되지 않아서 메뉴마다 하나씩 toggle state를 선언하기로 함.

    const onClick1 = () => {
      setIsToggleOne(!isToggleOne);

    }
    const onClick2 = () => {
      setIsToggleTwo(!isToggleTwo);

    }
    const onClick3 = () => {
      setIsToggleThree(!isToggleThree);

    }
    const onClick4 = () => {
      setIsToggleFour(!isToggleFour);

    }


    return (
      <div className={styles.faqContainer}>
        <div className={styles.faqWrap}>
          <div className={styles.faqMainContents}>
            <div className={styles.faqMainTitle}>FAQ</div>
            <div className={styles.faqMainBody}>
              <div className={styles.faqList}>

                <div className={styles.lis} onClick={onClick1}>
                  {
                    isToggleOne ? (
                      <div className={styles.qnaItem}>
                        <div className={styles.qnaQuestionTrue}>1. 프레벨업 멤버가 되면 어떤 혜택이 있나요?</div>
                        <img src={upArrow} className={styles.ArrowIcon} />
                      </div>
                    ) : <div className={styles.qnaItem}>
                      <div className={styles.qnaQuestionFalse}>1. 프레벨업 멤버가 되면 어떤 혜택이 있나요?</div>
                      <img src={downArrow} className={styles.ArrowIcon} />
                    </div>
                  }

                  {
                    isToggleOne ? (
                      <div className={styles.answerBox}>
                        { faqforReadPagedata.map((data) => (
                          data.id === 1 ? (
                            data['subText'].map((sub) => (
                              data['answer'].map((a) => (
                                data['subText'].indexOf(sub) === data['answer'].indexOf(a) ? (
                                  <div style={{ display: "inline-block" }}>
                                    <b className={styles.subAnswer}>{sub} </b>
                                    <span className={styles.answer}>{a}</span>
                                  </div>
                                ) : null
                              ))
                            ))
                          ) : null

                        ))
                        }
                        <p>
                          <span>{'> '}</span>
                          <Link to={`/help`} className={styles.LinkMoreInfo}>자세히 보러 가기</Link>
                        </p>
                      </div>
                    ) : null

                  }

                </div>
                <div className={styles.lis} onClick={onClick2}>
                  {
                    isToggleTwo ? (
                      <div className={styles.qnaItem}>
                        <div className={styles.qnaQuestionTrue}>2. 독후감을 제출하지 않으면 정말 모임에 참가할 수 없나요?</div>
                        <img src={upArrow} className={styles.ArrowIcon} />
                      </div>
                    ) : <div className={styles.qnaItem}>
                      <div className={styles.qnaQuestionFalse}>2. 독후감을 제출하지 않으면 정말 모임에 참가할 수 없나요?</div>
                      <img src={downArrow} className={styles.ArrowIcon} />
                    </div>
                  }
                  {
                    isToggleTwo ? (
                      <div className={styles.answerBox}>
                        { faqforReadPagedata.map((data) => (
                          data.id === 2 ? (
                            data['subText'].map((sub) => (
                              data['answer'].map((a) => (
                                data['subText'].indexOf(sub) === data['answer'].indexOf(a) ? (
                                  <div style={{ display: "inline-block" }}>
                                    <b className={styles.subAnswer}>{sub} </b>
                                    <span className={styles.answer}>{a}</span>
                                  </div>
                                ) : null
                              ))
                            ))
                          ) : null

                        ))
                        }
                        <p>
                          <span>{'> '}</span>
                          <Link to={`/help`} className={styles.LinkMoreInfo}>자세히 보러 가기</Link>
                        </p>
                      </div>
                    ) : null

                  }

                </div>
                <div className={styles.lis} onClick={onClick3}>
                  {
                    isToggleThree ? (
                      <div className={styles.qnaItem}>
                        <div className={styles.qnaQuestionTrue}>3. 모임 진행 순서는 어떻게 되나요?</div>
                        <img src={upArrow} className={styles.ArrowIcon} />
                      </div>
                    ) : <div className={styles.qnaItem}>
                      <div className={styles.qnaQuestionFalse}>3. 모임 진행 순서는 어떻게 되나요?</div>
                      <img src={downArrow} className={styles.ArrowIcon} />
                    </div>
                  }
                  {
                    isToggleThree ? (
                      <div className={styles.answerBox}>
                        { faqforReadPagedata.map((data) => (
                          data.id === 3 ? (
                            data['subText'].map((sub) => (
                              data['answer'].map((a) => (
                                data['subText'].indexOf(sub) === data['answer'].indexOf(a) ? (
                                  <div style={{ display: "inline-block" }}>
                                    <b className={styles.subAnswer}>{sub} </b>
                                    <span className={styles.answer}>{a}</span>
                                  </div>
                                ) : null
                              ))
                            ))
                          ) : null

                        ))
                        }
                        <p>
                          <span>{'> '}</span>
                          <Link to={`/help`} className={styles.LinkMoreInfo}>자세히 보러 가기</Link>
                        </p>
                      </div>
                    ) : null

                  }

                </div>
                <div className={styles.lis} onClick={onClick4}>
                  {
                    isToggleFour ? (
                      <div className={styles.qnaItem}>
                        <div className={styles.qnaQuestionTrue}>4. 어떤 이야기를 나누나요?</div>
                        <img src={upArrow} className={styles.ArrowIcon} />
                      </div>
                    ) : <div className={styles.qnaItem}>
                      <div className={styles.qnaQuestionFalse}>4. 어떤 이야기를 나누나요?</div>
                      <img src={downArrow} className={styles.ArrowIcon} />
                    </div>
                  }
                  {
                    isToggleFour ? (
                      <div className={styles.answerBox}>
                        { faqforReadPagedata.map((data) => (
                          data.id === 4 ? (
                            data['subText'].map((sub) => (
                              data['answer'].map((a) => (
                                data['subText'].indexOf(sub) === data['answer'].indexOf(a) ? (
                                  <div style={{ display: "inline-block" }}>
                                    <b className={styles.subAnswer}>{sub} </b>
                                    <span className={styles.answer}>{a}</span>
                                  </div>
                                ) : null
                              ))
                            ))
                          ) : null

                        ))
                        }
                        <p>
                          <span>{'> '}</span>
                          <Link to={`/help`} className={styles.LinkMoreInfo}>자세히 보러 가기</Link>
                        </p>
                      </div>
                    ) : null

                  }

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.readPage}>
      <CardViewer />
      <DescriptionViewer />
      <FAQViewer />
    </div>
  );
}
