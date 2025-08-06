/**
 * DailyTipsData 모듈 테스트
 * 날짜 기반 랜덤 선택 로직 검증
 */

import { getDailyTip, getTipForDate, getTipCounts, allDailyTips } from './DailyTipsData';

// 테스트 함수들
export const runDailyTipsTests = () => {
  console.log('=== DailyTipsData 테스트 시작 ===');
  
  try {
    // 1. 데이터 개수 테스트
    const counts = getTipCounts();
    console.log('✅ 데이터 개수:', counts);
    console.log(`   - 용어사전: ${counts.dictionary}개`);
    console.log(`   - 실용팁: ${counts.tips}개`);
    console.log(`   - 전체: ${counts.total}개`);
    
    // 2. 오늘의 팁 가져오기 테스트
    const todayTip = getDailyTip();
    console.log('✅ 오늘의 팁:', {
      id: todayTip.id,
      type: todayTip.type,
      title: todayTip.title,
      difficulty: todayTip.difficulty,
      icon: todayTip.icon
    });
    
    // 3. 특정 날짜들에 대한 일관성 테스트
    console.log('✅ 날짜 일관성 테스트:');
    const testDates = [
      new Date('2024-01-01'),
      new Date('2024-06-15'),
      new Date('2024-12-25'),
      new Date('2025-03-14'),
      new Date('2025-08-06') // 오늘
    ];
    
    testDates.forEach(date => {
      const tip1 = getTipForDate(date);
      const tip2 = getTipForDate(date); // 같은 날짜로 다시 호출
      
      console.log(`   ${date.toDateString()}: ${tip1.title} (${tip1.type})`);
      
      // 같은 날짜에는 같은 팁이 나와야 함
      if (tip1.id !== tip2.id) {
        console.error(`❌ 날짜 일관성 실패: ${date.toDateString()}`);
        return false;
      }
    });
    
    // 4. 서로 다른 날짜는 다른 팁을 반환할 가능성이 높음 (100% 보장은 아님)
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-02');
    const tip1 = getTipForDate(date1);
    const tip2 = getTipForDate(date2);
    
    if (tip1.id !== tip2.id) {
      console.log('✅ 연속된 날짜 다름 확인: 다른 팁 반환됨');
    } else {
      console.log('⚠️  연속된 날짜 같음: 같은 팁 반환됨 (우연일 수 있음)');
    }
    
    // 5. 데이터 무결성 검증
    console.log('✅ 데이터 무결성 검증:');
    let validData = true;
    
    allDailyTips.forEach(tip => {
      if (!tip.id || !tip.title || !tip.content || !tip.type || !tip.icon) {
        console.error(`❌ 필수 필드 누락: ${tip.id}`);
        validData = false;
      }
      
      if (tip.type !== 'dictionary' && tip.type !== 'tip') {
        console.error(`❌ 잘못된 타입: ${tip.id} - ${tip.type}`);
        validData = false;
      }
    });
    
    if (validData) {
      console.log('   모든 데이터 유효성 검증 통과');
    }
    
    console.log('=== DailyTipsData 테스트 완료 ===');
    return true;
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error);
    return false;
  }
};

// 내일의 팁 미리보기 함수 (개발용)
export const previewTomorrowTip = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTip = getTipForDate(tomorrow);
  
  console.log('📅 내일의 팁 미리보기:', {
    date: tomorrow.toDateString(),
    title: tomorrowTip.title,
    type: tomorrowTip.type,
    icon: tomorrowTip.icon
  });
  
  return tomorrowTip;
};

// 주간 팁 미리보기 함수 (개발용)
export const previewWeekTips = () => {
  console.log('📅 이번 주 팁 미리보기:');
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const tip = getTipForDate(date);
    
    const dayName = i === 0 ? '오늘' : i === 1 ? '내일' : `${i}일 후`;
    console.log(`   ${dayName} (${date.toDateString()}): ${tip.title} [${tip.type}]`);
  }
};