import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface KnittingTerm {
  id: string;
  korean: string;
  english: string;
  pronunciation?: string;
  category: 'basic' | 'stitch' | 'tool' | 'technique' | 'material';
  definition: string;
  example?: string;
  relatedTerms?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const KnittingDictionaryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'stitch' | 'tool' | 'technique' | 'material'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const knittingTerms: KnittingTerm[] = [
    // 기본 용어
    {
      id: '1',
      korean: '코',
      english: 'Stitch',
      pronunciation: 'stɪtʃ',
      category: 'basic',
      definition: '뜨개질의 기본 단위로, 실을 바늘에 걸어 만든 고리를 말합니다.',
      example: '20코를 만들어주세요',
      relatedTerms: ['뜨기', '바늘'],
      difficulty: 'beginner'
    },
    {
      id: '2',
      korean: '단',
      english: 'Row',
      pronunciation: 'roʊ',
      category: 'basic',
      definition: '가로로 한 줄을 뜬 것을 말합니다. 앞뜨기와 뒤뜨기가 한 세트입니다.',
      example: '10단을 뜨고 나서 색을 바꿔주세요',
      relatedTerms: ['코', '뜨기'],
      difficulty: 'beginner'
    },
    {
      id: '3',
      korean: '메리야스뜨기',
      english: 'Knit Stitch',
      pronunciation: 'nɪt stɪtʃ',
      category: 'stitch',
      definition: '가장 기본적인 뜨개질 기법으로, 부드럽고 평평한 면을 만듭니다.',
      example: '1단: 모든 코를 메리야스뜨기로 떠주세요',
      relatedTerms: ['안뜨기', '기본뜨기'],
      difficulty: 'beginner'
    },
    {
      id: '4',
      korean: '안뜨기',
      english: 'Purl Stitch',
      pronunciation: 'pɜːrl stɪtʃ',
      category: 'stitch',
      definition: '메리야스뜨기의 반대면으로, 울퉁불퉁한 질감을 만듭니다.',
      example: '2단: 모든 코를 안뜨기로 떠주세요',
      relatedTerms: ['메리야스뜨기', '기본뜨기'],
      difficulty: 'beginner'
    },
    {
      id: '5',
      korean: '대바늘',
      english: 'Knitting Needles',
      pronunciation: 'ˈnɪtɪŋ ˈniːdəlz',
      category: 'tool',
      definition: '직선형 바늘로 평면 뜨개질에 사용됩니다. 보통 2개를 한 세트로 사용합니다.',
      example: '5mm 대바늘을 준비해주세요',
      relatedTerms: ['코바늘', '원형바늘', '바늘'],
      difficulty: 'beginner'
    },
    {
      id: '6',
      korean: '코바늘',
      english: 'Crochet Hook',
      pronunciation: 'kroʊˈʃeɪ hʊk',
      category: 'tool',
      definition: '갈고리 모양의 바늘로 고리뜨기에 사용됩니다.',
      example: '6mm 코바늘로 사슬뜨기를 해주세요',
      relatedTerms: ['대바늘', '바늘', '고리뜨기'],
      difficulty: 'beginner'
    },
    {
      id: '7',
      korean: '게이지',
      english: 'Gauge',
      pronunciation: 'ɡeɪdʒ',
      category: 'technique',
      definition: '10cm x 10cm 정사각형 안에 들어가는 코와 단의 개수를 측정하는 것입니다.',
      example: '게이지: 20코 x 28단 = 10cm x 10cm',
      relatedTerms: ['텐션', '밀도'],
      difficulty: 'intermediate'
    },
    {
      id: '8',
      korean: '코 만들기',
      english: 'Cast On',
      pronunciation: 'kæst ɒn',
      category: 'technique',
      definition: '뜨개질을 시작할 때 바늘에 첫 번째 코들을 만드는 기법입니다.',
      example: '40코를 만들어 시작해주세요',
      relatedTerms: ['코 빼기', '시작'],
      difficulty: 'beginner'
    },
    {
      id: '9',
      korean: '코 빼기',
      english: 'Bind Off / Cast Off',
      pronunciation: 'baɪnd ɔːf',
      category: 'technique',
      definition: '뜨개질을 마무리할 때 코를 빼서 풀리지 않게 하는 기법입니다.',
      example: '마지막에 모든 코를 빼주세요',
      relatedTerms: ['코 만들기', '마무리'],
      difficulty: 'beginner'
    },
    {
      id: '10',
      korean: '면실',
      english: 'Cotton Yarn',
      pronunciation: 'ˈkɑːtən jɑːrn',
      category: 'material',
      definition: '면화에서 뽑은 천연섬유 실로, 시원하고 흡수성이 좋습니다.',
      example: '여름 티셔츠는 면실로 뜨는 게 좋아요',
      relatedTerms: ['모직실', '아크릴실', '실'],
      difficulty: 'beginner'
    },
    {
      id: '11',
      korean: '모직실',
      english: 'Wool Yarn',
      pronunciation: 'wʊl jɑːrn',
      category: 'material',
      definition: '양털에서 뽑은 천연섬유 실로, 따뜻하고 보온성이 뛰어납니다.',
      example: '겨울 스웨터는 모직실이 최고예요',
      relatedTerms: ['면실', '알파카실', '실'],
      difficulty: 'beginner'
    },
    {
      id: '12',
      korean: '고무뜨기',
      english: 'Ribbing',
      pronunciation: 'ˈrɪbɪŋ',
      category: 'stitch',
      definition: '메리야스뜨기와 안뜨기를 교대로 하여 탄력있는 조직을 만드는 기법입니다.',
      example: '1코 메리야스, 1코 안뜨기를 반복해주세요',
      relatedTerms: ['메리야스뜨기', '안뜨기', '탄력'],
      difficulty: 'intermediate'
    },
    {
      id: '13',
      korean: '사슬뜨기',
      english: 'Chain Stitch',
      pronunciation: 'tʃeɪn stɪtʃ',
      category: 'stitch',
      definition: '코바늘 뜨개질의 기본으로, 연결된 고리를 만드는 기법입니다.',
      example: '30 사슬을 떠서 시작해주세요',
      relatedTerms: ['코바늘', '고리뜨기', '시작'],
      difficulty: 'beginner'
    },
    {
      id: '14',
      korean: '텐션',
      english: 'Tension',
      pronunciation: 'ˈtenʃən',
      category: 'technique',
      definition: '실을 당기는 힘의 세기로, 뜨개질의 균일성을 결정합니다.',
      example: '텐션을 일정하게 유지하는 게 중요해요',
      relatedTerms: ['게이지', '균일성'],
      difficulty: 'intermediate'
    },
    {
      id: '15',
      korean: '증코',
      english: 'Increase',
      pronunciation: 'ˈɪnkriːs',
      category: 'technique',
      definition: '코의 개수를 늘리는 기법으로 작품의 폭을 넓힐 때 사용합니다.',
      example: '소매 부분에서 증코해주세요',
      relatedTerms: ['감코', '코 늘리기'],
      difficulty: 'intermediate'
    },
    {
      id: '16',
      korean: '감코',
      english: 'Decrease',
      pronunciation: 'dɪˈkriːs',
      category: 'technique',
      definition: '코의 개수를 줄이는 기법으로 작품의 폭을 좁힐 때 사용합니다.',
      example: '목선 부분에서 감코해주세요',
      relatedTerms: ['증코', '코 줄이기'],
      difficulty: 'intermediate'
    }
  ];

  const categories = [
    { key: 'all' as const, label: '전체' },
    { key: 'basic' as const, label: '기본' },
    { key: 'stitch' as const, label: '뜨기법' },
    { key: 'tool' as const, label: '도구' },
    { key: 'technique' as const, label: '기법' },
    { key: 'material' as const, label: '재료' },
  ];

  const filteredTerms = useMemo(() => {
    return knittingTerms.filter(term => {
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        term.korean.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpanded = (termId: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId);
    } else {
      newExpanded.add(termId);
    }
    setExpandedTerms(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { bg: '#F0FDF4', text: '#15803D' };
      case 'intermediate': return { bg: '#FFFBF0', text: '#D97706' };
      case 'advanced': return { bg: '#FEF2F2', text: '#DC2626' };
      default: return { bg: '#F0FDF4', text: '#15803D' };
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '초급';
    }
  };

  const renderTerm = ({ item }: { item: KnittingTerm }) => {
    const isExpanded = expandedTerms.has(item.id);
    const difficultyColors = getDifficultyColor(item.difficulty);

    return (
      <TouchableOpacity
        style={styles.termCard}
        onPress={() => toggleExpanded(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.termHeader}>
          <View style={styles.termTitleRow}>
            <Text style={styles.termKorean}>{item.korean}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors.bg }]}>
              <Text style={[styles.difficultyText, { color: difficultyColors.text }]}>
                {getDifficultyLabel(item.difficulty)}
              </Text>
            </View>
          </View>
          <View style={styles.termEnglishRow}>
            <Text style={styles.termEnglish}>{item.english}</Text>
            {item.pronunciation && (
              <Text style={styles.termPronunciation}>[{item.pronunciation}]</Text>
            )}
          </View>
        </View>

        <Text style={styles.termDefinition} numberOfLines={isExpanded ? undefined : 2}>
          {item.definition}
        </Text>

        {isExpanded && (
          <View style={styles.expandedContent}>
            {item.example && (
              <View style={styles.exampleSection}>
                <Text style={styles.exampleTitle}>예시</Text>
                <Text style={styles.exampleText}>{item.example}</Text>
              </View>
            )}
            
            {item.relatedTerms && item.relatedTerms.length > 0 && (
              <View style={styles.relatedSection}>
                <Text style={styles.relatedTitle}>관련 용어</Text>
                <View style={styles.relatedTerms}>
                  {item.relatedTerms.map((relatedTerm, index) => (
                    <View key={index} style={styles.relatedTag}>
                      <Text style={styles.relatedTagText}>{relatedTerm}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
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
        <Text style={styles.headerTitle}>뜨개질 용어 사전</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="용어 검색..."
            placeholderTextColor="#A0ADB8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.filterChip,
                selectedCategory === category.key && styles.activeFilterChip
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === category.key && styles.activeFilterText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Info */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          {filteredTerms.length}개의 용어
        </Text>
      </View>

      {/* Terms List */}
      <FlatList
        data={filteredTerms}
        renderItem={renderTerm}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.termsList}
      />
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
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  clearButton: {
    fontSize: 16,
    color: '#A0ADB8',
    paddingLeft: 8,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterChip: {
    backgroundColor: '#6B73FF',
    borderColor: '#6B73FF',
  },
  filterText: {
    fontSize: 13,
    color: '#4A5568',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultsText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  termsList: {
    padding: 16,
  },
  termCard: {
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
  termHeader: {
    marginBottom: 8,
  },
  termTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  termKorean: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    marginRight: 12,
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
  termEnglishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  termEnglish: {
    fontSize: 16,
    color: '#6B73FF',
    fontWeight: '500',
  },
  termPronunciation: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  },
  termDefinition: {
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 22,
    marginBottom: 8,
  },
  expandedContent: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  exampleSection: {
    marginBottom: 12,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 14,
    color: '#4A5568',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    lineHeight: 20,
  },
  relatedSection: {
    marginBottom: 8,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 6,
  },
  relatedTerms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  relatedTag: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  relatedTagText: {
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
});

export default KnittingDictionaryScreen;