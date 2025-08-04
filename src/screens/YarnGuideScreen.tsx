import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const YarnGuideScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'material' | 'weight' | 'texture'>('material');

  const yarnMaterials = [
    {
      name: '면실 (Cotton)',
      description: '시원하고 통기성이 좋아 여름용 의류에 적합',
      features: ['세탁이 쉬움', '내구성이 좋음', '통기성 우수', '알레르기 반응 적음'],
      uses: '여름 티셔츠, 행주, 수세미, 가방',
      care: '찬물 또는 미지근한 물로 세탁, 건조기 사용 가능',
      pros: '관리 쉬움, 실용적',
      cons: '탄력성 부족, 보온성 낮음'
    },
    {
      name: '모직실 (Wool)',
      description: '따뜻하고 보온성이 뛰어나 겨울용 의류에 최적',
      features: ['보온성 우수', '천연 섬유', '탄력성 좋음', '습도 조절 기능'],
      uses: '스웨터, 목도리, 장갑, 모자',
      care: '찬물 손세탁, 드라이클리닝 권장',
      pros: '보온성, 자연스러운 느낌',
      cons: '관리 까다로움, 가격 비쌈'
    },
    {
      name: '아크릴실 (Acrylic)',
      description: '가성비가 좋고 관리가 쉬운 합성 섬유',
      features: ['가격 저렴', '색상 다양', '관리 쉬움', '가벼움'],
      uses: '연습용, 아동복, 장식품, 인형',
      care: '세탁기 사용 가능, 빠른 건조',
      pros: '경제적, 초보자 친화적',
      cons: '통기성 부족, 정전기 발생'
    },
    {
      name: '알파카 실 (Alpaca)',
      description: '부드럽고 고급스러운 천연 섬유',
      features: ['매우 부드러움', '보온성 우수', '가벼움', '광택감'],
      uses: '고급 스웨터, 목도리, 코트',
      care: '드라이클리닝 또는 찬물 손세탁',
      pros: '고급스러운 질감, 보온성',
      cons: '가격 비쌈, 관리 까다로움'
    }
  ];

  const yarnWeights = [
    {
      name: '레이스 웨이트 (Lace Weight)',
      thickness: '매우 얇음',
      needle: '2-3.5mm',
      uses: '레이스, 숄, 얇은 스카프',
      level: '고급자용'
    },
    {
      name: 'DK 웨이트 (Double Knitting)',
      thickness: '중간 굵기',
      needle: '4-5mm',
      uses: '아동복, 가벼운 스웨터',
      level: '초보자 추천'
    },
    {
      name: '벌키 웨이트 (Chunky)',
      thickness: '두꺼움',
      needle: '6-8mm',
      uses: '목도리, 담요, 겨울 스웨터',
      level: '초보자 추천'
    },
    {
      name: '슈퍼 벌키 (Super Chunky)',
      thickness: '매우 두꺼움',
      needle: '9-15mm',
      uses: '러그, 두꺼운 담요',
      level: '중급자용'
    }
  ];

  const yarnTextures = [
    {
      name: '부클 얀 (Bouclé)',
      description: '곱슬곱슬한 질감의 실',
      effect: '입체적이고 푹신한 질감',
      uses: '스웨터, 카디건'
    },
    {
      name: '메탈릭 얀 (Metallic)',
      description: '반짝이는 금속 재질이 포함된 실',
      effect: '화려하고 반짝이는 효과',
      uses: '파티용 의류, 액세서리'
    },
    {
      name: '퍼지 얀 (Fuzzy)',
      description: '털이 많이 일어나는 부드러운 실',
      effect: '따뜻하고 부드러운 질감',
      uses: '겨울 스웨터, 인형'
    },
    {
      name: '리본 얀 (Ribbon)',
      description: '납작한 리본 형태의 실',
      effect: '독특한 텍스처와 광택',
      uses: '가방, 모자, 장식품'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 돌아가기</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>실 종류 가이드</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'material' && styles.activeTab]}
          onPress={() => setSelectedCategory('material')}
        >
          <Text style={[styles.tabText, selectedCategory === 'material' && styles.activeTabText]}>
            재질별
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'weight' && styles.activeTab]}
          onPress={() => setSelectedCategory('weight')}
        >
          <Text style={[styles.tabText, selectedCategory === 'weight' && styles.activeTabText]}>
            굵기별
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'texture' && styles.activeTab]}
          onPress={() => setSelectedCategory('texture')}
        >
          <Text style={[styles.tabText, selectedCategory === 'texture' && styles.activeTabText]}>
            질감별
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'material' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>재질별 실 가이드</Text>
            <Text style={styles.sectionSubtitle}>
              각 재질의 특성을 이해하고 용도에 맞는 실을 선택해보세요
            </Text>
            
            {yarnMaterials.map((yarn, index) => (
              <View key={index} style={styles.yarnCard}>
                <Text style={styles.yarnName}>{yarn.name}</Text>
                <Text style={styles.yarnDescription}>{yarn.description}</Text>
                
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>주요 특징</Text>
                  {yarn.features.map((feature, idx) => (
                    <Text key={idx} style={styles.featureText}>• {feature}</Text>
                  ))}
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>주요 용도</Text>
                    <Text style={styles.detailValue}>{yarn.uses}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>관리 방법</Text>
                    <Text style={styles.detailValue}>{yarn.care}</Text>
                  </View>
                </View>

                <View style={styles.prosConsContainer}>
                  <View style={styles.prosContainer}>
                    <Text style={styles.prosTitle}>장점</Text>
                    <Text style={styles.prosText}>{yarn.pros}</Text>
                  </View>
                  <View style={styles.consContainer}>
                    <Text style={styles.consTitle}>단점</Text>
                    <Text style={styles.consText}>{yarn.cons}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedCategory === 'weight' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>굵기별 실 가이드</Text>
            <Text style={styles.sectionSubtitle}>
              실의 굵기에 따른 바늘 호수와 적합한 작품을 알아보세요
            </Text>
            
            {yarnWeights.map((weight, index) => (
              <View key={index} style={styles.weightCard}>
                <View style={styles.weightHeader}>
                  <Text style={styles.weightName}>{weight.name}</Text>
                  <Text style={styles.weightLevel}>{weight.level}</Text>
                </View>
                
                <Text style={styles.weightThickness}>굵기: {weight.thickness}</Text>
                
                <View style={styles.weightDetails}>
                  <View style={styles.weightDetailItem}>
                    <Text style={styles.weightLabel}>권장 바늘</Text>
                    <Text style={styles.weightValue}>{weight.needle}</Text>
                  </View>
                  <View style={styles.weightDetailItem}>
                    <Text style={styles.weightLabel}>적합한 작품</Text>
                    <Text style={styles.weightValue}>{weight.uses}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedCategory === 'texture' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>질감별 실 가이드</Text>
            <Text style={styles.sectionSubtitle}>
              특별한 질감의 실로 독특한 효과를 연출해보세요
            </Text>
            
            {yarnTextures.map((texture, index) => (
              <View key={index} style={styles.textureCard}>
                <Text style={styles.textureName}>{texture.name}</Text>
                <Text style={styles.textureDescription}>{texture.description}</Text>
                
                <View style={styles.textureDetails}>
                  <View style={styles.textureDetailItem}>
                    <Text style={styles.textureLabel}>효과</Text>
                    <Text style={styles.textureValue}>{texture.effect}</Text>
                  </View>
                  <View style={styles.textureDetailItem}>
                    <Text style={styles.textureLabel}>추천 용도</Text>
                    <Text style={styles.textureValue}>{texture.uses}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 실 선택 팁</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• 처음에는 중간 굵기의 면실이나 아크릴실을 추천해요</Text>
            <Text style={styles.tipText}>• 실 라벨에 적힌 권장 바늘 호수를 확인하세요</Text>
            <Text style={styles.tipText}>• 같은 브랜드, 같은 염료 번호로 구매하는 것이 좋아요</Text>
            <Text style={styles.tipText}>• 작품을 시작하기 전에 게이지 뜨기를 해보세요</Text>
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
  yarnCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  yarnName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 28,
  },
  yarnDescription: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 16,
    lineHeight: 24,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
    lineHeight: 20,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailItem: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  prosConsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  prosContainer: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 4,
  },
  prosText: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 16,
  },
  consContainer: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  consText: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 16,
  },
  weightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  weightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weightName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  weightLevel: {
    fontSize: 12,
    color: '#6B73FF',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '600',
  },
  weightThickness: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
  },
  weightDetails: {
    gap: 8,
  },
  weightDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  weightValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  textureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  textureDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
    lineHeight: 20,
  },
  textureDetails: {
    gap: 8,
  },
  textureDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textureLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  textureValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
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

export default YarnGuideScreen;