# 홈 화면 UI 개선 디자인 스펙

## 1. 동적 헤더 컴포넌트 설계

### A. 시간 기반 인사말

```typescript
const DynamicHeader = () => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return {text: '좋은 아침이에요!', emoji: '☀️'};
    if (hour < 18) return {text: '오늘도 뜨개질해요!', emoji: '🌤️'};
    return {text: '편안한 저녁시간!', emoji: '🌙'};
  };

  const greeting = getTimeBasedGreeting();

  return (
    <View style={styles.dynamicHeader}>
      <Text style={styles.greetingEmoji}>{greeting.emoji}</Text>
      <Text style={styles.greetingText}>{greeting.text}</Text>
      <Text style={styles.greetingSubtext}>무엇을 만들어볼까요?</Text>
    </View>
  );
};
```

### B. 진행 상황 기반 헤더

```typescript
const ProgressHeader = ({isQuickStartCompleted, bookmarkCount}) => {
  if (!isQuickStartCompleted) {
    return (
      <View style={styles.progressHeader}>
        <Text style={styles.progressEmoji}>🎯</Text>
        <Text style={styles.progressTitle}>뜨개질 여정을 시작해보세요</Text>
        <Text style={styles.progressSubtext}>기본 과정부터 차근차근</Text>
      </View>
    );
  }

  return (
    <View style={styles.progressHeader}>
      <Text style={styles.progressEmoji}>⭐</Text>
      <Text style={styles.progressTitle}>훌륭해요!</Text>
      <Text style={styles.progressSubtext}>
        {bookmarkCount > 0
          ? `${bookmarkCount}개의 패턴을 저장했어요`
          : '새로운 패턴을 탐색해보세요'}
      </Text>
    </View>
  );
};
```

## 2. 컨텍스트 인식 카드 시스템

### A. 날씨/계절 기반 추천

```typescript
const SeasonalCard = () => {
  const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5)
      return {season: '봄', items: ['가벼운 가디건', '코튼 스카프']};
    if (month >= 6 && month <= 8)
      return {season: '여름', items: ['시원한 탑', '해변 가방']};
    if (month >= 9 && month <= 11)
      return {season: '가을', items: ['따뜻한 스웨터', '모자']};
    return {season: '겨울', items: ['두꺼운 목도리', '장갑']};
  };

  const {season, items} = getSeason();

  return (
    <View style={styles.seasonalCard}>
      <Text style={styles.seasonBadge}>{season} 추천</Text>
      <Text style={styles.seasonTitle}>{season}에 어울리는 뜨개</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.seasonItem}>
          • {item}
        </Text>
      ))}
    </View>
  );
};
```

### B. 학습 단계별 가이드

```typescript
const LearningPath = ({completedTutorials, bookmarkCount}) => {
  const getNextStep = () => {
    if (completedTutorials.length === 0) {
      return {
        step: '기초',
        title: '뜨개질 첫걸음',
        desc: '기본기부터 차근차근',
      };
    }
    if (bookmarkCount < 3) {
      return {
        step: '탐색',
        title: '패턴 찾아보기',
        desc: '마음에 드는 패턴을 저장해보세요',
      };
    }
    return {
      step: '실전',
      title: '작품 만들기',
      desc: '저장한 패턴으로 실제 작품을 만들어보세요',
    };
  };

  const nextStep = getNextStep();

  return (
    <View style={styles.learningPath}>
      <Text style={styles.pathBadge}>{nextStep.step} 단계</Text>
      <Text style={styles.pathTitle}>{nextStep.title}</Text>
      <Text style={styles.pathDesc}>{nextStep.desc}</Text>
    </View>
  );
};
```

## 3. 미니멀 통계 대시보드

```typescript
const StatsCards = ({stats}) => (
  <View style={styles.statsContainer}>
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{stats.completedProjects}</Text>
      <Text style={styles.statLabel}>완성 작품</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{stats.savedPatterns}</Text>
      <Text style={styles.statLabel}>저장한 패턴</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{stats.learningDays}</Text>
      <Text style={styles.statLabel}>학습 일수</Text>
    </View>
  </View>
);
```

## 4. 개선된 스타일링

```typescript
const enhancedStyles = StyleSheet.create({
  // 동적 헤더
  dynamicHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(135deg, #FDF6E3 0%, #F7F3E9 100%)',
  },
  greetingEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#718096',
    opacity: 0.8,
  },

  // 컨텍스트 카드
  seasonalCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },

  // 통계 카드
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B73FF',
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
});
```

## 5. 접근성 개선

```typescript
const AccessibilityEnhancements = {
  dynamicHeader: {
    accessibilityRole: 'header',
    accessibilityLabel: '홈 화면 헤더',
    accessibilityHint: '현재 시간과 추천 정보를 제공합니다',
  },
  seasonalCard: {
    accessibilityRole: 'button',
    accessibilityLabel: '계절별 추천 패턴',
    accessibilityHint: '현재 계절에 어울리는 뜨개질 패턴을 확인할 수 있습니다',
  },
};
```
