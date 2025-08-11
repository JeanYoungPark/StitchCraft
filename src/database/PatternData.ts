// 패턴 데이터 분리 파일
// 추후 JSON 파일이나 원격 API로 변경 가능

import {YouTubeCreditInfo} from '../types/YouTubeCredit';

// 패턴용 YouTube 크레딧 샘플 데이터
const patternYouTubeCredits: Record<string, YouTubeCreditInfo> = {
  'scarf-basic-tutorial': {
    videoId: 'basic-scarf-tutorial',
    videoUrl: 'https://youtube.com/watch?v=basic-scarf-tutorial',
    title: '초보자를 위한 기본 목도리 만들기',
    channel: {
      name: '뜨개공방 StitchStudio',
      handle: '@stitchstudio_kr',
      url: 'https://www.youtube.com/@stitchstudio_kr',
      verified: true,
    },
    duration: '25:30',
    uploadDate: '2023-12-10',

    licenseType: 'permission',
    permissionDate: '2024-02-01',
    licenseNotes: '초보자 대상 튜토리얼 사용 허가를 받았습니다.',

    commercialUse: true,
    productLinks: [
      {
        type: 'kit',
        title: '목도리 만들기 키트',
        description: '필요한 모든 재료가 포함된 완전 키트',
        url: 'https://smartstore.naver.com/stitchstudio/products/scarf-kit',
        price: '35,000',
        currency: '원',
        affiliate: false,
      },
      {
        type: 'yarn',
        title: '부드러운 울 터실',
        description: '목도리에 적합한 고급 울 100%',
        url: 'https://smartstore.naver.com/stitchstudio/products/wool-yarn',
        price: '15,000',
        currency: '원',
        affiliate: false,
      },
    ],

    creditRequired: true,
    creditText:
      '뜨개공방 StitchStudio의 상세한 가이드 덤분에 부드러운 목도리를 만들 수 있었어요! 감사합니다! 🎉',
  },

  'dishcloth-tutorial': {
    videoId: 'crochet-dishcloth-guide',
    videoUrl: 'https://youtube.com/watch?v=crochet-dishcloth-guide',
    title: '실용적인 면행주 만들기 - 코바늘 튜토리얼',
    channel: {
      name: '손뜨개 마스터',
      handle: '@handknit_master',
      url: 'https://www.youtube.com/@handknit_master',
      verified: false,
    },
    duration: '12:15',
    uploadDate: '2023-11-20',

    licenseType: 'permission',
    permissionDate: '2024-01-30',
    licenseNotes: '개인 채널의 실용적인 콘텐츠 사용 허가를 받았습니다.',

    commercialUse: false,

    creditRequired: true,
    creditText: '손뜨개 마스터님의 실용적인 튜토리얼로 쉽게 따라할 수 있어요!',
  },

  'gloves-advanced': {
    videoId: 'knitting-gloves-complete',
    videoUrl: 'https://youtube.com/watch?v=knitting-gloves-complete',
    title: '완벽한 장갑 뜨기 - 전문가 기법',
    channel: {
      name: 'K-니팅 아카데미',
      handle: '@kknitting_academy',
      url: 'https://www.youtube.com/@kknitting_academy',
      verified: true,
    },
    duration: '45:20',
    uploadDate: '2023-10-05',

    licenseType: 'licensed',
    permissionDate: '2024-02-15',
    licenseNotes: '전문 기술 콘텐츠에 대한 정식 라이선스 계약을 체결했습니다.',

    commercialUse: true,
    productLinks: [
      {
        type: 'tools',
        title: '전문가용 4개바늘 세트',
        description: 'K-니팅 아카데미 전용 바늘',
        url: 'https://kknitting.co.kr/products/4-needles-set',
        price: '55,000',
        currency: '원',
        affiliate: true,
      },
      {
        type: 'pattern',
        title: '장갑 패턴 전문서',
        description: '다양한 사이즈와 디자인의 장갑 패턴',
        url: 'https://kknitting.co.kr/products/gloves-pattern-book',
        price: '18,000',
        currency: '원',
        affiliate: true,
      },
    ],

    creditRequired: true,
  },
};

export interface PatternDataInterface {
  patternId: string;
  title: string;
  difficulty: '초급' | '중급' | '고급';
  duration: string;
  description: string;
  materials: string[];
  steps: string[];
  emoji: string;
  youtubeCredit?: YouTubeCreditInfo;
  hasImages?: boolean;
  hasPattern?: boolean;
}

export const defaultPatterns: PatternDataInterface[] = [
  {
    patternId: 'pepe-frog-wallet',
    title:
      '킹받는💢 개구리 페페 지갑 만들기 Pepe the Frog Crochet Wallet Tutorial 🐸',
    difficulty: '고급',
    duration: '3-4시간',
    description: '',
    materials: [],
    steps: [],
    emoji: '',
    youtubeCredit: {
      videoId: 'W-Jn4U3a90E',
      videoUrl: 'https://www.youtube.com/watch?v=W-Jn4U3a90E&t=1s',
      title:
        '킹받는💢 개구리 페페 지갑 만들기 Pepe the Frog Crochet Wallet Tutorial 🐸',
      channel: {
        name: '코바늘 뜨개사 홀리',
        handle: '',
        url: '',
        verified: false,
      },
      duration: '53:34',
      uploadDate: '2023-04-06',

      licenseType: 'permission',
      permissionDate: '2025-08-11',
      licenseNotes:
        '홀리님으로부터 앱 내에서 원본 그대로 사용하는 조건으로 사용 허가를 받았습니다.',

      commercialUse: false,
      productLinks: [
        {
          type: 'book',
          title: '홀리의 신간 도서',
          description: '홀리님의 최신 뜨개질 도서',
          url: '',
          price: '',
          currency: '',
          affiliate: false,
        },
      ],
    },
    hasImages: true,
    hasPattern: false,
  },
];

// 카테고리별 패턴 분류
export const patternCategories = {
  winter: [],
  home: ['pepe-frog-wallet'], // 생활용품/가방류
  clothing: [],
  beginner: [],
  intermediate: [],
  advanced: ['pepe-frog-wallet'],
};

// 패턴 검색 및 필터링 헬퍼 함수들
export const getPatternsByDifficulty = (
  difficulty: '초급' | '중급' | '고급',
) => {
  return defaultPatterns.filter(pattern => pattern.difficulty === difficulty);
};

export const getPatternsByCategory = (
  category: keyof typeof patternCategories,
) => {
  const patternIds = patternCategories[category];
  return defaultPatterns.filter(pattern =>
    patternIds.includes(pattern.patternId),
  );
};

export const searchPatterns = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return defaultPatterns.filter(
    pattern =>
      pattern.title.toLowerCase().includes(lowerQuery) ||
      pattern.description.toLowerCase().includes(lowerQuery) ||
      pattern.materials.some(material =>
        material.toLowerCase().includes(lowerQuery),
      ),
  );
};
