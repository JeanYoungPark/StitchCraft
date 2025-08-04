// 패턴 데이터 분리 파일
// 추후 JSON 파일이나 원격 API로 변경 가능

export interface PatternDataInterface {
  patternId: string;
  title: string;
  difficulty: '초급' | '중급' | '고급';
  duration: string;
  description: string;
  materials: string[];
  steps: string[];
  emoji: string;
  videoUrl?: string;
  hasImages?: boolean;
  hasPattern?: boolean;
}

export const defaultPatterns: PatternDataInterface[] = [
  {
    patternId: 'scarf-basic',
    title: '기본 목도리',
    difficulty: '초급',
    duration: '3시간',
    description: '메리야스뜨기로 만드는 간단한 목도리입니다. 초보자도 쉽게 따라할 수 있어요.',
    materials: [
      '중간 굵기 털실 3볼 (약 300g)',
      '대바늘 8mm 2개',
      '가위',
      '털실 바늘 (마무리용)'
    ],
    steps: [
      '대바늘에 40코를 만들어주세요',
      '1단: 모든 코를 메리야스뜨기로 떠주세요',
      '2단: 모든 코를 안뜨기로 떠주세요',
      '1-2단을 반복하여 원하는 길이까지 떠주세요 (약 150cm)',
      '마지막에 코를 모두 빼고 실 끝을 정리해주세요'
    ],
    emoji: '🧣',
    videoUrl: 'https://youtube.com/example-scarf',
    hasImages: true,
    hasPattern: false
  },
  {
    patternId: 'dishcloth-basic',
    title: '면행주',
    difficulty: '초급',
    duration: '1시간',
    description: '초보자를 위한 사각형 행주 만들기입니다. 실용적이고 만들기 쉬워요.',
    materials: [
      '면실 1볼 (약 50g)',
      '코바늘 5mm 1개',
      '가위'
    ],
    steps: [
      '슬립노트를 만들고 사슬 30코를 떠주세요',
      '1단: 두 번째 사슬부터 한길긴뜨기를 29개 떠주세요',
      '2단: 사슬 1코, 돌려서 한길긴뜨기 29개',
      '2단을 반복하여 정사각형이 될 때까지 떠주세요',
      '실 끝을 정리하고 완성해주세요'
    ],
    emoji: '🏠',
    videoUrl: 'https://youtube.com/example-dishcloth',
    hasImages: true,
    hasPattern: true
  },
  {
    patternId: 'gloves-basic',
    title: '기본 장갑',
    difficulty: '중급',
    duration: '6시간',
    description: '손가락이 있는 기본 겨울 장갑입니다. 약간의 경험이 필요해요.',
    materials: [
      '모직실 2볼 (약 100g)',
      '대바늘 6mm 4개 (또는 원형바늘)',
      '털실 바늘',
      '가위',
      '코마커 4개'
    ],
    steps: [
      '손목 부분: 40코를 4개 바늘로 나누어 고무뜨기',
      '손등과 손바닥 부분을 메리야스뜨기로 진행',
      '엄지 부분: 8코를 따로 빼고 나머지 진행',
      '각 손가락별로 코를 나누어 뜨기',
      '엄지와 각 손가락을 완성하여 마무리'
    ],
    emoji: '🧤',
    videoUrl: 'https://youtube.com/example-gloves',
    hasImages: true,
    hasPattern: true
  },
  // 추가 패턴들을 여기에 계속 추가할 수 있음
  {
    patternId: 'hat-beanie',
    title: '기본 비니',
    difficulty: '중급',
    duration: '4시간',
    description: '따뜻한 겨울 비니모자입니다. 원형뜨기를 연습할 수 있어요.',
    materials: [
      '모직실 2볼 (약 150g)',
      '원형바늘 6mm 1개',
      '4개바늘 6mm (마무리용)',
      '코마커 1개',
      '털실 바늘'
    ],
    steps: [
      '원형바늘에 96코를 만들어 원형으로 이어주세요',
      '고무뜨기 2/2로 5cm 정도 떠주세요',
      '메리야스뜨기로 15cm 정도 떠주세요',
      '줄임코를 시작하여 정수리 부분을 완성해주세요',
      '실 끝을 정리하고 완성해주세요'
    ],
    emoji: '🧢',
    videoUrl: 'https://youtube.com/example-beanie',
    hasImages: true,
    hasPattern: true
  },
  {
    patternId: 'socks-basic',
    title: '기본 양말',
    difficulty: '고급',
    duration: '8시간',
    description: '발가락부터 뒤꿈치까지 완성하는 양말입니다. 고급 기술이 필요해요.',
    materials: [
      '양말실 1볼 (약 100g)',
      '4개바늘 3.5mm 1세트',
      '코마커 2개',
      '털실 바늘',
      '가위'
    ],
    steps: [
      '발가락 부분부터 시작하여 8코 만들기',
      '발등과 발바닥 부분을 늘려가며 뜨기',
      '발목 부분까지 직선으로 뜨기',
      '뒤꿈치 부분 줄임코와 늘림코로 성형',
      '다리 부분을 고무뜨기로 마무리'
    ],
    emoji: '🧦',
    videoUrl: 'https://youtube.com/example-socks',
    hasImages: true,
    hasPattern: true
  }
];

// 카테고리별 패턴 분류 (추후 확장 가능)
export const patternCategories = {
  winter: ['scarf-basic', 'gloves-basic', 'hat-beanie'],
  home: ['dishcloth-basic'],
  clothing: ['socks-basic'],
  beginner: ['scarf-basic', 'dishcloth-basic'],
  intermediate: ['gloves-basic', 'hat-beanie'],
  advanced: ['socks-basic']
};

// 패턴 검색 및 필터링 헬퍼 함수들
export const getPatternsByDifficulty = (difficulty: '초급' | '중급' | '고급') => {
  return defaultPatterns.filter(pattern => pattern.difficulty === difficulty);
};

export const getPatternsByCategory = (category: keyof typeof patternCategories) => {
  const patternIds = patternCategories[category];
  return defaultPatterns.filter(pattern => patternIds.includes(pattern.patternId));
};

export const searchPatterns = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return defaultPatterns.filter(pattern => 
    pattern.title.toLowerCase().includes(lowerQuery) ||
    pattern.description.toLowerCase().includes(lowerQuery) ||
    pattern.materials.some(material => material.toLowerCase().includes(lowerQuery))
  );
};