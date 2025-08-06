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
import { knittingTermsData, KnittingTerm } from '../data/KnittingDictionaryData';
import AdBanner from '../components/AdBanner';

const KnittingDictionaryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'stitch' | 'tool' | 'technique' | 'material'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());


  const categories = [
    { key: 'all' as const, label: '전체' },
    { key: 'basic' as const, label: '기본' },
    { key: 'stitch' as const, label: '뜨기법' },
    { key: 'tool' as const, label: '도구' },
    { key: 'technique' as const, label: '기법' },
    { key: 'material' as const, label: '재료' },
  ];

  const filteredTerms = useMemo(() => {
    return knittingTermsData.filter(term => {
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