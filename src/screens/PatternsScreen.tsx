import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { databaseManager, Pattern } from '../database/DatabaseManager';

// Navigation types
import { PatternsStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type PatternsScreenRouteProp = RouteProp<PatternsStackParamList, 'PatternsList'>;
type PatternsScreenNavigationProp = StackNavigationProp<PatternsStackParamList, 'PatternsList'>;

const PatternsScreen: React.FC = () => {
  const route = useRoute<PatternsScreenRouteProp>();
  const navigation = useNavigation<PatternsScreenNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);
  const [bookmarkedPatterns, setBookmarkedPatterns] = useState<Set<string>>(new Set());
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);

  // 스크롤을 맨 위로 이동하는 함수
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // 탭 이벤트 리스너 등록 - Patterns 탭 클릭 시 항상 스크롤을 맨 위로
  useEffect(() => {
    const unsubscribe = navigation.getParent()?.addListener('tabPress', (e) => {
      // Patterns 탭이 클릭되면 항상 스크롤을 맨 위로 이동
      if (e.target?.includes('Patterns')) {
        // 약간의 지연을 두어 네비게이션이 완료된 후 스크롤
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }
    });
    return unsubscribe;
  }, [navigation, scrollToTop]);

  // 초기 데이터 로드
  useEffect(() => {
    if (route.params?.initialFilter) {
      setActiveFilter(route.params.initialFilter);
    }
    loadData();
  }, [route.params?.initialFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // 패턴과 북마크 데이터를 병렬로 로드
      const [patternsData, bookmarks] = await Promise.all([
        databaseManager.getPatterns(),
        databaseManager.getBookmarks()
      ]);

      setPatterns(patternsData);

      const patternBookmarks = new Set(
        bookmarks
          .filter(bookmark => bookmark.itemType === 'pattern')
          .map(bookmark => bookmark.itemId)
      );
      setBookmarkedPatterns(patternBookmarks);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      Alert.alert('오류', '패턴 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (patternId: string, title: string, description: string) => {
    try {
      const isBookmarked = bookmarkedPatterns.has(patternId);
      
      if (isBookmarked) {
        await databaseManager.removeBookmark('pattern', patternId);
        setBookmarkedPatterns(prev => {
          const newSet = new Set(prev);
          newSet.delete(patternId);
          return newSet;
        });
      } else {
        await databaseManager.addBookmark({
          itemType: 'pattern',
          itemId: patternId,
          itemTitle: title,
          itemDescription: description,
        });
        setBookmarkedPatterns(prev => new Set(prev).add(patternId));
      }
    } catch (error) {
      console.error('북마크 토글 실패:', error);
      Alert.alert('오류', '북마크 처리에 실패했습니다.');
    }
  };

  const difficultyFilters = ['전체', '초급', '중급', '고급'];

  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
  };

  const handlePatternPress = (pattern: Pattern) => {
    navigation.navigate('PatternDetail', {
      patternId: pattern.patternId,
      title: pattern.title,
      difficulty: pattern.difficulty,
      duration: pattern.duration,
      description: pattern.description,
      materials: JSON.parse(pattern.materials),
      steps: JSON.parse(pattern.steps),
      videoUrl: pattern.videoUrl,
      hasImages: pattern.hasImages,
      hasPattern: pattern.hasPattern,
    });
  };

  const filteredPatterns = patterns.filter(pattern => {
    if (activeFilter !== '전체' && pattern.difficulty !== activeFilter) {
      return false;
    }
    if (searchQuery && !pattern.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.content}>
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
              <Text style={styles.updateInfo}>
                새 패턴이 주기적으로 추가됩니다
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

        {/* Pattern List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeFilter === '전체' ? '모든 패턴' : `${activeFilter} 패턴`}
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>패턴을 불러오는 중...</Text>
            </View>
          ) : filteredPatterns.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>패턴이 없습니다</Text>
            </View>
          ) : (
            filteredPatterns.map((pattern) => {
              const getDifficultyStyle = () => {
                switch (pattern.difficulty) {
                  case '중급': return styles.intermediateBadge;
                  case '고급': return styles.advancedBadge;
                  default: return {};
                }
              };

              return (
                <TouchableOpacity 
                  key={pattern.patternId}
                  style={styles.patternCard}
                  onPress={() => handlePatternPress(pattern)}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.cardBadges}>
                      <Text style={[styles.difficultyBadge, getDifficultyStyle()]}>
                        {pattern.difficulty}
                      </Text>
                      <Text style={styles.timeBadge}>{pattern.duration}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.bookmarkButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleBookmark(pattern.patternId, pattern.title, pattern.description);
                      }}
                    >
                      <Text style={[styles.bookmarkIcon, bookmarkedPatterns.has(pattern.patternId) && styles.bookmarkedIcon]}>
                        ♥
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.cardText}>
                      <Text style={styles.cardTitle}>{pattern.title}</Text>
                      <Text style={styles.cardSubtitle}>
                        {pattern.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
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
  updateInfo: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardBadges: {
    flexDirection: 'row',
  },
  bookmarkButton: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 20,
    color: '#A0ADB8', // 기본 회색
  },
  bookmarkedIcon: {
    color: '#FF6B6B', // 북마크 시 빨간색
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
  // Loading and empty states
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  // Advanced difficulty badge style
  advancedBadge: {
    color: '#F56565',
    backgroundColor: '#FEF2F2',
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