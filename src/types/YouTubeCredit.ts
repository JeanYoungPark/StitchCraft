// YouTube 저작권 및 크레딧 정보를 위한 타입 정의

export interface YouTubeChannel {
  name: string; // 채널명
  handle?: string; // @핸들명
  url: string; // 채널 URL
  verified?: boolean; // 인증 채널 여부
}

export interface ProductLink {
  type: 'kit' | 'yarn' | 'tools' | 'pattern' | 'book';
  title: string; // 상품명
  description?: string; // 상품 설명
  url: string; // 구매 링크
  price?: string; // 가격 정보
  currency?: string; // 통화 (KRW, USD 등)
  affiliate?: boolean; // 제휴 링크 여부
}

export interface YouTubeCreditInfo {
  videoId: string; // YouTube 비디오 ID
  videoUrl: string; // 전체 YouTube URL
  title: string; // 비디오 제목
  channel: YouTubeChannel; // 채널 정보
  duration?: string; // 영상 길이
  uploadDate?: string; // 업로드 날짜

  // 저작권 및 사용 허가 정보
  licenseType: 'permission' | 'creative_commons' | 'fair_use' | 'licensed';
  permissionDate?: string; // 허가 받은 날짜
  licenseNotes?: string; // 라이선스 관련 메모

  // 상업적 사용 관련
  commercialUse: boolean; // 상업적 사용 허가 여부
  productLinks?: ProductLink[]; // 관련 상품 링크들

  // 크레딧 표시 설정
  creditRequired: boolean; // 크레딧 표시 필수 여부
  creditText?: string; // 커스텀 크레딧 텍스트
}

// 기존 패턴 데이터에 YouTube 크레딧 정보 추가
export interface PatternWithCredit {
  patternId: string;
  title: string;
  difficulty: '초급' | '중급' | '고급';
  duration: string;
  description: string;
  materials: string[];
  steps: string[];
  emoji: string;

  // YouTube 정보는 이제 크레딧 정보로 확장
  youtubeCredit?: YouTubeCreditInfo;

  hasImages?: boolean;
  hasPattern?: boolean;
}

// 기법별 YouTube 크레딧 정보
export interface TechniqueWithCredit {
  name: string;
  description: string;
  difficulty: '초급' | '중급' | '고급';
  steps: string[];
  tips: string;

  // YouTube 크레딧 정보
  youtubeCredit?: YouTubeCreditInfo;
}
