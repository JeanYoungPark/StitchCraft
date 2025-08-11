import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const NeedleGuideScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<
    'knitting' | 'crochet' | 'circular'
  >('knitting');

  const knittingNeedles = [
    {
      size: '2.0mm',
      us: 'US 0',
      uses: '양말, 장갑 등 세밀한 작업',
      difficulty: '고급자용',
    },
    {
      size: '3.0mm',
      us: 'US 2-3',
      uses: '아기용품, 얇은 스웨터',
      difficulty: '중급자용',
    },
    {
      size: '4.0mm',
      us: 'US 6',
      uses: 'DK 실용, 아동복',
      difficulty: '초보자 추천',
    },
    {
      size: '5.0mm',
      us: 'US 8',
      uses: '성인 스웨터, 카디건',
      difficulty: '초보자 추천',
    },
    {
      size: '6.0mm',
      us: 'US 10',
      uses: '목도리, 모자',
      difficulty: '초보자 추천',
    },
    {
      size: '8.0mm',
      us: 'US 11',
      uses: '두꺼운 스웨터, 담요',
      difficulty: '초보자용',
    },
  ];

  const crochetHooks = [
    {
      size: '2.0mm',
      us: 'US B/1',
      uses: '레이스, 섬세한 도일리',
      difficulty: '고급자용',
    },
    {
      size: '3.5mm',
      us: 'US E/4',
      uses: '아기용품, 얇은 의류',
      difficulty: '중급자용',
    },
    {
      size: '5.0mm',
      us: 'US H/8',
      uses: '행주, 가방, 모자',
      difficulty: '초보자 추천',
    },
    {
      size: '6.0mm',
      us: 'US J/10',
      uses: '스카프, 담요',
      difficulty: '초보자 추천',
    },
    {
      size: '8.0mm',
      us: 'US L/11',
      uses: '러그, 두꺼운 담요',
      difficulty: '초보자용',
    },
    {
      size: '10.0mm',
      us: 'US N/15',
      uses: '초두꺼운 작품',
      difficulty: '특수용도',
    },
  ];

  const circularNeedles = [
    {
      length: '40cm (16")',
      uses: '모자, 목 워머',
      tips: '작은 원형 작품에 최적',
    },
    {
      length: '60cm (24")',
      uses: '아동 스웨터',
      tips: '어린이 옷에 적합한 크기',
    },
    {
      length: '80cm (32")',
      uses: '성인 스웨터 몸통',
      tips: '가장 범용적인 길이',
    },
    {
      length: '100cm (40")',
      uses: '큰 스웨터, 카디건',
      tips: '여유로운 작업 공간',
    },
    {
      length: '120cm (47")',
      uses: '담요, 숄',
      tips: '대형 작품용',
    },
  ];

  const needleTypes = [
    {
      name: '일반 대바늘',
      description: '가장 기본적인 직선형 바늘',
      pros: ['배우기 쉬움', '가격 저렴', '다양한 크기'],
      cons: ['코가 떨어지기 쉬움', '긴 작품에 불편'],
      bestFor: '초보자, 평면 작품',
    },
    {
      name: '원형 바늘',
      description: '케이블로 연결된 두 개의 바늘',
      pros: ['코가 떨어지지 않음', '원형 뜨기 가능', '무거운 작품에 편함'],
      cons: ['초기 비용 높음', '케이블 꼬임'],
      bestFor: '스웨터, 모자, 대형 작품',
    },
    {
      name: '양면 바늘 (DPN)',
      description: '양쪽 끝이 모두 뾰족한 짧은 바늘',
      pros: ['작은 원형 작업', '정확한 작업', '휴대성'],
      cons: ['관리 복잡', '초보자에게 어려움'],
      bestFor: '양말, 장갑, 모자 꼭지',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← 돌아가기</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>바늘 종류 가이드</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'knitting' && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory('knitting')}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === 'knitting' && styles.activeTabText,
            ]}>
            대바늘
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'crochet' && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory('crochet')}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === 'crochet' && styles.activeTabText,
            ]}>
            코바늘
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'circular' && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory('circular')}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === 'circular' && styles.activeTabText,
            ]}>
            원형바늘
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'knitting' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>대바늘 호수 가이드</Text>
            <Text style={styles.sectionSubtitle}>
              직선형 바늘로 평면 뜨개질에 사용됩니다
            </Text>

            {/* Needle Types Overview */}
            <View style={styles.typesSection}>
              <Text style={styles.typesTitle}>대바늘 종류</Text>
              {needleTypes.map((type, index) => (
                <View key={index} style={styles.typeCard}>
                  <Text style={styles.typeName}>{type.name}</Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>

                  <View style={styles.prosConsRow}>
                    <View style={styles.prosSection}>
                      <Text style={styles.prosTitle}>장점</Text>
                      {type.pros.map((pro, idx) => (
                        <Text key={idx} style={styles.proText}>
                          • {pro}
                        </Text>
                      ))}
                    </View>

                    <View style={styles.consSection}>
                      <Text style={styles.consTitle}>단점</Text>
                      {type.cons.map((con, idx) => (
                        <Text key={idx} style={styles.conText}>
                          • {con}
                        </Text>
                      ))}
                    </View>
                  </View>

                  <View style={styles.bestForSection}>
                    <Text style={styles.bestForLabel}>추천 대상</Text>
                    <Text style={styles.bestForText}>{type.bestFor}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Size Guide */}
            <Text style={styles.sizesTitle}>바늘 호수별 가이드</Text>
            {knittingNeedles.map((needle, index) => (
              <View key={index} style={styles.needleCard}>
                <View style={styles.needleHeader}>
                  <Text style={styles.needleSize}>{needle.size}</Text>
                  <Text style={styles.needleUS}>{needle.us}</Text>
                  <Text style={styles.needleDifficulty}>
                    {needle.difficulty}
                  </Text>
                </View>
                <Text style={styles.needleUses}>추천 용도: {needle.uses}</Text>
              </View>
            ))}
          </View>
        )}

        {selectedCategory === 'crochet' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>코바늘 호수 가이드</Text>
            <Text style={styles.sectionSubtitle}>
              갈고리 모양의 바늘로 고리뜨기에 사용됩니다
            </Text>

            <View style={styles.crochetInfo}>
              <Text style={styles.infoTitle}>코바늘의 특징</Text>
              <View style={styles.infoList}>
                <Text style={styles.infoText}>
                  • 한 번에 하나의 고리만 작업
                </Text>
                <Text style={styles.infoText}>• 실수를 풀기 쉬움</Text>
                <Text style={styles.infoText}>• 빠른 작업 속도</Text>
                <Text style={styles.infoText}>• 입체적인 작품 제작 가능</Text>
              </View>
            </View>

            {crochetHooks.map((hook, index) => (
              <View key={index} style={styles.needleCard}>
                <View style={styles.needleHeader}>
                  <Text style={styles.needleSize}>{hook.size}</Text>
                  <Text style={styles.needleUS}>{hook.us}</Text>
                  <Text style={styles.needleDifficulty}>{hook.difficulty}</Text>
                </View>
                <Text style={styles.needleUses}>추천 용도: {hook.uses}</Text>
              </View>
            ))}
          </View>
        )}

        {selectedCategory === 'circular' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>원형 바늘 가이드</Text>
            <Text style={styles.sectionSubtitle}>
              케이블로 연결된 바늘로 원형 뜨개질에 사용됩니다
            </Text>

            <View style={styles.circularInfo}>
              <Text style={styles.infoTitle}>원형 바늘의 장점</Text>
              <View style={styles.infoList}>
                <Text style={styles.infoText}>
                  • 이음새 없는 원형 작품 제작
                </Text>
                <Text style={styles.infoText}>
                  • 무거운 작품도 편안하게 작업
                </Text>
                <Text style={styles.infoText}>• 코가 떨어질 걱정 없음</Text>
                <Text style={styles.infoText}>• Magic Loop 기법 사용 가능</Text>
              </View>
            </View>

            {circularNeedles.map((needle, index) => (
              <View key={index} style={styles.circularCard}>
                <Text style={styles.circularLength}>{needle.length}</Text>
                <Text style={styles.circularUses}>
                  주요 용도: {needle.uses}
                </Text>
                <Text style={styles.circularTips}>💡 {needle.tips}</Text>
              </View>
            ))}

            <View style={styles.magicLoopSection}>
              <Text style={styles.magicLoopTitle}>Magic Loop 기법</Text>
              <Text style={styles.magicLoopDescription}>
                긴 원형바늘(80cm 이상)을 사용해서 작은 원형 작품도 만들 수 있는
                기법입니다. 양말이나 모자 같은 작은 작품을 40cm 바늘 없이도 만들
                수 있어 매우 유용해요.
              </Text>
            </View>
          </View>
        )}

        {/* Bottom Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>🛒 바늘 구매 팁</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>
              • 처음에는 5-6mm 바늘부터 시작하세요
            </Text>
            <Text style={styles.tipText}>
              • 대나무, 금속, 플라스틱 소재별로 특징이 달라요
            </Text>
            <Text style={styles.tipText}>
              • 실 라벨의 권장 바늘 호수를 확인하세요
            </Text>
            <Text style={styles.tipText}>• 세트로 구매하면 경제적이에요</Text>
            <Text style={styles.tipText}>
              • 끝이 뾰족한 바늘이 작업하기 편해요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B73FF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  placeholder: {
    width: 80,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6B73FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#718096',
  },
  activeTabText: {
    color: '#6B73FF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 32,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 24,
    lineHeight: 24,
  },
  typesSection: {
    marginBottom: 32,
  },
  typesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  typeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  typeDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 16,
    lineHeight: 20,
  },
  prosConsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  prosSection: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 8,
  },
  proText: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 16,
    marginBottom: 2,
  },
  consSection: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  conText: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 16,
    marginBottom: 2,
  },
  bestForSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 12,
  },
  bestForLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0369A1',
    marginBottom: 4,
  },
  bestForText: {
    fontSize: 12,
    color: '#0C4A6E',
    lineHeight: 16,
  },
  sizesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  needleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  needleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  needleSize: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  needleUS: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  needleDifficulty: {
    fontSize: 12,
    color: '#6B73FF',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '600',
  },
  needleUses: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  crochetInfo: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  infoList: {
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20,
  },
  circularInfo: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  circularCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  circularLength: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  circularUses: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 6,
    lineHeight: 20,
  },
  circularTips: {
    fontSize: 12,
    color: '#6B73FF',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  magicLoopSection: {
    backgroundColor: '#FDF4FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  magicLoopTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 8,
  },
  magicLoopDescription: {
    fontSize: 14,
    color: '#6B21A8',
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#C2410C',
    lineHeight: 20,
  },
});

export default NeedleGuideScreen;
