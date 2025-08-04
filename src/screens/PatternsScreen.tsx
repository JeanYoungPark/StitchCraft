import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

// Navigation types
import { PatternsStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type PatternsScreenRouteProp = RouteProp<PatternsStackParamList, 'PatternsList'>;
type PatternsScreenNavigationProp = StackNavigationProp<PatternsStackParamList, 'PatternsList'>;

const PatternsScreen: React.FC = () => {
  const route = useRoute<PatternsScreenRouteProp>();
  const navigation = useNavigation<PatternsScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);

  // 초기 필터 설정
  useEffect(() => {
    if (route.params?.initialFilter) {
      setActiveFilter(route.params.initialFilter);
    }
  }, [route.params?.initialFilter]);

  const difficultyFilters = ['전체', '초급', '중급', '고급'];

  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
  };

  const handlePatternPress = (patternData: {
    id: string;
    title: string;
    difficulty: string;
    duration: string;
    description: string;
    materials: string[];
    steps: string[];
    videoUrl?: string;
    hasImages?: boolean;
    hasPattern?: boolean;
  }) => {
    navigation.navigate('PatternDetail', {
      patternId: patternData.id,
      title: patternData.title,
      difficulty: patternData.difficulty,
      duration: patternData.duration,
      description: patternData.description,
      materials: patternData.materials,
      steps: patternData.steps,
      videoUrl: patternData.videoUrl,
      hasImages: patternData.hasImages,
      hasPattern: patternData.hasPattern,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.hamburgerButton}
              onPress={() => setShowCategoryMenu(true)}
            >
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.title}>패턴 라이브러리</Text>
              <Text style={styles.subtitle}>
                다양한 뜨개질 패턴을 찾아보세요
              </Text>
            </View>
            <View style={styles.headerPlaceholder} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="패턴을 검색해보세요..."
              placeholderTextColor="#A0ADB8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Difficulty Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>난이도</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {difficultyFilters.map((filter) => (
              <TouchableOpacity 
                key={filter}
                style={[
                  styles.filterTag, 
                  activeFilter === filter && styles.activeFilter
                ]}
                onPress={() => handleFilterPress(filter)}
              >
                <Text style={[
                  styles.filterText, 
                  activeFilter === filter && styles.activeFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인기 패턴</Text>
          
          <TouchableOpacity 
            style={styles.patternCard}
            onPress={() => handlePatternPress({
              id: 'scarf-basic',
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
              videoUrl: 'https://youtube.com/example-scarf',
              hasImages: true,
              hasPattern: false
            })}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardBadges}>
                <Text style={styles.difficultyBadge}>초급</Text>
                <Text style={styles.timeBadge}>3시간</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.patternEmoji}>🧣</Text>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>기본 목도리</Text>
                <Text style={styles.cardSubtitle}>
                  메리야스뜨기로 만드는 간단한 목도리
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.patternCard}
            onPress={() => handlePatternPress({
              id: 'dishcloth-basic',
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
              videoUrl: 'https://youtube.com/example-dishcloth',
              hasImages: true,
              hasPattern: true
            })}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardBadges}>
                <Text style={styles.difficultyBadge}>초급</Text>
                <Text style={styles.timeBadge}>1시간</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.patternEmoji}>🏠</Text>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>면행주</Text>
                <Text style={styles.cardSubtitle}>
                  초보자를 위한 사각형 행주 만들기
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.patternCard}
            onPress={() => handlePatternPress({
              id: 'gloves-basic',
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
              videoUrl: 'https://youtube.com/example-gloves',
              hasImages: true,
              hasPattern: true
            })}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardBadges}>
                <Text style={[styles.difficultyBadge, styles.intermediateBadge]}>중급</Text>
                <Text style={styles.timeBadge}>6시간</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.patternEmoji}>🧤</Text>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>기본 장갑</Text>
                <Text style={styles.cardSubtitle}>
                  손가락이 있는 기본 겨울 장갑
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>


      </ScrollView>

      {/* Category Menu Modal */}
      {showCategoryMenu && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground}
            onPress={() => setShowCategoryMenu(false)}
            activeOpacity={1}
          />
          <View style={styles.categoryModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>카테고리</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCategoryMenu(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.categoryScrollView}>
              <TouchableOpacity 
                style={styles.categoryMenuItem}
                onPress={() => setShowCategoryMenu(false)}
              >
                <View style={styles.categoryMenuContent}>
                  <Text style={styles.categoryEmoji}>🧣</Text>
                  <View style={styles.categoryMenuText}>
                    <Text style={styles.categoryMenuTitle}>목도리</Text>
                    <Text style={styles.categoryMenuCount}>32개 패턴</Text>
                  </View>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.categoryMenuItem}
                onPress={() => setShowCategoryMenu(false)}
              >
                <View style={styles.categoryMenuContent}>
                  <Text style={styles.categoryEmoji}>🧢</Text>
                  <View style={styles.categoryMenuText}>
                    <Text style={styles.categoryMenuTitle}>모자</Text>
                    <Text style={styles.categoryMenuCount}>18개 패턴</Text>
                  </View>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.categoryMenuItem}
                onPress={() => setShowCategoryMenu(false)}
              >
                <View style={styles.categoryMenuContent}>
                  <Text style={styles.categoryEmoji}>🧤</Text>
                  <View style={styles.categoryMenuText}>
                    <Text style={styles.categoryMenuTitle}>장갑</Text>
                    <Text style={styles.categoryMenuCount}>12개 패턴</Text>
                  </View>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.categoryMenuItem}
                onPress={() => setShowCategoryMenu(false)}
              >
                <View style={styles.categoryMenuContent}>
                  <Text style={styles.categoryEmoji}>👜</Text>
                  <View style={styles.categoryMenuText}>
                    <Text style={styles.categoryMenuTitle}>가방</Text>
                    <Text style={styles.categoryMenuCount}>8개 패턴</Text>
                  </View>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.categoryMenuItem}
                onPress={() => setShowCategoryMenu(false)}
              >
                <View style={styles.categoryMenuContent}>
                  <Text style={styles.categoryEmoji}>🧦</Text>
                  <View style={styles.categoryMenuText}>
                    <Text style={styles.categoryMenuTitle}>양말</Text>
                    <Text style={styles.categoryMenuCount}>15개 패턴</Text>
                  </View>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.categoryMenuItem}
                onPress={() => setShowCategoryMenu(false)}
              >
                <View style={styles.categoryMenuContent}>
                  <Text style={styles.categoryEmoji}>🏠</Text>
                  <View style={styles.categoryMenuText}>
                    <Text style={styles.categoryMenuTitle}>생활용품</Text>
                    <Text style={styles.categoryMenuCount}>25개 패턴</Text>
                  </View>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  hamburgerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  hamburgerLine: {
    width: 18,
    height: 2,
    backgroundColor: '#4A5568',
    marginVertical: 2,
    borderRadius: 1,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  headerPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
    paddingLeft: 4,
  },
  filterTag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  activeFilter: {
    backgroundColor: '#6B73FF',
  },
  filterText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    lineHeight: 20,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
    lineHeight: 28,
  },
  patternCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardBadges: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    fontSize: 12,
    color: '#52C41A',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: 'bold',
    marginRight: 8,
    lineHeight: 16,
  },
  intermediateBadge: {
    color: '#FAAD14',
    backgroundColor: '#FFFBF0',
  },
  timeBadge: {
    fontSize: 12,
    color: '#6B73FF',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patternEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 24,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    lineHeight: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '85%',
    maxHeight: '70%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#4A5568',
    fontWeight: 'bold',
  },
  categoryScrollView: {
    maxHeight: 400,
  },
  categoryMenuItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  categoryMenuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  categoryMenuText: {
    flex: 1,
  },
  categoryMenuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2,
    lineHeight: 22,
  },
  categoryMenuCount: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 18,
  },
  categoryArrow: {
    fontSize: 20,
    color: '#A0ADB8',
    fontWeight: 'bold',
  },
});

export default PatternsScreen;