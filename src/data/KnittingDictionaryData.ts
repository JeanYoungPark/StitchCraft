/**
 * 뜨개질 용어 사전 데이터
 * 관리하기 쉽도록 별도 파일로 분리
 */

export interface KnittingTerm {
  id: string;
  korean: string;
  english: string;
  pronunciation?: string;
  category: 'basic' | 'stitch' | 'tool' | 'technique' | 'material';
  definition: string;
  example?: string;
  relatedTerms?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const knittingTermsData: KnittingTerm[] = [
  // 기본 용어
  {
    id: '1',
    korean: '코',
    english: 'Stitch',
    pronunciation: 'stɪtʃ',
    category: 'basic',
    definition: '뜨개질의 기본 단위로, 실을 바늘에 걸어 만든 고리를 말합니다.',
    example: '20코를 만들어주세요',
    relatedTerms: ['뜨기', '바늘'],
    difficulty: 'beginner'
  },
  {
    id: '2',
    korean: '단',
    english: 'Row',
    pronunciation: 'roʊ',
    category: 'basic',
    definition: '가로로 한 줄을 뜬 것을 말합니다. 앞뜨기와 뒤뜨기가 한 세트입니다.',
    example: '10단을 뜨고 나서 색을 바꿔주세요',
    relatedTerms: ['코', '뜨기'],
    difficulty: 'beginner'
  },
  {
    id: '3',
    korean: '메리야스뜨기',
    english: 'Knit Stitch',
    pronunciation: 'nɪt stɪtʃ',
    category: 'stitch',
    definition: '가장 기본적인 뜨개질 기법으로, 부드럽고 평평한 면을 만듭니다.',
    example: '1단: 모든 코를 메리야스뜨기로 떠주세요',
    relatedTerms: ['안뜨기', '기본뜨기'],
    difficulty: 'beginner'
  },
  {
    id: '4',
    korean: '안뜨기',
    english: 'Purl Stitch',
    pronunciation: 'pɜːrl stɪtʃ',
    category: 'stitch',
    definition: '메리야스뜨기의 반대면으로, 울퉁불퉁한 질감을 만듭니다.',
    example: '2단: 모든 코를 안뜨기로 떠주세요',
    relatedTerms: ['메리야스뜨기', '기본뜨기'],
    difficulty: 'beginner'
  },
  {
    id: '5',
    korean: '대바늘',
    english: 'Knitting Needles',
    pronunciation: 'ˈnɪtɪŋ ˈniːdəlz',
    category: 'tool',
    definition: '직선형 바늘로 평면 뜨개질에 사용됩니다. 보통 2개를 한 세트로 사용합니다.',
    example: '5mm 대바늘을 준비해주세요',
    relatedTerms: ['코바늘', '원형바늘', '바늘'],
    difficulty: 'beginner'
  },
  {
    id: '6',
    korean: '코바늘',
    english: 'Crochet Hook',
    pronunciation: 'kroʊˈʃeɪ hʊk',
    category: 'tool',
    definition: '갈고리 모양의 바늘로 고리뜨기에 사용됩니다.',
    example: '6mm 코바늘로 사슬뜨기를 해주세요',
    relatedTerms: ['대바늘', '바늘', '고리뜨기'],
    difficulty: 'beginner'
  },
  {
    id: '7',
    korean: '게이지',
    english: 'Gauge',
    pronunciation: 'ɡeɪdʒ',
    category: 'technique',
    definition: '10cm x 10cm 정사각형 안에 들어가는 코와 단의 개수를 측정하는 것입니다.',
    example: '게이지: 20코 x 28단 = 10cm x 10cm',
    relatedTerms: ['텐션', '밀도'],
    difficulty: 'intermediate'
  },
  {
    id: '8',
    korean: '코 만들기',
    english: 'Cast On',
    pronunciation: 'kæst ɒn',
    category: 'technique',
    definition: '뜨개질을 시작할 때 바늘에 첫 번째 코들을 만드는 기법입니다.',
    example: '40코를 만들어 시작해주세요',
    relatedTerms: ['코 빼기', '시작'],
    difficulty: 'beginner'
  },
  {
    id: '9',
    korean: '코 빼기',
    english: 'Bind Off / Cast Off',
    pronunciation: 'baɪnd ɔːf',
    category: 'technique',
    definition: '뜨개질을 마무리할 때 코를 빼서 풀리지 않게 하는 기법입니다.',
    example: '마지막에 모든 코를 빼주세요',
    relatedTerms: ['코 만들기', '마무리'],
    difficulty: 'beginner'
  },
  {
    id: '10',
    korean: '면실',
    english: 'Cotton Yarn',
    pronunciation: 'ˈkɑːtən jɑːrn',
    category: 'material',
    definition: '면화에서 뽑은 천연섬유 실로, 시원하고 흡수성이 좋습니다.',
    example: '여름 티셔츠는 면실로 뜨는 게 좋아요',
    relatedTerms: ['모직실', '아크릴실', '실'],
    difficulty: 'beginner'
  },
  {
    id: '11',
    korean: '모직실',
    english: 'Wool Yarn',
    pronunciation: 'wʊl jɑːrn',
    category: 'material',
    definition: '양털에서 뽑은 천연섬유 실로, 따뜻하고 보온성이 뛰어납니다.',
    example: '겨울 스웨터는 모직실이 최고예요',
    relatedTerms: ['면실', '알파카실', '실'],
    difficulty: 'beginner'
  },
  {
    id: '12',
    korean: '고무뜨기',
    english: 'Ribbing',
    pronunciation: 'ˈrɪbɪŋ',
    category: 'stitch',
    definition: '메리야스뜨기와 안뜨기를 교대로 하여 탄력있는 조직을 만드는 기법입니다.',
    example: '1코 메리야스, 1코 안뜨기를 반복해주세요',
    relatedTerms: ['메리야스뜨기', '안뜨기', '탄력'],
    difficulty: 'intermediate'
  },
  {
    id: '13',
    korean: '사슬뜨기',
    english: 'Chain Stitch',
    pronunciation: 'tʃeɪn stɪtʃ',
    category: 'stitch',
    definition: '코바늘 뜨개질의 기본으로, 연결된 고리를 만드는 기법입니다.',
    example: '30 사슬을 떠서 시작해주세요',
    relatedTerms: ['코바늘', '고리뜨기', '시작'],
    difficulty: 'beginner'
  },
  {
    id: '14',
    korean: '텐션',
    english: 'Tension',
    pronunciation: 'ˈtenʃən',
    category: 'technique',
    definition: '실을 당기는 힘의 세기로, 뜨개질의 균일성을 결정합니다.',
    example: '텐션을 일정하게 유지하는 게 중요해요',
    relatedTerms: ['게이지', '균일성'],
    difficulty: 'intermediate'
  },
  {
    id: '15',
    korean: '증코',
    english: 'Increase',
    pronunciation: 'ˈɪnkriːs',
    category: 'technique',
    definition: '코의 개수를 늘리는 기법으로 작품의 폭을 넓힐 때 사용합니다.',
    example: '소매 부분에서 증코해주세요',
    relatedTerms: ['감코', '코 늘리기'],
    difficulty: 'intermediate'
  },
  {
    id: '16',
    korean: '감코',
    english: 'Decrease',
    pronunciation: 'dɪˈkriːs',
    category: 'technique',
    definition: '코의 개수를 줄이는 기법으로 작품의 폭을 좁힐 때 사용합니다.',
    example: '목선 부분에서 감코해주세요',
    relatedTerms: ['증코', '코 줄이기'],
    difficulty: 'intermediate'
  },
  // 추가 용어들 - 나중에 더 쉽게 추가할 수 있도록
  {
    id: '17',
    korean: '원형바늘',
    english: 'Circular Needles',
    pronunciation: 'ˈsɜːrkjələr ˈniːdəlz',
    category: 'tool',
    definition: '케이블로 연결된 바늘로 원형 뜨개질이나 큰 작품에 사용됩니다.',
    example: '모자는 원형바늘로 뜨면 편해요',
    relatedTerms: ['대바늘', '바늘'],
    difficulty: 'intermediate'
  },
  {
    id: '18',
    korean: '아크릴실',
    english: 'Acrylic Yarn',
    pronunciation: 'əˈkrɪlɪk jɑːrn',
    category: 'material',
    definition: '합성섬유 실로 가격이 저렴하고 세탁이 쉬워 초보자에게 인기입니다.',
    example: '연습용으로는 아크릴실이 좋아요',
    relatedTerms: ['면실', '모직실', '실'],
    difficulty: 'beginner'
  },
  {
    id: '19',
    korean: '표시마커',
    english: 'Stitch Marker',
    pronunciation: 'stɪtʃ ˈmɑːrkər',
    category: 'tool',
    definition: '특정 위치를 표시하는 도구로 패턴의 반복 구간을 표시할 때 사용합니다.',
    example: '증코 위치에 마커를 놓아주세요',
    relatedTerms: ['바늘', '도구'],
    difficulty: 'intermediate'
  },
  {
    id: '20',
    korean: '케이블뜨기',
    english: 'Cable Knitting',
    pronunciation: 'ˈkeɪbəl ˈnɪtɪŋ',
    category: 'technique',
    definition: '코를 서로 교차시켜 꼬인 모양을 만드는 고급 뜨개 기법입니다.',
    example: '스웨터 앞면에 케이블 패턴을 넣었어요',
    relatedTerms: ['패턴', '고급기법'],
    difficulty: 'advanced'
  }
];

// 카테고리별 필터링 함수들
export const getTermsByCategory = (category: KnittingTerm['category'] | 'all') => {
  if (category === 'all') return knittingTermsData;
  return knittingTermsData.filter(term => term.category === category);
};

// 난이도별 필터링 함수
export const getTermsByDifficulty = (difficulty: KnittingTerm['difficulty'] | 'all') => {
  if (difficulty === 'all') return knittingTermsData;
  return knittingTermsData.filter(term => term.difficulty === difficulty);
};

// 검색 함수
export const searchTerms = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return knittingTermsData.filter(term => 
    term.korean.toLowerCase().includes(lowercaseQuery) ||
    term.english.toLowerCase().includes(lowercaseQuery) ||
    term.definition.toLowerCase().includes(lowercaseQuery)
  );
};

// 통계 정보 반환
export const getTermsStats = () => {
  const total = knittingTermsData.length;
  const byCategory = {
    basic: getTermsByCategory('basic').length,
    stitch: getTermsByCategory('stitch').length,
    tool: getTermsByCategory('tool').length,
    technique: getTermsByCategory('technique').length,
    material: getTermsByCategory('material').length,
  };
  const byDifficulty = {
    beginner: getTermsByDifficulty('beginner').length,
    intermediate: getTermsByDifficulty('intermediate').length,
    advanced: getTermsByDifficulty('advanced').length,
  };

  return { total, byCategory, byDifficulty };
};