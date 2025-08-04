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

interface KnittingTip {
  id: string;
  category: 'beginner' | 'technique' | 'problem' | 'material';
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

const KnittingTipsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'technique' | 'problem' | 'material'>('all');
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  const knittingTips: KnittingTip[] = [
    {
      id: '1',
      category: 'beginner',
      title: '처음 시작할 때 실 선택하는 법',
      content: '초보자는 중간 굵기의 면실이나 아크릴실을 추천합니다. 너무 얇거나 두꺼운 실은 피하고, 밝은 색상을 선택하면 코를 세기 쉬워요. 특히 아크릴실은 가격이 저렴하고 세탁이 쉬워서 연습용으로 최적입니다.',
      difficulty: 'easy',
      tags: ['초보자', '실선택', '재료']
    },
    {
      id: '2',
      category: 'technique',
      title: '텐션을 일정하게 유지하는 방법',
      content: '실을 너무 조이지도 너무 느슨하게 하지도 말고 일정한 힘으로 잡아주세요. 손목에 힘을 빼고 자연스럽게 실을 감는 것이 중요합니다. 처음에는 어렵지만 꾸준히 연습하면 자연스럽게 일정한 텐션을 유지할 수 있어요.',
      difficulty: 'medium',
      tags: ['텐션', '기법', '연습']
    },
    {
      id: '3',
      category: 'problem',
      title: '코가 떨어졌을 때 해결법',
      content: '코가 떨어져도 당황하지 마세요. 코바늘이나 뜨개질용 안전핀을 사용해서 떨어진 코를 다시 집어 올릴 수 있습니다. 떨어진 코를 찾아서 아래에서 위로 차례대로 다시 떠 올리면 됩니다. 연습용 작품에서 미리 해보는 것이 좋아요.',
      difficulty: 'medium',
      tags: ['문제해결', '실수복구', '코떨어짐']
    },
    {
      id: '4',
      category: 'beginner',
      title: '바늘을 잡는 올바른 방법',
      content: '연필을 잡듯이 자연스럽게 바늘을 잡아주세요. 너무 꽉 잡으면 손목이 아프고 피로해집니다. 오른손은 바늘을 조작하고, 왼손은 실과 코를 컨트롤하는 역할을 합니다. 처음에는 어색하지만 점차 익숙해질 거예요.',
      difficulty: 'easy',
      tags: ['초보자', '바늘잡기', '자세']
    },
    {
      id: '5',
      category: 'technique',
      title: '게이지 뜨기의 중요성',
      content: '작품을 시작하기 전에 반드시 게이지를 떠보세요. 10cm x 10cm 정사각형에 몇 코, 몇 단이 들어가는지 확인해야 합니다. 게이지가 맞지 않으면 완성된 작품의 크기가 달라질 수 있어요. 바늘 호수를 조정해서 게이지를 맞춰주세요.',
      difficulty: 'medium',
      tags: ['게이지', '측정', '바늘호수']
    },
    {
      id: '6',
      category: 'problem',
      title: '뜨개질이 비뚤어질 때',
      content: '뜨개질이 한쪽으로 비뚤어지는 것은 텐션이 일정하지 않거나 코를 빼먹었기 때문일 수 있습니다. 매 단마다 코 수를 확인하고, 텐션을 일정하게 유지하세요. 또한 바늘을 너무 기울여서 뜨지 않도록 주의해주세요.',
      difficulty: 'medium',
      tags: ['비뚤어짐', '텐션', '자세교정']
    },
    {
      id: '7',
      category: 'material',
      title: '실 끝 처리하는 깔끔한 방법',
      content: '작업이 끝나면 실 끝을 5-6cm 정도 남기고 자릅니다. 털실 바늘에 끼워서 뜨개질 조직 사이사이로 넣었다 빼기를 3-4번 반복한 후 남은 부분을 잘라주세요. 같은 색 실이 지나가는 부분에 숨기면 더 깔끔해집니다.',
      difficulty: 'easy',
      tags: ['마무리', '실끝처리', '정리']
    },
    {
      id: '8',
      category: 'beginner',
      title: '첫 작품으로 추천하는 것들',
      content: '첫 작품으로는 수세미, 코스터, 목도리 같은 단순한 직사각형 모양을 추천합니다. 메리야스뜨기만으로도 충분히 예쁜 작품을 만들 수 있어요. 복잡한 패턴은 피하고 기본기를 충분히 익힌 후에 도전하세요.',
      difficulty: 'easy',
      tags: ['첫작품', '추천', '단순함']
    },
    {
      id: '9',
      category: 'technique',
      title: '색깔 바꿀 때 깔끔하게 하는 법',
      content: '색깔을 바꿀 때는 단의 끝에서 바꾸는 것이 가장 깔끔합니다. 새로운 색 실로 마지막 두 번째 고리를 빼주면 자연스럽게 색이 바뀝니다. 실 끝은 나중에 뜨개질 조직에 숨겨서 처리해주세요.',
      difficulty: 'medium',
      tags: ['색바꾸기', '실바꾸기', '마무리']
    },
    {
      id: '10',
      category: 'problem',
      title: '뜨개질이 너무 팽팽할 때',
      content: '뜨개질이 너무 팽팽하면 바늘이 잘 들어가지 않고 손목도 아픕니다. 실을 조금 더 느슨하게 잡거나 한 호수 큰 바늘을 사용해보세요. 손에 힘을 빼고 편안하게 뜨는 것이 중요합니다.',
      difficulty: 'easy',
      tags: ['텐션조절', '바늘호수', '편안함']
    },
    {
      id: '11',
      category: 'material',
      title: '뜨개질 도구 관리하는 법',
      content: '바늘은 사용 후 깨끗하게 닦아서 보관하세요. 실은 직사광선을 피해 서늘하고 건조한 곳에 보관합니다. 나방을 방지하기 위해 라벤더나 삼나무 향이 나는 방충제를 함께 넣어두면 좋아요.',
      difficulty: 'easy',
      tags: ['도구관리', '보관', '관리법']
    },
    {
      id: '12',
      category: 'technique',
      title: '뜨개질 패턴 읽는 방법',
      content: '패턴을 읽을 때는 약어를 먼저 익히세요. K는 메리야스뜨기, P는 안뜨기를 뜻합니다. 괄호 안의 숫자는 반복 횟수를 나타내요. 차트가 있다면 오른쪽에서 왼쪽으로, 아래에서 위로 읽습니다.',
      difficulty: 'hard',
      tags: ['패턴읽기', '약어', '차트']
    }
  ];

  const categories = [
    { key: 'all' as const, label: '전체' },
    { key: 'beginner' as const, label: '초보자' },
    { key: 'technique' as const, label: '기법' },
    { key: 'problem' as const, label: '문제해결' },
    { key: 'material' as const, label: '재료/도구' },
  ];

  const filteredTips = knittingTips.filter(tip => 
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

        {isExpanded && (
          <View style={styles.tagsContainer}>
            {tip.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  tagText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
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