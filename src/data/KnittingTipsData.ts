/**
 * 뜨개질 팁 모음 데이터
 * 관리하기 쉽도록 별도 파일로 분리
 */

export interface KnittingTip {
  id: string;
  category: 'beginner' | 'technique' | 'problem' | 'material';
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const knittingTipsData: KnittingTip[] = [
  {
    id: '1',
    category: 'beginner',
    title: '처음 시작할 때 실 선택하는 법',
    content:
      '초보자는 중간 굵기의 면실이나 아크릴실을 추천합니다. 너무 얇거나 두꺼운 실은 피하고, 밝은 색상을 선택하면 코를 세기 쉬워요. 특히 아크릴실은 가격이 저렴하고 세탁이 쉬워서 연습용으로 최적입니다.',
    difficulty: 'easy',
  },
  {
    id: '2',
    category: 'technique',
    title: '텐션을 일정하게 유지하는 방법',
    content:
      '실을 너무 조이지도 너무 느슨하게 하지도 말고 일정한 힘으로 잡아주세요. 손목에 힘을 빼고 자연스럽게 실을 감는 것이 중요합니다. 처음에는 어렵지만 꾸준히 연습하면 자연스럽게 일정한 텐션을 유지할 수 있어요.',
    difficulty: 'medium',
  },
  {
    id: '3',
    category: 'problem',
    title: '코가 떨어졌을 때 해결법',
    content:
      '코가 떨어져도 당황하지 마세요. 코바늘이나 뜨개질용 안전핀을 사용해서 떨어진 코를 다시 집어 올릴 수 있습니다. 떨어진 코를 찾아서 아래에서 위로 차례대로 다시 떠 올리면 됩니다. 연습용 작품에서 미리 해보는 것이 좋아요.',
    difficulty: 'medium',
  },
  {
    id: '4',
    category: 'beginner',
    title: '바늘을 잡는 올바른 방법',
    content:
      '연필을 잡듯이 자연스럽게 바늘을 잡아주세요. 너무 꽉 잡으면 손목이 아프고 피로해집니다. 오른손은 바늘을 조작하고, 왼손은 실과 코를 컨트롤하는 역할을 합니다. 처음에는 어색하지만 점차 익숙해질 거예요.',
    difficulty: 'easy',
  },
  {
    id: '5',
    category: 'technique',
    title: '게이지 뜨기의 중요성',
    content:
      '작품을 시작하기 전에 반드시 게이지를 떠보세요. 10cm x 10cm 정사각형에 몇 코, 몇 단이 들어가는지 확인해야 합니다. 게이지가 맞지 않으면 완성된 작품의 크기가 달라질 수 있어요. 바늘 호수를 조정해서 게이지를 맞춰주세요.',
    difficulty: 'medium',
  },
  {
    id: '6',
    category: 'problem',
    title: '뜨개질이 비뚤어질 때',
    content:
      '뜨개질이 한쪽으로 비뚤어지는 것은 텐션이 일정하지 않거나 코를 빼먹었기 때문일 수 있습니다. 매 단마다 코 수를 확인하고, 텐션을 일정하게 유지하세요. 또한 바늘을 너무 기울여서 뜨지 않도록 주의해주세요.',
    difficulty: 'medium',
  },
  {
    id: '7',
    category: 'material',
    title: '실 끝 처리하는 깔끔한 방법',
    content:
      '작업이 끝나면 실 끝을 5-6cm 정도 남기고 자릅니다. 털실 바늘에 끼워서 뜨개질 조직 사이사이로 넣었다 빼기를 3-4번 반복한 후 남은 부분을 잘라주세요. 같은 색 실이 지나가는 부분에 숨기면 더 깔끔해집니다.',
    difficulty: 'easy',
  },
  {
    id: '8',
    category: 'beginner',
    title: '첫 작품으로 추천하는 것들',
    content:
      '첫 작품으로는 수세미, 코스터, 목도리 같은 단순한 직사각형 모양을 추천합니다. 메리야스뜨기만으로도 충분히 예쁜 작품을 만들 수 있어요. 복잡한 패턴은 피하고 기본기를 충분히 익힌 후에 도전하세요.',
    difficulty: 'easy',
  },
  {
    id: '9',
    category: 'technique',
    title: '색깔 바꿀 때 깔끔하게 하는 법',
    content:
      '색깔을 바꿀 때는 단의 끝에서 바꾸는 것이 가장 깔끔합니다. 새로운 색 실로 마지막 두 번째 고리를 빼주면 자연스럽게 색이 바뀝니다. 실 끝은 나중에 뜨개질 조직에 숨겨서 처리해주세요.',
    difficulty: 'medium',
  },
  {
    id: '10',
    category: 'problem',
    title: '뜨개질이 너무 팽팽할 때',
    content:
      '뜨개질이 너무 팽팽하면 바늘이 잘 들어가지 않고 손목도 아픕니다. 실을 조금 더 느슨하게 잡거나 한 호수 큰 바늘을 사용해보세요. 손에 힘을 빼고 편안하게 뜨는 것이 중요합니다.',
    difficulty: 'easy',
  },
  {
    id: '11',
    category: 'material',
    title: '뜨개질 도구 관리하는 법',
    content:
      '바늘은 사용 후 깨끗하게 닦아서 보관하세요. 실은 직사광선을 피해 서늘하고 건조한 곳에 보관합니다. 나방을 방지하기 위해 라벤더나 삼나무 향이 나는 방충제를 함께 넣어두면 좋아요.',
    difficulty: 'easy',
  },
  {
    id: '12',
    category: 'technique',
    title: '뜨개질 패턴 읽는 방법',
    content:
      '패턴을 읽을 때는 약어를 먼저 익히세요. K는 메리야스뜨기, P는 안뜨기를 뜻합니다. 괄호 안의 숫자는 반복 횟수를 나타내요. 차트가 있다면 오른쪽에서 왼쪽으로, 아래에서 위로 읽습니다.',
    difficulty: 'hard',
  },
  // 추가 팁들 - 나중에 더 쉽게 추가할 수 있도록
  {
    id: '13',
    category: 'beginner',
    title: '뜨개질 속도를 높이는 방법',
    content:
      '뜨개질 속도는 정확성이 먼저입니다. 처음에는 천천히 정확하게 뜨는 것이 중요해요. 익숙해지면 자연스럽게 속도가 빨라집니다. 손목과 손가락의 움직임을 최소화하고 리듬감 있게 뜨는 것이 포인트예요.',
    difficulty: 'easy',
  },
  {
    id: '14',
    category: 'technique',
    title: '매직루프 기법 활용하기',
    content:
      '원형바늘로 작은 둘레의 원형 뜨개질을 할 때 매직루프 기법을 사용하면 편리합니다. 바늘의 케이블을 이용해 코를 반으로 나누어 뜨는 방법으로, 양말이나 모자 뜨기에 유용해요.',
    difficulty: 'hard',
  },
  {
    id: '15',
    category: 'problem',
    title: '실이 엉켰을 때 해결법',
    content:
      '실이 엉켰을 때는 급하게 풀려고 하지 마세요. 엉킨 부분을 잘 관찰하고 천천히 하나씩 풀어나가면 됩니다. 바늘이나 핀을 이용해서 매듭을 느슨하게 만든 후 풀면 더 쉬워요.',
    difficulty: 'easy',
  },
];

// 카테고리별 필터링 함수들
export const getTipsByCategory = (
  category: KnittingTip['category'] | 'all',
) => {
  if (category === 'all') return knittingTipsData;
  return knittingTipsData.filter(tip => tip.category === category);
};

// 난이도별 필터링 함수
export const getTipsByDifficulty = (
  difficulty: KnittingTip['difficulty'] | 'all',
) => {
  if (difficulty === 'all') return knittingTipsData;
  return knittingTipsData.filter(tip => tip.difficulty === difficulty);
};

// 검색 함수
export const searchTips = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return knittingTipsData.filter(
    tip =>
      tip.title.toLowerCase().includes(lowercaseQuery) ||
      tip.content.toLowerCase().includes(lowercaseQuery),
  );
};

// 통계 정보 반환
export const getTipsStats = () => {
  const total = knittingTipsData.length;
  const byCategory = {
    beginner: getTipsByCategory('beginner').length,
    technique: getTipsByCategory('technique').length,
    problem: getTipsByCategory('problem').length,
    material: getTipsByCategory('material').length,
  };
  const byDifficulty = {
    easy: getTipsByDifficulty('easy').length,
    medium: getTipsByDifficulty('medium').length,
    hard: getTipsByDifficulty('hard').length,
  };

  return {total, byCategory, byDifficulty};
};
