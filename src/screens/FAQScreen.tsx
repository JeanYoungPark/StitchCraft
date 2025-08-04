import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const FAQScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqData: FAQItem[] = [
    // 기본 도구와 재료
    {
      id: 'basic-1',
      question: '뜨개질을 처음 시작하는데 어떤 도구가 필요한가요?',
      answer: '초보자에게는 다음 도구들을 추천합니다:\n\n• 대바늘 8-10mm (초보자용)\n• 중간 굵기 아크릴실 또는 면실\n• 가위\n• 줄자\n• 바늘 끝 보호캡\n\n처음에는 간단한 도구로 시작해서 익숙해지면 점차 늘려가는 것이 좋습니다.',
      category: 'basic',
      keywords: ['도구', '시작', '초보자', '바늘', '실']
    },
    {
      id: 'basic-2',
      question: '대바늘과 코바늘 중 어떤 것을 먼저 배워야 하나요?',
      answer: '초보자에게는 대바늘을 먼저 추천합니다:\n\n• 실수를 고치기가 더 쉬움\n• 진행 속도가 안정적\n• 기본 원리를 이해하기 쉬움\n• 평면적인 작품(스카프, 목도리)부터 시작 가능\n\n대바늘에 익숙해진 후 코바늘로 넘어가면 더 수월합니다.',
      category: 'basic',
      keywords: ['대바늘', '코바늘', '선택', '초보자', '추천']
    },
    {
      id: 'basic-3',
      question: '실을 고를 때 어떤 기준으로 선택해야 하나요?',
      answer: '초보자를 위한 실 선택 기준:\n\n• 굵기: 중간 굵기(DK~벌키 웨이트)\n• 재질: 아크릴실 또는 면실 (관리 쉬움)\n• 색상: 밝은 단색 (뜨개 상태 확인 쉬움)\n• 브랜드: 같은 브랜드, 같은 염료 번호로 구매\n\n어두운 색이나 털이 많은 실은 실수를 찾기 어려우니 피하세요.',
      category: 'basic',
      keywords: ['실', '선택', '굵기', '재질', '색상']
    },

    // 기본 기법과 용어
    {
      id: 'technique-1',
      question: '코 만들기가 너무 조이거나 느슨해져요. 어떻게 해야 하나요?',
      answer: '적절한 장력 조절이 중요합니다:\n\n너무 조일 때:\n• 바늘을 살짝 더 크게 선택\n• 실을 감을 때 힘을 덜 주기\n• 바늘에 실을 감는 횟수 줄이기\n\n너무 느슨할 때:\n• 실을 감을 때 적당한 장력 주기\n• 코를 만든 후 살짝 조여주기\n\n연습하면서 일정한 장력을 유지하는 게 가장 중요해요.',
      category: 'technique',
      keywords: ['코 만들기', '장력', '조임', '느슨함']
    },
    {
      id: 'technique-2',
      question: '메리야스뜨기와 안뜨기의 차이가 뭔가요?',
      answer: '두 기법의 차이점:\n\n메리야스뜨기(겉뜨기):\n• 바늘을 앞에서 뒤로 넣음\n• 매끄러운 V자 모양\n• 작품의 겉면에 사용\n\n안뜨기:\n• 바늘을 뒤에서 앞으로 넣음\n• 울퉁불퉁한 가로줄 모양\n• 작품의 안면에 사용\n\n두 기법을 번갈아 사용하면 다양한 패턴을 만들 수 있어요.',
      category: 'technique',
      keywords: ['메리야스뜨기', '안뜨기', '기법', '차이']
    },
    {
      id: 'technique-3',
      question: '게이지가 뭐고 왜 중요한가요?',
      answer: '게이지는 일정한 크기에 들어가는 코와 단의 수입니다:\n\n중요한 이유:\n• 작품 크기 결정\n• 실과 바늘의 적합성 확인\n• 패턴 지시사항과의 일치 여부\n\n측정 방법:\n• 10cm × 10cm 정사각형 뜨기\n• 코와 단 수 세기\n• 패턴의 게이지와 비교\n\n게이지가 맞지 않으면 바늘 크기를 조정하세요.',
      category: 'technique',
      keywords: ['게이지', '크기', '측정', '바늘', '패턴']
    },

    // 실수와 해결법
    {
      id: 'problem-1',
      question: '코가 빠졌어요! 어떻게 고쳐야 하나요?',
      answer: '코 빠짐 복구 방법:\n\n즉시 조치:\n• 코가 더 풀리지 않도록 안전핀이나 클립으로 고정\n• 당황하지 말고 천천히 확인\n\n복구 방법:\n• 코바늘이나 바늘로 빠진 코를 다시 끼우기\n• 아래쪽부터 차례로 올려가며 복구\n• 장력을 맞춰가며 조정\n\n예방법:\n• 작업 중단 시 바늘 끝 보호캡 사용\n• 코 수 자주 확인하기',
      category: 'problem',
      keywords: ['코 빠짐', '실수', '복구', '고치기']
    },
    {
      id: 'problem-2',
      question: '뜨다가 코 수가 달라졌어요. 왜 그런가요?',
      answer: '코 수 변화의 주요 원인:\n\n코가 늘어난 경우:\n• 실수로 늘림코를 만듦\n• 두 코를 한 번에 뜸\n• 실을 바늘에 걸어버림\n\n코가 줄어든 경우:\n• 두 코를 함께 뜸\n• 코를 놓침\n• 너무 꽉 당겨서 합쳐짐\n\n해결법:\n• 각 단마다 코 수 확인\n• 실수 발견 시 즉시 풀어서 다시\n• 천천히 정확하게 뜨기',
      category: 'problem',
      keywords: ['코 수', '변화', '늘어남', '줄어듦', '실수']
    },
    {
      id: 'problem-3',
      question: '뜨개질이 삐뚤어져요. 어떻게 똑바로 뜰 수 있나요?',
      answer: '삐뚤어짐 방지 방법:\n\n원인:\n• 장력이 일정하지 않음\n• 첫 코와 마지막 코의 처리 문제\n• 뜨는 방향이 일정하지 않음\n\n해결책:\n• 첫 코는 뜨지 않고 넘기기\n• 마지막 코를 꽉 당기지 않기\n• 일정한 속도와 장력 유지\n• 작업 위치와 자세 일정하게 유지\n\n연습을 통해 점차 개선됩니다.',
      category: 'problem',
      keywords: ['삐뚤어짐', '장력', '균등', '자세']
    },

    // 프로젝트 선택
    {
      id: 'project-1',
      question: '첫 번째 작품으로 무엇을 만드는 게 좋을까요?',
      answer: '초보자 추천 프로젝트 순서:\n\n1단계 - 연습용:\n• 코스터나 컵받침\n• 작은 사각형 조각\n\n2단계 - 실용품:\n• 머플러나 스카프\n• 수세미\n\n3단계 - 의류:\n• 목도리\n• 간단한 모자\n\n피해야 할 것:\n• 복잡한 무늬\n• 크기 조절이 필요한 의류\n• 원형이나 입체 작품',
      category: 'project',
      keywords: ['첫 작품', '프로젝트', '추천', '초보자', '스카프']
    },
    {
      id: 'project-2',
      question: '패턴을 보는 법을 모르겠어요. 어떻게 읽나요?',
      answer: '패턴 읽기 기본:\n\n기본 용어:\n• 코(st): 바늘 위의 한 고리\n• 단(row): 한 줄\n• 반복(*): 표시된 부분 반복\n• 괄호(): 함께 실행할 지시사항\n\n읽는 순서:\n• 재료와 도구 확인\n• 게이지 정보 확인\n• 약어표 숙지\n• 단계별로 천천히 따라가기\n\n모르는 용어는 뜨개질 사전에서 찾아보세요.',
      category: 'project',
      keywords: ['패턴', '읽기', '용어', '약어', '지시사항']
    },

    // 관리와 보관
    {
      id: 'care-1',
      question: '뜨개질 작품을 어떻게 세탁해야 하나요?',
      answer: '실별 세탁 방법:\n\n면실:\n• 미지근한 물에 중성세제 사용\n• 부드럽게 손세탁 또는 세탁기 울코스\n• 평평하게 펴서 말리기\n\n모직실:\n• 찬물에 울 전용 세제 사용\n• 절대 비비거나 짜지 말기\n• 수건에 싸서 물기 제거 후 평건조\n\n아크릴실:\n• 일반 세탁 가능\n• 건조기 사용 시 낮은 온도\n\n라벨 확인이 가장 중요해요!',
      category: 'care',
      keywords: ['세탁', '관리', '면실', '모직실', '아크릴실']
    },
    {
      id: 'care-2',
      question: '사용하다 남은 실은 어떻게 보관해야 하나요?',
      answer: '실 보관 방법:\n\n기본 원칙:\n• 직사광선 피하기\n• 습도 조절 (너무 건조하거나 습하지 않게)\n• 벌레 방지\n\n보관 용기:\n• 밀폐 용기나 지퍼백\n• 나방 방충제 넣기\n• 라벨 정보 함께 보관\n\n정리 팁:\n• 색상별로 정리\n• 남은 양 기록해두기\n• 구매 정보(브랜드, 색상번호) 보관\n\n이렇게 하면 나중에 이어서 사용하기 편해요.',
      category: 'care',
      keywords: ['실', '보관', '정리', '습도', '방충제']
    },

    // 발전과 심화
    {
      id: 'advanced-1',
      question: '언제쯤 어려운 패턴에 도전할 수 있을까요?',
      answer: '단계별 발전 가이드:\n\n기초 마스터 후 (2-3개월):\n• 코 늘리기, 줄이기\n• 간단한 무늬 (고무뜨기 등)\n\n중급 도전 (6개월~1년):\n• 케이블 무늬\n• 레이스 무늬\n• 간단한 의류\n\n고급 도전 (1년 이상):\n• 복잡한 무늬 조합\n• 맞춤 의류\n• 원형 뜨기\n\n본인의 속도에 맞춰 천천히 발전하는 게 중요해요.',
      category: 'advanced',
      keywords: ['발전', '단계', '어려운', '패턴', '중급', '고급']
    }
  ];

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'basic', name: '기본 도구' },
    { id: 'technique', name: '기법' },
    { id: 'problem', name: '문제 해결' },
    { id: 'project', name: '프로젝트' },
    { id: 'care', name: '관리' },
    { id: 'advanced', name: '발전' }
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchText === '' || 
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase()) ||
      item.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchText.toLowerCase())
      );
    
    return matchesCategory && matchesSearch;
  });

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
        <Text style={styles.headerTitle}>자주 묻는 질문</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="질문을 검색해보세요..."
            placeholderTextColor="#A0ADB8"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Text style={styles.clearButtonText}>✕</Text>
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
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterChip,
                selectedCategory === category.id && styles.activeFilterChip
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === category.id && styles.activeFilterText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* FAQ List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.faqContainer}>
          {filteredFAQs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>검색 결과가 없습니다</Text>
              <Text style={styles.emptyText}>
                다른 키워드로 검색하거나 카테고리를 변경해보세요
              </Text>
            </View>
          ) : (
            filteredFAQs.map((item, index) => (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.questionContainer}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.questionContent}>
                    <Text style={styles.questionNumber}>Q{index + 1}</Text>
                    <Text style={styles.questionText}>{item.question}</Text>
                  </View>
                  <Text style={[
                    styles.expandIcon,
                    expandedItems.has(item.id) && styles.expandedIcon
                  ]}>
                    ▼
                  </Text>
                </TouchableOpacity>
                
                {expandedItems.has(item.id) && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerLabel}>A</Text>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>💡 더 도움이 필요하다면?</Text>
          <View style={styles.helpOptions}>
            <Text style={styles.helpText}>• 뜨개질 용어 사전에서 모르는 용어 찾기</Text>
            <Text style={styles.helpText}>• 기본 기법 모음에서 동영상 보기</Text>
            <Text style={styles.helpText}>• 온라인 뜨개질 커뮤니티 참여하기</Text>
            <Text style={styles.helpText}>• 실 종류 가이드에서 재료 정보 확인</Text>
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
    paddingBottom: 60, // Tab bar height
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#A0ADB8',
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
  content: {
    flex: 1,
  },
  faqContainer: {
    padding: 16,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingRight: 12,
  },
  questionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B73FF',
    marginRight: 12,
    marginTop: 2,
    minWidth: 24,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
    lineHeight: 24,
  },
  expandIcon: {
    fontSize: 12,
    color: '#A0ADB8',
    marginLeft: 8,
    transform: [{ rotate: '0deg' }],
  },
  expandedIcon: {
    transform: [{ rotate: '180deg' }],
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: '#F7FAFC',
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#52C41A',
    marginRight: 12,
    marginTop: 2,
    minWidth: 24,
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 22,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  helpSection: {
    backgroundColor: '#E6FFFA',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#81E6D9',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#234E52',
    marginBottom: 12,
  },
  helpOptions: {
    gap: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#2C7A7B',
    lineHeight: 20,
  },
});

export default FAQScreen;