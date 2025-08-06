import { knittingTermsData } from './KnittingDictionaryData';
import { knittingTipsData } from './KnittingTipsData';

export interface DailyTipItem {
  id: string;
  type: 'dictionary' | 'tip';
  title: string;
  content: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'easy' | 'medium' | 'hard';
  tags?: string[];
  icon: string;
}

// 뜨개질 용어 사전 데이터를 DailyTipItem 형식으로 변환
const convertDictionaryTerms = (): DailyTipItem[] => {
  return knittingTermsData.map((term, index) => ({
    id: `dict_${term.id}`,
    type: 'dictionary' as const,
    title: `${term.korean} (${term.english})`,
    content: term.definition,
    category: term.category,
    difficulty: term.difficulty,
    tags: term.relatedTerms || [],
    icon: getCategoryIcon(term.category)
  }));
};

// 뜨개질 팁 데이터를 DailyTipItem 형식으로 변환
const convertTipsData = (): DailyTipItem[] => {
  return knittingTipsData.map((tip, index) => ({
    id: `tip_${tip.id}`,
    type: 'tip' as const,
    title: tip.title,
    content: tip.content,
    category: tip.category,
    difficulty: tip.difficulty,
    tags: [],
    icon: getCategoryIcon(tip.category)
  }));
};

// 카테고리별 아이콘 매핑
const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    basic: '🧶',
    stitch: '🪡',
    tool: '🛠️',
    technique: '⚖️',
    material: '🧵',
    beginner: '🎯',
    problem: '🔧'
  };
  return iconMap[category] || '💡';
};

// 변환된 데이터를 합친 배열
export const allDailyTips: DailyTipItem[] = [
  ...convertDictionaryTerms(),
  ...convertTipsData()
];

/**
 * 날짜 기반으로 고정된 랜덤 팁을 선택하는 함수
 * 같은 날짜에는 항상 같은 팁이 선택됩니다.
 */
export const getDailyTip = (): DailyTipItem => {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  
  // 날짜 문자열을 기반으로 시드 생성
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = ((seed << 5) - seed + dateString.charCodeAt(i)) & 0xffffffff;
  }
  
  // 시드를 기반으로 고정된 랜덤 인덱스 생성
  const randomIndex = Math.abs(seed) % allDailyTips.length;
  
  return allDailyTips[randomIndex];
};

/**
 * 특정 날짜의 팁을 가져오는 함수 (테스트용)
 */
export const getTipForDate = (date: Date): DailyTipItem => {
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = ((seed << 5) - seed + dateString.charCodeAt(i)) & 0xffffffff;
  }
  
  const randomIndex = Math.abs(seed) % allDailyTips.length;
  return allDailyTips[randomIndex];
};

/**
 * 타입별 팁 개수를 반환하는 함수
 */
export const getTipCounts = () => {
  const dictionaryCount = knittingTermsData.length;
  const tipsCount = knittingTipsData.length;
  const totalCount = allDailyTips.length;
  
  return {
    dictionary: dictionaryCount,
    tips: tipsCount,
    total: totalCount
  };
};