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
import { knittingTipsData, KnittingTip } from '../data/KnittingTipsData';
import AdBanner from '../components/AdBanner';

const KnittingTipsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'technique' | 'problem' | 'material'>('all');
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());


  const categories = [
    { key: 'all' as const, label: '전체' },
    { key: 'beginner' as const, label: '초보자' },
    { key: 'technique' as const, label: '기법' },
    { key: 'problem' as const, label: '문제해결' },
    { key: 'material' as const, label: '재료/도구' },
  ];

  const filteredTips = knittingTipsData.filter(tip => 
    selectedCategory === 'all' || tip.category === selectedCategory
  );

  const toggleExpanded = (tipId: string) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(tipId)) {
      newExpanded.delete(tipId);
    } else {
      newExpanded.add(tipId);
    }
    setExpandedTips(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return { bg: '#F0FDF4', text: '#15803D', label: '쉬움' };
      case 'medium': return { bg: '#FFFBF0', text: '#D97706', label: '보통' };
      case 'hard': return { bg: '#FEF2F2', text: '#DC2626', label: '어려움' };
      default: return { bg: '#F0FDF4', text: '#15803D', label: '쉬움' };
    }
  };

  const renderTip = (tip: KnittingTip) => {
    const isExpanded = expandedTips.has(tip.id);
    const difficultyInfo = getDifficultyColor(tip.difficulty);

    return (
      <TouchableOpacity
        key={tip.id}
        style={styles.tipCard}
        onPress={() => toggleExpanded(tip.id)}
        activeOpacity={0.7}
      >
        <View style={styles.tipHeader}>
          <View style={styles.tipTitleRow}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyInfo.bg }]}>
              <Text style={[styles.difficultyText, { color: difficultyInfo.text }]}>
                {difficultyInfo.label}
              </Text>
            </View>
          </View>
        </View>

        <Text 
          style={styles.tipContent} 
          numberOfLines={isExpanded ? undefined : 2}
        >
          {tip.content}
        </Text>


        <View style={styles.expandIndicator}>
          <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerTitle}>뜨개질 팁 모음</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryScrollView}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryTab,
                selectedCategory === category.key && styles.activeCategoryTab
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category.key && styles.activeCategoryText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tips List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' && '모든 팁'}
            {selectedCategory === 'beginner' && '초보자를 위한 팁'}
            {selectedCategory === 'technique' && '기법 관련 팁'}
            {selectedCategory === 'problem' && '문제해결 팁'}
            {selectedCategory === 'material' && '재료/도구 팁'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {filteredTips.length}개의 유용한 팁을 확인해보세요
          </Text>

          {filteredTips.map(renderTip)}
        </View>

        {/* Bottom Note */}
        <View style={styles.bottomNote}>
          <Text style={styles.noteTitle}>💡 팁 활용법</Text>
          <View style={styles.noteList}>
            <Text style={styles.noteText}>• 각 팁을 터치하면 자세한 내용을 볼 수 있어요</Text>
            <Text style={styles.noteText}>• 카테고리별로 필요한 팁을 찾아보세요</Text>
            <Text style={styles.noteText}>• 실제 뜨개질할 때 참고하여 활용해주세요</Text>
            <Text style={styles.noteText}>• 어려움 정도를 확인하고 단계적으로 학습하세요</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* 하단 배너 광고 */}
      <AdBanner />
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
  categoryScrollView: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 12,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryTab: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 70,
  },
  activeCategoryTab: {
    backgroundColor: '#6B73FF',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A5568',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tipsSection: {
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
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    position: 'relative',
  },
  tipHeader: {
    marginBottom: 12,
  },
  tipTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  difficultyBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 20,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipContent: {
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 22,
    marginBottom: 8,
  },
  expandIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  expandIcon: {
    fontSize: 18,
    color: '#A0ADB8',
    fontWeight: '300',
  },
  bottomNote: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 12,
  },
  noteList: {
    gap: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#C2410C',
    lineHeight: 20,
  },
});

export default KnittingTipsScreen;