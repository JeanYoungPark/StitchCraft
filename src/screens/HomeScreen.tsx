import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, BottomTabParamList } from '../navigation/AppNavigator';
import { databaseManager, Bookmark, Pattern } from '../database/DatabaseManager';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'HomeMain'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isQuickStartCompleted, setIsQuickStartCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookmarkedPatterns, setBookmarkedPatterns] = useState<Pattern[]>([]);

  // 스크롤을 맨 위로 이동하는 함수
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // 탭 이벤트 리스너 등록 - Home 탭 클릭 시 항상 스크롤을 맨 위로
  useEffect(() => {
    const unsubscribe = navigation.getParent()?.addListener('tabPress', (e) => {
      // Home 탭이 클릭되면 항상 스크롤을 맨 위로 이동
      if (e.target?.includes('Home')) {
        // 약간의 지연을 두어 네비게이션이 완료된 후 스크롤
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }
    });
    return unsubscribe;
  }, [navigation, scrollToTop]);

  // 화면이 포커스될 때마다 빠른 시작 상태 확인
  useFocusEffect(
    React.useCallback(() => {
      checkQuickStartStatus();
    }, [])
  );

  const checkQuickStartStatus = async () => {
    try {
      const completed = await databaseManager.isQuickStartCompleted();
      setIsQuickStartCompleted(completed);
      
      // 북마크된 패턴 불러오기
      await loadBookmarkedPatterns();
    } catch (error) {
      console.error('빠른 시작 상태 확인 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarkedPatterns = async () => {
    try {
      const bookmarks = await databaseManager.getBookmarks();
      const patternBookmarks = bookmarks.filter(bookmark => bookmark.itemType === 'pattern');
      
      // 북마크된 패턴의 상세 정보 가져오기
      const patterns: Pattern[] = [];
      for (const bookmark of patternBookmarks) {
        const pattern = await databaseManager.getPatternById(bookmark.itemId);
        if (pattern) {
          patterns.push(pattern);
        }
      }
      
      setBookmarkedPatterns(patterns);
    } catch (error) {
      console.error('북마크 패턴 로드 실패:', error);
    }
  };

  const handleQuickStart = async () => {
    try {
      // 빠른 시작 완료 상태로 저장
      await databaseManager.setQuickStartCompleted();
      setIsQuickStartCompleted(true);
      
      // 첫 뜨개질 화면으로 이동
      navigation.navigate('Tutorial', { 
        screen: 'FirstKnitting'
      });
    } catch (error) {
      console.error('빠른 시작 상태 저장 실패:', error);
      // 에러가 있어도 페이지는 이동
      navigation.navigate('Tutorial', { 
        screen: 'FirstKnitting'
      });
    }
  };

  const handleSeeAllPatterns = () => {
    navigation.navigate('Patterns', { 
      screen: 'PatternsList',
      params: { initialFilter: '초급' }
    });
  };

  const handleFeaturedPatternPress = async (patternId: string) => {
    try {
      const pattern = await databaseManager.getPatternById(patternId);
      if (pattern) {
        let materials: string[];
        let steps: string[];
        
        try {
          materials = typeof pattern.materials === 'string' 
            ? JSON.parse(pattern.materials) 
            : pattern.materials;
          steps = typeof pattern.steps === 'string' 
            ? JSON.parse(pattern.steps) 
            : pattern.steps;
        } catch (error) {
          console.error('패턴 데이터 파싱 오류:', error);
          return;
        }

        navigation.navigate('Patterns', {
          screen: 'PatternDetail',
          params: {
            patternId: pattern.patternId,
            title: pattern.title,
            difficulty: pattern.difficulty,
            duration: pattern.duration,
            videoUrl: pattern.videoUrl,
            materials,
            steps,
            description: pattern.description,
            hasImages: pattern.hasImages,
            hasPattern: pattern.hasPattern,
          }
        });
      }
    } catch (error) {
      console.error('패턴 로드 실패:', error);
    }
  };

  const handleBookmarkPatternPress = (pattern: Pattern) => {
    if (!pattern.materials || !pattern.steps) return;
    
    let materials: string[];
    let steps: string[];
    
    try {
      materials = typeof pattern.materials === 'string' 
        ? JSON.parse(pattern.materials) 
        : pattern.materials;
      steps = typeof pattern.steps === 'string' 
        ? JSON.parse(pattern.steps) 
        : pattern.steps;
    } catch (error) {
      console.error('패턴 데이터 파싱 오류:', error);
      return;
    }

    navigation.navigate('Patterns', {
      screen: 'PatternDetail',
      params: {
        patternId: pattern.patternId,
        title: pattern.title,
        difficulty: pattern.difficulty,
        duration: pattern.duration,
        videoUrl: pattern.videoUrl,
        materials,
        steps,
        description: pattern.description,
        hasImages: pattern.hasImages,
        hasPattern: pattern.hasPattern,
      }
    });
  };

  // AsyncStorage 기능 임시 비활성화
  // const checkFirstKnittingCompletion = async () => {
  //   try {
  //     const completionString = await AsyncStorage.getItem('firstKnittingCompleted');
  //     if (completionString) {
  //       const completion = JSON.parse(completionString);
  //       setIsFirstKnittingCompleted(completion.completed);
  //       setCompletionData(completion);
  //     }
  //   } catch (error) {
  //     console.error('완료 상태 체크 실패:', error);
  //   }
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     checkFirstKnittingCompletion();
  //   }, [])
  // );

  // // 개발/테스트용 리셋 함수
  // const resetCompletion = async () => {
  //   try {
  //     await AsyncStorage.removeItem('firstKnittingCompleted');
  //     setIsFirstKnittingCompleted(false);
  //     setCompletionData(null);
  //     console.log('완료 상태가 리셋되었습니다');
  //   } catch (error) {
  //     console.error('리셋 실패:', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>안녕하세요! 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            함께 뜨개질을 시작해보세요
          </Text>
        </View>

        {/* Quick Start Section - 한 번 클릭하면 사라짐 */}
        {!loading && !isQuickStartCompleted && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>빠른 시작</Text>
            <TouchableOpacity 
              style={styles.quickStartCard} 
              onPress={handleQuickStart}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="첫 번째 뜨개질 시작하기"
              accessibilityHint="3단계로 구성된 기본 뜨개질 가이드를 시작합니다"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardIconWrapper}>
                  <Text style={styles.cardEmoji}>🧶</Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.quickStartTitle}>첫 번째 뜨개질</Text>
                  <Text style={styles.quickStartSubtitle}>
                    3단계로 시작하는 기본 뜨기
                  </Text>
                </View>
                <View style={styles.arrowWrapper}>
                  <Text style={styles.arrowIcon}>›</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Patterns */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>초보자 추천 패턴</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={handleSeeAllPatterns}
              accessibilityRole="button"
              accessibilityLabel="초보자 패턴 전체보기"
            >
              <Text style={styles.seeAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.patternGrid}>
            <TouchableOpacity 
              style={styles.patternCard}
              activeOpacity={0.7}
              onPress={() => handleFeaturedPatternPress('scarf-basic')}
              accessibilityRole="button"
              accessibilityLabel="간단한 목도리 패턴"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>간단한 목도리</Text>
                  <Text style={styles.cardSubtitle}>
                    초급 • 약 3시간 소요
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.patternCard}
              activeOpacity={0.7}
              onPress={() => handleFeaturedPatternPress('dishcloth-basic')}
              accessibilityRole="button"
              accessibilityLabel="행주 뜨기 패턴"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>행주 뜨기</Text>
                  <Text style={styles.cardSubtitle}>
                    초급 • 약 1시간 소요
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bookmarked Patterns - 북마크가 있을 때만 표시 */}
        {bookmarkedPatterns.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>내 북마크</Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('Settings', { screen: 'Bookmarks' })}
                accessibilityRole="button"
                accessibilityLabel="북마크 전체보기"
              >
                <Text style={styles.seeAllText}>전체보기</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.patternGrid}>
              {bookmarkedPatterns.slice(0, 3).map((pattern) => (
                <TouchableOpacity 
                  key={pattern.patternId}
                  style={styles.patternCard}
                  activeOpacity={0.7}
                  onPress={() => handleBookmarkPatternPress(pattern)}
                  accessibilityRole="button"
                  accessibilityLabel={`${pattern.title} 패턴`}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardText}>
                      <Text style={styles.cardTitle}>{pattern.title}</Text>
                      <Text style={styles.cardSubtitle}>
                        {pattern.difficulty} • {pattern.duration}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Daily Tip */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>오늘의 뜨개질 팁</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconWrapper}>
                <Text style={styles.tipIcon}>💡</Text>
              </View>
              <Text style={styles.tipTitle}>초보자 꿀팁</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>
                뜨개질을 시작할 때는 털실의 두께와 바늘 굵기를 맞추는 것이 중요해요.
              </Text>
              <Text style={styles.tipSubtext}>
                패턴에 적힌 권장 바늘 굵기를 꼭 확인해보세요!
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3', // Cream background
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Extra bottom padding for tab bar
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#2D3748',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 25,
  },
  section: {
    marginBottom: 40,
  },
  lastSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    lineHeight: 28,
    marginBottom: 12,
  },
  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(107, 115, 255, 0.1)',
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2, // Fine-tune alignment with title
  },
  seeAllText: {
    fontSize: 15,
    color: '#6B73FF',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickStartCard: {
    backgroundColor: '#6B73FF',
    borderRadius: 16,
    padding: 20,
    minHeight: 88, // Ensure consistent touch target size
    elevation: 3,
    shadowColor: '#6B73FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  patternGrid: {
    gap: 12,
  },
  patternCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 0,
    minHeight: 88, // Consistent with quick start card
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F7FAFC',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardText: {
    flex: 1,
  },
  arrowWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 24,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#2D3748',
    opacity: 0.6,
    lineHeight: 22,
    fontWeight: '500',
  },
  quickStartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 25,
  },
  quickStartSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.8,
    lineHeight: 22,
    fontWeight: '500',
  },
  completedCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    minHeight: 88,
    elevation: 2,
    shadowColor: '#52C41A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#BBF7D0',
  },
  completedIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  completedEmoji: {
    fontSize: 24,
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 4,
    lineHeight: 24,
  },
  completedSubtitle: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 4,
  },
  completedDate: {
    fontSize: 12,
    color: '#16A34A',
    lineHeight: 16,
    opacity: 0.8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
  },
  retryButton: {
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  retryButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#6B7280',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resetButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#9CAF88',
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#9CAF88',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tipHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tipIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipContent: {
    gap: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 26,
    textAlign: 'center',
    fontWeight: '500',
  },
  tipSubtext: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default HomeScreen;