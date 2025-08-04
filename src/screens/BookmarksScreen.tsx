import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { databaseManager, Bookmark, Pattern } from '../database/DatabaseManager';

// Navigation types
type BookmarksScreenNavigationProp = StackNavigationProp<any>;

const BookmarksScreen: React.FC = () => {
  const navigation = useNavigation<BookmarksScreenNavigationProp>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      const bookmarksData = await databaseManager.getBookmarks();
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error('북마크 로드 실패:', error);
      Alert.alert('오류', '북마크를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (bookmark: Bookmark) => {
    Alert.alert(
      '북마크 제거',
      `"${bookmark.itemTitle}"을(를) 북마크에서 제거하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '제거',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseManager.removeBookmark(bookmark.itemType, bookmark.itemId);
              setBookmarks(prev => prev.filter(b => b.id !== bookmark.id));
              Alert.alert('완료', '북마크에서 제거되었습니다.');
            } catch (error) {
              console.error('북마크 제거 실패:', error);
              Alert.alert('오류', '북마크 제거에 실패했습니다.');
            }
          }
        }
      ]
    );
  };

  const handleBookmarkPress = async (bookmark: Bookmark) => {
    if (bookmark.itemType === 'pattern') {
      try {
        // SQLite에서 패턴 상세 정보 가져오기
        const pattern = await databaseManager.getPatternById(bookmark.itemId);
        
        if (pattern) {
          // Settings Stack 내에서 PatternDetail로 이동 (북마크에서 온 것을 표시)
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
            fromBookmarks: true, // 북마크에서 왔다는 표시
          });
        } else {
          Alert.alert('오류', '패턴을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('패턴 로드 실패:', error);
        Alert.alert('오류', '패턴 로드에 실패했습니다.');
      }
    } else {
      Alert.alert('준비 중', '해당 컨텐츠는 준비 중입니다.');
    }
  };

  const getDifficultyColor = (description: string) => {
    if (description.includes('초급')) return { bg: '#F0FDF4', text: '#52C41A' };
    if (description.includes('중급')) return { bg: '#FFFBF0', text: '#FAAD14' };
    if (description.includes('고급')) return { bg: '#FEF2F2', text: '#F56565' };
    return { bg: '#F0F9FF', text: '#0369A1' };
  };

  const getItemTypeIcon = (itemType: string) => {
    switch (itemType) {
      case 'pattern': return '🧶';
      case 'tutorial': return '📚';
      case 'guide': return '📋';
      default: return '⭐';
    }
  };

  const getItemTypeName = (itemType: string) => {
    switch (itemType) {
      case 'pattern': return '패턴';
      case 'tutorial': return '튜토리얼';
      case 'guide': return '가이드';
      default: return '항목';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← 돌아가기</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>북마크</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6B73FF" />
          <Text style={styles.loadingText}>북마크를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>북마크</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 북마크 통계 */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>저장된 북마크</Text>
          <Text style={styles.statsCount}>{bookmarks.length}개</Text>
        </View>

        {/* 북마크 목록 */}
        {bookmarks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyTitle}>북마크가 없습니다</Text>
            <Text style={styles.emptyDescription}>
              관심있는 패턴이나 튜토리얼을 북마크해보세요
            </Text>
          </View>
        ) : (
          <View style={styles.bookmarksList}>
            {bookmarks.map((bookmark) => {
              const difficultyColors = getDifficultyColor(bookmark.itemDescription || '');
              
              return (
                <TouchableOpacity
                  key={bookmark.id}
                  style={styles.bookmarkCard}
                  onPress={() => handleBookmarkPress(bookmark)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.itemTypeIcon}>
                        {getItemTypeIcon(bookmark.itemType)}
                      </Text>
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {bookmark.itemTitle}
                        </Text>
                        <Text style={styles.cardDescription} numberOfLines={2}>
                          {bookmark.itemDescription || '설명이 없습니다'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveBookmark(bookmark)}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.cardBadges}>
                      <View style={[styles.typeBadge, { backgroundColor: difficultyColors.bg }]}>
                        <Text style={[styles.typeBadgeText, { color: difficultyColors.text }]}>
                          {getItemTypeName(bookmark.itemType)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.createdAt}>
                      {bookmark.createdAt ? new Date(bookmark.createdAt).toLocaleDateString('ko-KR') : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* 하단 여백 */}
        <View style={styles.bottomPadding} />
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
  headerPlaceholder: {
    width: 80,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4A5568',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',      
    color: '#2D3748',
  },
  statsCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B73FF',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  bookmarksList: {
    gap: 12,
  },
  bookmarkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  itemTypeIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#DC2626',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBadges: {
    flexDirection: 'row',
  },
  typeBadge: {
    backgroundColor: '#F0F9FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0369A1',
  },
  createdAt: {
    fontSize: 12,
    color: '#A0ADB8',
  },
  bottomPadding: {
    height: 20,
  },
});

export default BookmarksScreen;