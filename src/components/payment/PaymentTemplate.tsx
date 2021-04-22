import api from '../../api';
import styles from '../../styles/pages/payment_page/PaymentPage.module.scss';
import { Tablet, Desktop } from '../../mediaQuery';
import { IoIosCheckbox } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { GoLightBulb } from 'react-icons/go';
import { IamportPaymentReqType } from '../../api/main/payment';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { MainClubReadResType } from 'api/main/club';
import { MainIsLoginResType } from 'api/main/auth';
import { AxiosError } from 'axios';

type PaymentType = {
  club: MainClubReadResType;
  user: MainIsLoginResType | any;
  error: AxiosError | null;
  loading: boolean;
};

export default withRouter(function PaymentTemplate({
  club,
  user,
  history,
  error,
  loading,
}: PaymentType & RouteComponentProps) {
  if (!user) {
    alert('로그인이 필요한 서비스입니다!');
    history.push('/login');
  }

  const { id, title, place, price, startDate, times, day, coverUrl } = club;

  const { IMP } = window;
  IMP?.init('imp67413694');

  const onPay = () => {
    const params: IamportPaymentReqType = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: club?.title,
      amount: club?.price,
      buyer_email: user?.email,
      buyer_name: user?.username,
      custom_data: club.id,
      m_redirect_url: `api/main/club/${id}/payment`,
      card_quota: [1, 2, 3, 4],
    };

    IMP?.request_pay(params, res => {
      if (res.success) {
        api
          .post(`api/main/club/${id}/payment`, {
            imp_uid: res.imp_uid,
            merchant_uid: res.merchant_uid,
          })
          .then(res => {
            if (res.data.status === 'paid') {
              alert('결제가 완료되었습니다.');
              history.push('/mypage');
            }
          })
          .catch(err => alert('결제에 실패했습니다. 다시 한 번 시도해주세요.'));
      } else {
        alert('결제가 취소되었습니다.');
      }
    });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      {loading && <div>로딩중..</div>}
      <div className={styles.desktopContainer}>
        <Desktop>
          <div className={styles.wrapper}>
            <div className={styles.mainTitle}>결제 정보</div>
            <div className={styles.flexContainer}>
              <div className={styles.clubContainer}>
                <div className={styles.clubInfo}>
                  <div className={styles.coverImg}>
                    <div className={styles.imgUrl}>
                      <img src={coverUrl} className={styles.url}></img>
                    </div>
                  </div>
                  <div className={styles.compactClub}>
                    <div className={styles.badge}>신청하신 클럽</div>
                    <div className={styles.clubName}>{title}</div>
                    <div className={styles.clubTime}>
                      <span className={styles.calendar}>
                        <GoLightBulb color="#b6b6c0" size="17" />
                      </span>
                      {`첫 만남일 ${startDate}`}
                    </div>
                    <div className={styles.clubTime}>
                      <span className={styles.calendar}>
                        <AiTwotoneCalendar color="#b6b6c0" size="17" />
                      </span>
                      {`매주 ${day}요일`}
                    </div>
                    <div className={styles.clubPlace}>
                      <div className={styles.location}>
                        <IoLocationSharp color="#b6b6c0" size="17" />
                      </div>
                      <div className={styles.location}>
                        <div>{place}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.membershipInfo}>
                  <div className={styles.noticeTitle}>
                    프레벨업 멤버십 혜택 안내
                  </div>
                  <br />
                  <div
                    className={styles.period}
                  >{`멤버십 횟수: 총 ${times}회`}</div>
                  <div className={styles.benefitInfo}>
                    <div className={styles.benefitContainer}>
                      <div className={styles.benefitItem}>
                        <div className={styles.benefitTitle}>🎟 제휴혜택</div>
                        <div className={styles.benefitContent}>
                          라이프스타일, 쇼핑, 교육 등 약 10여 가지의 다양한 제휴
                          할인 혜택이 제공됩니다.
                        </div>
                      </div>
                      <div className={styles.benefitItem}>
                        <div className={styles.benefitTitle}>🤹 이벤트</div>
                        <div className={styles.benefitContent}>
                          다양한 체험과 강연 이벤트를 멤버 할인가에 참여할 수
                          있습니다.
                        </div>
                      </div>
                    </div>
                    <div className={styles.benefitContainer}>
                      <div className={styles.benefitItem}>
                        <div className={styles.benefitTitle}>
                          🏠 아지트 무료 대관
                        </div>
                        <div className={styles.benefitContent}>
                          강남, 여의도 아지트 공간 무료 대관 OK!
                        </div>
                      </div>
                      <div className={styles.benefitItem}>
                        <div className={styles.benefitTitle}>
                          👀 다른 클럽 놀러가기
                        </div>
                        <div className={styles.benefitContent}>
                          다른 클럽에도 놀러 갈 수 있습니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.paymentContainer}>
                <div className={styles.paymentInfoBox}>
                  <div className={styles.priceWrapper}>
                    <div className={styles.priceContent}>
                      <span className={styles.category}>멤버십 비용</span>
                      <div className={styles.price}>{price}</div>
                    </div>
                  </div>
                  <div className={styles.middleLine}></div>
                  <div className={styles.infoContainer}>
                    <div className={styles.method}>
                      <span>결제수단 선택</span>
                    </div>
                    <div className={styles.infoContainerForm}>
                      <form>
                        <div className={styles.formCheck}>
                          <input
                            type="radio"
                            value="card"
                            name="selectMethod"
                          ></input>
                          신용카드 / 체크카드
                          <div className={styles.cardNotice}>
                            모든 신용카드 4개월 무이자 할부 가능
                          </div>
                        </div>
                        <div className={styles.formCheck}>
                          <input
                            type="radio"
                            value="vbank"
                            name="selectMethod"
                          ></input>
                          계좌이체 (가상계좌)
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={styles.middleLine}></div>
                  <div className={styles.infoContainer}>
                    <div className={styles.refundPolicy}>
                      ※ 수수료 발생 기간에도 결제 당일 23시 59분까지 전액 환불이
                      가능합니다.
                    </div>
                    <div className={styles.policyContainer}>
                      <div className={styles.checkBox} onClick={handleCheck}>
                        {isChecked ? (
                          <IoIosCheckbox color="#5d3dbf" size="20" />
                        ) : (
                          <IoIosCheckbox color="#e4e4e4" size="20" />
                        )}
                      </div>
                      <div>
                        결제 진행시 프레벨업의 이용약관 및 개인정보 처리방침을
                        모두 이해하였으며, 이에 동의한 것으로 간주됩니다.
                      </div>
                    </div>
                    <div className={styles.btnContainer}>
                      {isChecked ? (
                        <button
                          type="button"
                          className={styles.paymentBtn}
                          onClick={onPay}
                        >
                          <div>{`${price}원 결제하기`}</div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`${styles.paymentBtn} ${styles.disabled}`}
                        >
                          <div>{`${price}원 결제하기`}</div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Desktop>
      </div>

      <div className={styles.tabletContainer}>
        <Tablet>
          <div className={styles.wrapper}>
            <div className={styles.infoBox}>
              <div className={styles.clubInfoContainer}>
                <div className={styles.infoContainer}>
                  <div className={styles.compactClub}>
                    <div className={styles.left}>
                      <span className={styles.badge}>신청하신 클럽</span>
                      <div className={styles.clubName}>{title}</div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.classImg}>
                        <img src={coverUrl} className={styles.coverImg} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.margin}></div>
                  <div className={styles.detailInfo}>
                    <div className={styles.textBox}>
                      <div className={styles.timeContainer}>
                        <span>
                          <GoLightBulb color="#b6b6c0" size="17" />
                        </span>
                        <div className={styles.date}>
                          {`첫 만남일 ${startDate}`}
                        </div>
                      </div>
                      <div className={styles.timeContainer}>
                        <span>
                          <AiTwotoneCalendar color="#b6b6c0" size="17" />
                        </span>
                        <div className={styles.date}>{`매주 ${day}요일`}</div>
                      </div>
                    </div>
                    <div className={styles.placeContainer}>
                      <div>
                        <IoLocationSharp color="#b6b6c0" size="17" />
                      </div>
                      <div className={styles.textBox}>
                        <div>{place}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <div className={styles.infoContainer}>
                    <div className={styles.noticeTitle}>
                      프레벨업 멤버십 혜택 안내
                    </div>
                    <div className={styles.period}>
                      {`멤버십 횟수: 총 ${times}회`}
                    </div>
                    <div className={styles.infoContainer}>
                      <div className={styles.benefitContainer}>
                        <div className={styles.benefitItem}>
                          <div className={styles.benefitTitle}>🎟 제휴혜택</div>
                          <div className={styles.benefitContent}>
                            라이프스타일, 쇼핑, 교육 등 약 10여 가지의 다양한
                            제휴 할인 혜택이 제공됩니다.
                          </div>
                        </div>
                        <div className={styles.benefitItem}>
                          <div className={styles.benefitTitle}>🤹 이벤트</div>
                          <div className={styles.benefitContent}>
                            다양한 체험과 강연 이벤트를 멤버 할인가에 참여할 수
                            있습니다.
                          </div>
                        </div>
                      </div>
                      <div className={styles.benefitContainer}>
                        <div className={styles.benefitItem}>
                          <div className={styles.benefitTitle}>
                            🏠 아지트 무료 대관
                          </div>
                          <div className={styles.benefitContent}>
                            강남, 여의도 등 아지트 공간 무료 대관 OK!
                          </div>
                        </div>
                        <div className={styles.benefitItem}>
                          <div className={styles.benefitTitle}>
                            👀 다른 클럽 놀러가기
                          </div>
                          <div className={styles.benefitContent}>
                            다른 클럽에도 놀러 갈 수 있습니다.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paymentInfoBox}>
              <div className={styles.clubInfoContainer}>
                <div className={styles.infoContainer}>
                  <div className={styles.priceInfo}>
                    <span className={styles.name}>멤버십 비용</span>
                    <div className={styles.price}>{`${price}원`}</div>
                  </div>
                </div>
                <div className={styles.middleLine}></div>
                <div className={styles.infoContainer}>
                  <div className={styles.method}>
                    <span>결제수단 선택</span>
                  </div>
                  <div className={styles.infoContainer}>
                    <form>
                      <div className={styles.formCheck}>
                        <input
                          type="radio"
                          value="card"
                          name="selectMethod"
                        ></input>
                        신용카드 / 체크카드
                        <div className={styles.cardNotice}>
                          모든 신용카드 4개월 무이자 할부 가능
                        </div>
                      </div>
                      <div className={styles.formCheck}>
                        <input
                          type="radio"
                          value="vbank"
                          name="selectMethod"
                        ></input>
                        계좌이체 (가상계좌)
                      </div>
                    </form>
                  </div>
                </div>
                <div className={styles.middleLine}></div>
                <div className={styles.infoContainer}>
                  <div className={styles.refundPolicy}>
                    ※ 수수료 발생 기간에도 결제 당일 23시 59분까지 전액 환불이
                    가능합니다.
                  </div>
                  <div className={styles.policyContainer}>
                    <div className={styles.checkBox} onClick={handleCheck}>
                      {isChecked ? (
                        <IoIosCheckbox color="#5d3dbf" size="20" />
                      ) : (
                        <IoIosCheckbox color="#e4e4e4" size="20" />
                      )}
                    </div>
                    <div>
                      결제 진행시 프레벨업의 이용약관 및 개인정보 처리방침을
                      모두 이해하였으며, 이에 동의한 것으로 간주됩니다.
                    </div>
                  </div>
                  <div className={styles.btnContainer}>
                    {isChecked ? (
                      <button
                        type="button"
                        className={styles.paymentBtn}
                        onClick={onPay}
                      >
                        <div>{`${price}원 결제하기`}</div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`${styles.paymentBtn} ${styles.disabled}`}
                      >
                        <div>{`${price}원 결제하기`}</div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tablet>
      </div>
    </div>
  );
});
