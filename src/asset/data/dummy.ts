import landing1 from '../banner/landing1.jpeg';
import landing2 from '../banner/landing2.jpeg';
import landing3 from '../banner/landing3.jpeg';
import landing4 from '../banner/landing4.jpeg';
import introduce1 from '../banner/introduce1.jpeg';
import introduce2 from '../banner/introduce2.jpeg';

export const bannerData = [
  {
    id: 1,
    url: landing1,
  },
  {
    id: 2,
    url: landing2,
  },
  {
    id: 3,
    url: landing3,
  },
  {
    id: 4,
    url: landing4,
  },
];

export const infoBanner = [
  {
    id: 1,
    url: introduce1,
  },
  {
    id: 2,
    url: introduce2,
  },
  {
    id: 5,
    url:
      'https://cdn.discordapp.com/attachments/828197199833202739/835749252361617447/2021-04-25_2.27.39.png',
  },
];

export type FaqDummyType = {
  id: number;
  category?: string;
  question: string;
  answer: string | string[];
};

export const faqClubData: FaqDummyType[] = [
  {
    id: 1,
    category: '개발모임',
    question: '멤버구성은 어떻게 되나요?',
    answer:
      '정말 다양한 직업과 연령대의 멤버분들이 활동하고 계세요! 나와 다른 배경을 가진 멤버들의 다양한 이야기를 듣는 즐거움이 있을 거예요!',
  },
  {
    id: 2,
    category: '개발모임',
    question: '한 클럽 당 인원은 몇 명 정도인가요?',
    answer:
      '클럽마다 차이가 있지만, 모집 정원은 최대 20명이며 평균 16명 정도입니다. 특성에 따라 8명에서 20명까지 다양하게 구성되고 있어요!',
  },
  {
    id: 3,
    category: '개발모임',
    question: '개발모임에서는 어떤 공부를 진행하나요?',
    answer:
      '클럽장이 정한 주제로 함께 프로그래밍 스터디를 정해진 기간동안 공부합니다.',
  },
  {
    id: 4,
    category: '개발모임',
    question: '프레벨업 멤버가 된다는건?',
    answer:
      '프레벨업 개발모임은 프로그래밍 공부 또는 더 나아가 IT분야를 주제로 지적인 대화를 나누는 스터디 클럽이며, 토론의 장입니다. 그리고는 정기적으로 만나서 서로의 의견을 발전시키고 때로는 서로의 의견에 반대하면서 친해지기도 하고요. 기초적인 프로그래밍 지식부터 데이터 사이언스, 웹 디자인, 인공지능과 미래까지! 여러 시간 이야기를 나누고도 모자라, 밤새도록 남아 술잔을 기울이기도 합니다. 어디 요즘 세상에, 최소 한 달에 한 번은 꼬박꼬박 모여 이런 이야기를 나누는 친구들이 흔한가요?',
  },
  {
    id: 5,
    category: '개발모임',
    question: '클럽장은 어떤 역할을 하나요?',
    answer:
      '특정 기업 대표님, 교수님, 작가님 등 해당 분야 전문가분들이나 어떤 확고한 목표를 가지고 IT분야에 대해 공부하고자 하는 분들이 많이 클럽장으로 가입하십니다. 이렇게 오신 \'클럽장\'들은 해당 클럽의 커리큘럼을 직접 기획합니다. 같이 읽으면 좋은 책, 아티클, 영상/이미지 자료를 추천할 뿐만 아니라, 클럽이 어떤 식으로 운영되면 좋을지까지 같이 고민합니다. 나아가 모임 당일 양질의 대화가 이뤄질 수 있도록 토론 주제를 준비하고, 대화를 이끌고 있어요!',
  },
  {
    id: 6,
    category: '개발모임',
    question: '주제는 어떻게 선정되나요?',
    answer:
      '\'클럽장\'님이 정해오셔서 클럽을 이끌어나갈 것 입니다. 첫 모임 이후에 클럽장님이 자체적으로 정한 커리큘럼에 따라, 세부주제가 바뀝니다. 클럽마다 조금씩 다 다를 수 있으며, 클럽 참가자들과 함께 조율해나갈수도 있습니다. ',
  },
];

export const faqApplyData: FaqDummyType[] = [
  {
    id: 1,
    category: '신청',
    question: '클럽을 여러개 등록해도 되나요?',
    answer:
      '네 그렇습니다.',
  },
  {
    id: 2,
    category: '신청',
    question: '마감된 클럽은 신청할 수 없나요?',
    answer:
      '신청할 수 없습니다.',
  },
  {
    id: 3,
    category: '신청',
    question: '결제영수증은 어디서 확인할 수 있나요?',
    answer:
      '결제내역 페이지에서 확인 가능합니다.',
  },
];
export const faqRefundData: FaqDummyType[] = [
  {
    id: 1,
    category: '환불/변경',
    question: '환불은 어떻게 하나요?',
    answer:
      'contact@p-levelup.com 으로 문의바랍니다.',
  },
  {
    id: 2,
    category: '환불/변경',
    question: '클럽 변경이 가능한가요?',
    answer:
      ' 클럽 변경은 할 수 없습니다.',
  },
  {
    id: 3,
    category: '환불/변경',
    question: '양도가 가능한가요?',
    answer:
      ' 양도는 불가능합니다.',
  },
];

//------------------------------------------
export const faqForReadPageData: FaqDummyType[] = [
  {
    id: 1,
    question: '1. 프레벨업 멤버가 되면 어떤 혜택이 있나요?',
    answer: [
      '월 최소 1회, 보통 4번 이상의 프레벨업 개발모임에 참여하게 됩니다.',
    ],
  },
  {
    id: 2,
    question: '2. 주제는 어떻게 선정되나요?',
    answer: [
      '\'클럽장\'님이 정해오셔서 클럽을 이끌어나갈 것 입니다. 첫 모임 이후에 클럽장님이 자체적으로 정한 커리큘럼에 따라, 세부주제가 바뀝니다.',
    ],
  },
  {
    id: 3,
    question: '3. 모임 진행 순서는 어떻게 되나요?',
    answer: [
      '시즌 시작 후, 단톡방을 개설하여 초대해드립니다.',
      '함께 클럽장이 정한 클럽의 주제에 대해 토론하며 공부를 합니다.',
      '모임 이후 에도 꾸준히 만남을 가져볼수도 있지요.'
    ],
  },
  {
    id: 4,
    question: '4. 어떤 이야기를 나누나요? ',
    answer: [
      '프레벨업에서 우린 어떤 대화를 나누게 될까요?',
      '우리는 서로 가진 지식과 의견을 꺼내어 생각을 발전시킬 수 있는 주제, 또는 서로 의견이 달라 논쟁할 수 있는 주제로 이야기를 나누게 될 거예요.',
      "어떤 '발제'로 어떤 '토론'을 하는지 살짝 보여드릴께요.",
    ],
  },
];
