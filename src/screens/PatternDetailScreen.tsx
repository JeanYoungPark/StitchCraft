import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { databaseManager } from '../database/DatabaseManager';

// Navigation types
type PatternDetailParams = {
  patternId: string;
  title: string;
  difficulty: string;
  duration: string;
  videoUrl?: string;
  materials: string[];
  steps: string[];
  description: string;
  hasImages?: boolean;
  hasPattern?: boolean;
  fromBookmarks?: boolean;
};

type PatternDetailRouteProp = RouteProp<{PatternDetail: PatternDetailParams}, 'PatternDetail'>;

const { width: screenWidth } = Dimensions.get('window');

const PatternDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PatternDetailRouteProp>();
  const [currentSection, setCurrentSection] = useState<'materials' | 'guide' | 'video'>('video');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    patternId,
    title,
    difficulty,
    duration,
    videoUrl,
    materials,
    steps,
    description,
    hasImages = false,
    hasPattern = false,
    fromBookmarks = false,
  } = route.params;

  useEffect(() => {
    checkBookmarkStatus();
  }, [patternId]);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarks = await databaseManager.getBookmarks();
      const isPatternBookmarked = bookmarks.some(
        bookmark => bookmark.itemType === 'pattern' && bookmark.itemId === patternId
      );
      setIsBookmarked(isPatternBookmarked);
    } catch (error) {
      console.error('북마크 상태 확인 실패:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await databaseManager.removeBookmark('pattern', patternId);
        setIsBookmarked(false);
        Alert.alert('완료', '북마크에서 제거되었습니다.');
      } else {
        await databaseManager.addBookmark({
          itemType: 'pattern',
          itemId: patternId,
          itemTitle: title,
          itemDescription: description,
        });
        setIsBookmarked(true);
        Alert.alert('완료', '북마크에 추가되었습니다.');
      }
    } catch (error) {
      console.error('북마크 토글 실패:', error);
      Alert.alert('오류', '북마크 처리에 실패했습니다.');
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case '초급': return { bg: '#F0FDF4', text: '#52C41A' };
      case '중급': return { bg: '#FFFBF0', text: '#FAAD14' };
      case '고급': return { bg: '#FEF2F2', text: '#F56565' };
      default: return { bg: '#F0FDF4', text: '#52C41A' };
    }
  };

  const difficultyColors = getDifficultyColor(difficulty);

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
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={toggleBookmark}
        >
          <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarkedIcon]}>
            ♥
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pattern Info */}
        <View style={styles.patternInfo}>
          <Text style={styles.patternTitle}>{title}</Text>
          <Text style={styles.patternDescription}>{description}</Text>
          
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: difficultyColors.bg }]}>
              <Text style={[styles.badgeText, { color: difficultyColors.text }]}>
                {difficulty}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⏱️ {duration}</Text>
            </View>
          </View>
        </View>

        {/* Section Tabs */}
        <View style={styles.sectionTabs}>
          <TouchableOpacity 
            style={[styles.tab, currentSection === 'video' && styles.activeTab]}
            onPress={() => setCurrentSection('video')}
          >
            <Text style={[styles.tabText, currentSection === 'video' && styles.activeTabText]}>
              영상 가이드
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, currentSection === 'materials' && styles.activeTab]}
            onPress={() => setCurrentSection('materials')}
          >
            <Text style={[styles.tabText, currentSection === 'materials' && styles.activeTabText]}>
              준비물
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, currentSection === 'guide' && styles.activeTab]}
            onPress={() => setCurrentSection('guide')}
          >
            <Text style={[styles.tabText, currentSection === 'guide' && styles.activeTabText]}>
              가이드
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Sections */}
        {currentSection === 'video' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>영상으로 배우기</Text>
            
            {videoUrl ? (
              <TouchableOpacity 
                style={styles.videoContainer}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="뜨개질 영상 재생"
              >
                <View style={styles.videoPlaceholder}>
                  <View style={styles.playButton}>
                    <Text style={styles.playButtonText}>▶️</Text>
                  </View>
                  <Text style={styles.videoTitle}>뜨개질 영상 가이드</Text>
                  <Text style={styles.videoSubtitle}>단계별 상세 설명</Text>
                  <View style={styles.playHint}>
                    <Text style={styles.playHintText}>탭하여 재생</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.noVideoContainer}>
                <Text style={styles.noVideoText}>📺</Text>
                <Text style={styles.noVideoTitle}>영상 준비 중</Text>
                <Text style={styles.noVideoSubtitle}>곧 업데이트 예정입니다</Text>
              </View>
            )}

            {/* Optional Images Section */}
            {hasImages && (
              <View style={styles.imagesSection}>
                <Text style={styles.subSectionTitle}>참고 이미지</Text>
                <View style={styles.imagesGrid}>
                  <TouchableOpacity style={styles.imagePlaceholder}>
                    <Text style={styles.imageIcon}>🖼️</Text>
                    <Text style={styles.imageText}>완성 작품</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imagePlaceholder}>
                    <Text style={styles.imageIcon}>🖼️</Text>
                    <Text style={styles.imageText}>중간 과정</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {currentSection === 'materials' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>필요한 준비물</Text>
            <View style={styles.materialsList}>
              {materials.map((material, index) => (
                <View key={index} style={styles.materialItem}>
                  <View style={styles.materialBullet}>
                    <Text style={styles.materialBulletText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.materialText}>{material}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>💡 구매 팁</Text>
              <Text style={styles.tipText}>
                처음 구매하시는 분은 뜨개질용품점에서 직접 만져보고 구매하시는 것을 추천해요!
              </Text>
            </View>
          </View>
        )}

        {currentSection === 'guide' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>단계별 가이드</Text>
            
            <View style={styles.stepsList}>
              {steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Optional Pattern Chart */}
            {hasPattern && (
              <View style={styles.patternSection}>
                <Text style={styles.subSectionTitle}>패턴 차트</Text>
                <TouchableOpacity style={styles.patternPlaceholder}>
                  <Text style={styles.patternIcon}>📈</Text>
                  <Text style={styles.patternText}>패턴 차트</Text>
                  <Text style={styles.patternSubtext}>탭하여 확대</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.encouragementBox}>
              <Text style={styles.encouragementText}>
                천천히 따라하시면 누구나 만들 수 있어요! 화이팅! 💪
              </Text>
            </View>
          </View>
        )}
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  bookmarkButton: {
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
  bookmarkIcon: {
    fontSize: 24,
    color: '#A0ADB8', // 기본 회색
  },
  bookmarkedIcon: {
    color: '#FF6B6B', // 북마크 시 빨간색
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  patternInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
  },
  patternTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 32,
  },
  patternDescription: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369A1',
  },
  sectionTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
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
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    lineHeight: 28,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
    lineHeight: 26,
  },
  videoContainer: {
    marginBottom: 20,
  },
  videoPlaceholder: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
    position: 'relative',
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#6B73FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  playButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 4,
    lineHeight: 24,
  },
  videoSubtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  playHint: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    backgroundColor: 'rgba(107, 115, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  playHintText: {
    fontSize: 12,
    color: '#6B73FF',
    fontWeight: '500',
  },
  noVideoContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    minHeight: 150,
    justifyContent: 'center',
  },
  noVideoText: {
    fontSize: 32,
    marginBottom: 12,
  },
  noVideoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 4,
  },
  noVideoSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  imagesSection: {
    marginTop: 20,
  },
  imagesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  imageIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    textAlign: 'center',
  },
  materialsList: {
    marginBottom: 20,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  materialBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B73FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  materialBulletText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  materialText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    flex: 1,
    fontWeight: '500',
  },
  tipBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#C2410C',
    lineHeight: 20,
  },
  stepsList: {
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6B73FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    fontWeight: '500',
  },
  patternSection: {
    marginTop: 20,
  },
  patternPlaceholder: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  patternIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  patternText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
    marginBottom: 4,
  },
  patternSubtext: {
    fontSize: 12,
    color: '#718096',
  },
  encouragementBox: {
    backgroundColor: '#9CAF88',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  encouragementText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default PatternDetailScreen;