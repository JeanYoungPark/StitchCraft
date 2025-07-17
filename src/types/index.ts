// 패턴 관련 타입들
export interface Pattern {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likesCount: number;
  gridData?: GridData;
}

export interface GridData {
  width: number;
  height: number;
  cells: Cell[][];
}

export interface Cell {
  x: number;
  y: number;
  color: string;
  stitchType: 'knit' | 'purl' | 'empty';
}

// 사용자 관련 타입들
export interface User {
  id: string;
  email: string;
  username: string;
  profileImageUrl?: string;
  createdAt: string;
  patterns: Pattern[];
  likedPatterns: string[];
}

// 실과 바늘 관련 타입들
export interface Yarn {
  id: string;
  name: string;
  brand: string;
  color: string;
  weight: YarnWeight;
  fiberType: string;
  imageUrl: string;
}

export type YarnWeight = 'lace' | 'sport' | 'dk' | 'worsted' | 'bulky' | 'super-bulky';

export interface Needle {
  id: string;
  type: 'straight' | 'circular' | 'dpn';
  size: string;
  material: 'bamboo' | 'metal' | 'plastic' | 'wood';
  brand: string;
  imageUrl: string;
}

// 네비게이션 관련 타입들
export type RootStackParamList = {
  Main: undefined;
  PatternDetail: { patternId: string };
  CreatePattern: undefined;
  EditPattern: { patternId: string };
};

export type TabParamList = {
  Home: undefined;
  Patterns: undefined;
  Profile: undefined;
};
