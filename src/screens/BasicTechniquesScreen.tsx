import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const BasicTechniquesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'knitting' | 'crochet' | 'finishing'>('knitting');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>('');

  const knittingTechniques = [
    {
      name: '코 만들기 (Cast On)',
      description: '뜨개질의 첫 단계로 바늘에 코를 만드는 기법',
      difficulty: '초급',
      videoUrl: 'https://www.youtube.com/watch?v=Ei3eoqXmkjU',
      steps: [
        '실 끝을 15cm 정도 남기고 슬립노트를 만들어주세요',
        '오른손 바늘에 슬립노트를 걸어주세요',
        '왼손으로 실을 감아 새로운 코를 만들어주세요',
        '필요한 개수만큼 반복해주세요'
      ],
      tips: '코를 너무 조이지 말고 적당한 여유를 두세요'
    },
    {
      name: '메리야스뜨기 (Knit Stitch)',
      description: '가장 기본적인 뜨개질 기법으로 부드러운 면을 만듭니다',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=knit-stitch-tutorial',
      steps: [
        '오른손 바늘을 왼손 바늘의 첫 번째 코에 앞에서 뒤로 넣어주세요',
        '실을 오른손 바늘에 감아주세요',
        '감은 실을 코 안으로 빼내주세요',
        '왼손 바늘에서 코를 빼주세요'
      ],
      tips: '일정한 텐션을 유지하는 것이 중요해요'
    },
    {
      name: '안뜨기 (Purl Stitch)',
      description: '메리야스뜨기의 반대면으로 울퉁불퉁한 질감을 만듭니다',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=purl-stitch-tutorial',
      steps: [
        '실을 앞쪽으로 가져와주세요',
        '오른손 바늘을 왼손 바늘의 코에 뒤에서 앞으로 넣어주세요',
        '실을 오른손 바늘에 반시계방향으로 감아주세요',
        '감은 실을 코 안으로 빼내주세요'
      ],
      tips: '메리야스뜨기보다 약간 더 어려울 수 있어요'
    },
    {
      name: '고무뜨기 (Ribbing)',
      description: '메리야스뜨기와 안뜨기를 교대로 하여 탄력있는 조직을 만듭니다',
      difficulty: '중급',
      videoUrl: 'https://youtube.com/watch?v=ribbing-tutorial',
      steps: [
        '1코는 메리야스뜨기, 1코는 안뜨기를 반복해주세요',
        '다음 단에서는 메리야스뜨기 위에 메리야스뜨기를 해주세요',
        '안뜨기 위에는 안뜨기를 해주세요',
        '패턴을 반복하여 원하는 길이까지 떠주세요'
      ],
      tips: '소매나 목 부분에 많이 사용되는 기법이에요'
    }
  ];

  const crochetTechniques = [
    {
      name: '사슬뜨기 (Chain Stitch)',
      description: '코바늘 뜨개질의 가장 기본이 되는 기법',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=chain-stitch-tutorial',
      steps: [
        '슬립노트를 만들어 코바늘에 걸어주세요',
        '실을 코바늘에 걸어주세요',
        '실을 잡아당겨 고리를 만들어주세요',
        '필요한 개수만큼 반복해주세요'
      ],
      tips: '사슬의 크기를 일정하게 유지하세요'
    },
    {
      name: '한길긴뜨기 (Single Crochet)',
      description: '코바늘 뜨개질의 기본 기법으로 조밀한 조직을 만듭니다',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=single-crochet-tutorial',
      steps: [
        '코바늘을 사슬 또는 이전 단의 코에 넣어주세요',
        '실을 걸어 고리를 만들어주세요 (코바늘에 2개의 고리)',
        '다시 실을 걸어 두 고리를 한번에 빼주세요',
        '다음 코로 이동하여 반복해주세요'
      ],
      tips: '가장 많이 사용되는 기본 기법이에요'
    },
    {
      name: '한길반뜨기 (Half Double Crochet)',
      description: '한길긴뜨기보다 약간 높은 기법',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=half-double-crochet-tutorial',
      steps: [
        '실을 코바늘에 한 번 감아주세요',
        '코바늘을 지정된 위치에 넣어주세요',
        '실을 걸어주세요 (코바늘에 3개의 고리)',
        '실을 걸어 3개의 고리를 한번에 빼주세요'
      ],
      tips: '한길긴뜨기와 두길긴뜨기의 중간 높이예요'
    },
    {
      name: '두길긴뜨기 (Double Crochet)',
      description: '높이가 있는 뜨개질로 빠르게 작업할 수 있습니다',
      difficulty: '중급',
      videoUrl: 'https://youtube.com/watch?v=double-crochet-tutorial',
      steps: [
        '실을 코바늘에 한 번 감아주세요',
        '코바늘을 지정된 위치에 넣어주세요',
        '실을 걸어주세요 (코바늘에 3개의 고리)',
        '실을 걸어 2개의 고리를 빼주세요',
        '다시 실을 걸어 남은 2개의 고리를 빼주세요'
      ],
      tips: '스웨터나 담요 만들 때 자주 사용해요'
    }
  ];

  const finishingTechniques = [
    {
      name: '코 빼기 (Bind Off)',
      description: '뜨개질을 마무리할 때 코를 빼는 기법',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=bind-off-tutorial',
      steps: [
        '첫 번째와 두 번째 코를 메리야스뜨기 해주세요',
        '왼손 바늘로 첫 번째 코를 두 번째 코 위로 넘겨주세요',
        '다음 코를 메리야스뜨기 해주세요',
        '같은 방법으로 마지막 코까지 반복해주세요'
      ],
      tips: '너무 조이지 말고 적당한 여유를 두세요'
    },
    {
      name: '코 줍기 (Pick Up Stitches)',
      description: '완성된 가장자리에서 새로운 코를 만드는 기법',
      difficulty: '중급',
      videoUrl: 'https://youtube.com/watch?v=pick-up-stitches-tutorial',
      steps: [
        '바늘을 가장자리의 원하는 위치에 넣어주세요',
        '실을 걸어 고리를 만들어주세요',
        '고리를 바늘 위로 올려주세요',
        '일정한 간격으로 반복해주세요'
      ],
      tips: '칼라나 소매를 만들 때 사용해요'
    },
    {
      name: '감침질 (Mattress Stitch)',
      description: '뜨개질 조각들을 깔끔하게 연결하는 봉제 기법',
      difficulty: '중급',
      videoUrl: 'https://youtube.com/watch?v=mattress-stitch-tutorial',
      steps: [
        '두 조각을 나란히 놓고 가장자리를 맞춰주세요',
        '털실 바늘에 같은 색 실을 끼워주세요',
        '한쪽 가장자리의 실을 집어 반대편으로 넘겨주세요',
        '지그재그로 번갈아가며 봉제해주세요'
      ],
      tips: '이음새가 거의 보이지 않는 깔끔한 마무리가 가능해요'
    },
    {
      name: '실 끝 처리',
      description: '작업 완료 후 실 끝을 깔끔하게 정리하는 방법',
      difficulty: '초급',
      videoUrl: 'https://youtube.com/watch?v=weaving-ends-tutorial',
      steps: [
        '실 끝을 5-6cm 정도 남겨두세요',
        '털실 바늘에 실을 끼워주세요',
        '뜨개질 조직 사이로 실을 넣었다 빼기를 반복해주세요',
        '실을 당겨서 고정한 후 남은 부분을 잘라주세요'
      ],
      tips: '같은 색 실이 지나가는 부분에 숨기면 더 깔끔해요'
    }
  ];

  const getCurrentTechniques = () => {
    switch (selectedCategory) {
      case 'knitting': return knittingTechniques;
      case 'crochet': return crochetTechniques;
      case 'finishing': return finishingTechniques;
      default: return knittingTechniques;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급': return { bg: '#F0FDF4', text: '#15803D' };
      case '중급': return { bg: '#FFFBF0', text: '#D97706' };
      case '고급': return { bg: '#FEF2F2', text: '#DC2626' };
      default: return { bg: '#F0FDF4', text: '#15803D' };
    }
  };

  const getYoutubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const handleVideoPress = (videoUrl: string, techniqueName: string) => {
    const videoId = getYoutubeVideoId(videoUrl);
    
    if (videoId) {
      // 앱 내에서 재생
      setCurrentVideoId(videoId);
      setCurrentVideoTitle(techniqueName);
      setShowVideoModal(true);
    } else {
      // 외부 링크로 재생 (fallback)
      Alert.alert(
        '영상 재생',
        `${techniqueName} 영상을 유튜브에서 재생하시겠습니까?`,
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '재생',
            onPress: () => {
              Linking.openURL(videoUrl).catch(() => {
                Alert.alert('오류', '영상을 재생할 수 없습니다.');
              });
            },
          },
        ]
      );
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideoId('');
    setCurrentVideoTitle('');
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
        <Text style={styles.headerTitle}>기본 기법 모음</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'knitting' && styles.activeTab]}
          onPress={() => setSelectedCategory('knitting')}
        >
          <Text style={[styles.tabText, selectedCategory === 'knitting' && styles.activeTabText]}>
            대바늘
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'crochet' && styles.activeTab]}
          onPress={() => setSelectedCategory('crochet')}
        >
          <Text style={[styles.tabText, selectedCategory === 'crochet' && styles.activeTabText]}>
            코바늘
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedCategory === 'finishing' && styles.activeTab]}
          onPress={() => setSelectedCategory('finishing')}
        >
          <Text style={[styles.tabText, selectedCategory === 'finishing' && styles.activeTabText]}>
            마무리
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'knitting' && '대바늘 기본 기법'}
            {selectedCategory === 'crochet' && '코바늘 기본 기법'}
            {selectedCategory === 'finishing' && '마무리 기법'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {selectedCategory === 'knitting' && '직선 바늘을 사용한 기본 뜨개질 기법들'}
            {selectedCategory === 'crochet' && '갈고리 바늘을 사용한 기본 뜨개질 기법들'}
            {selectedCategory === 'finishing' && '작품을 완성하는 마무리 기법들'}
          </Text>

          {getCurrentTechniques().map((technique, index) => {
            const difficultyColors = getDifficultyColor(technique.difficulty);
            
            return (
              <View key={index} style={styles.techniqueCard}>
                <View style={styles.techniqueHeader}>
                  <Text style={styles.techniqueName}>{technique.name}</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors.bg }]}>
                    <Text style={[styles.difficultyText, { color: difficultyColors.text }]}>
                      {technique.difficulty}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.techniqueDescription}>{technique.description}</Text>
                
                {/* Video Section */}
                {technique.videoUrl && (
                  <View style={styles.videoSection}>
                    <Text style={styles.videoTitle}>📹 영상으로 배우기</Text>
                    {technique.name === '코 만들기 (Cast On)' && (
                      <View style={styles.youtubeInfo}>
                        <Text style={styles.youtubeText}>🎬 YouTube 영상</Text>
                        <Text style={styles.youtubeChannel}>실제 뜨개질 강의</Text>
                      </View>
                    )}
                    <TouchableOpacity 
                      style={styles.videoContainer}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`${technique.name} 영상 보기`}
                      onPress={() => handleVideoPress(technique.videoUrl!, technique.name)}
                    >
                      <View style={styles.videoPlaceholder}>
                        <View style={styles.playButton}>
                          <Text style={styles.playButtonText}>▶️</Text>
                        </View>
                        <Text style={styles.videoSubtitle}>{technique.name}</Text>
                        <Text style={styles.videoDuration}>
                          {technique.name === '코 만들기 (Cast On)' ? '3:44' : '약 3-5분'}
                        </Text>
                        <View style={styles.playHint}>
                          <Text style={styles.playHintText}>탭하여 재생</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                
                <View style={styles.stepsSection}>
                  <Text style={styles.stepsTitle}>단계별 방법</Text>
                  {technique.steps.map((step, stepIndex) => (
                    <View key={stepIndex} style={styles.stepItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{stepIndex + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.tipSection}>
                  <Text style={styles.tipTitle}>💡 팁</Text>
                  <Text style={styles.tipText}>{technique.tips}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Practice Tips */}
        <View style={styles.practiceSection}>
          <Text style={styles.practiceTitleText}>📚 연습 가이드</Text>
          <View style={styles.practiceList}>
            <Text style={styles.practiceText}>• 처음에는 굵은 실과 큰 바늘로 연습하세요</Text>
            <Text style={styles.practiceText}>• 텐션(실의 장력)을 일정하게 유지하는 것이 중요해요</Text>
            <Text style={styles.practiceText}>• 매일 조금씩 연습하면 금세 늘어요</Text>
            <Text style={styles.practiceText}>• 틀려도 괜찮아요, 풀고 다시 해보세요</Text>
            <Text style={styles.practiceText}>• 영상을 보면서 따라하면 더 쉬워요</Text>
          </View>
        </View>
      </ScrollView>

      {/* YouTube Video Modal */}
      <Modal
        visible={showVideoModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeVideoModal}
      >
        <SafeAreaView style={styles.videoModalContainer}>
          <View style={styles.videoModalHeader}>
            <Text style={styles.videoModalTitle} numberOfLines={2}>
              {currentVideoTitle}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeVideoModal}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.videoPlayerContainer}>
            {currentVideoId ? (
              <YoutubePlayer
                height={220}
                width={screenWidth - 40}
                videoId={currentVideoId}
                play={true}
                onChangeState={(state) => {
                  console.log('YouTube player state:', state);
                }}
                onReady={() => {
                  console.log('YouTube player ready');
                }}
                onError={(error) => {
                  console.log('YouTube player error:', error);
                  Alert.alert('오류', '영상을 불러올 수 없습니다.');
                }}
              />
            ) : null}
          </View>

          <View style={styles.videoModalContent}>
            <Text style={styles.videoModalText}>
              🎯 이 영상을 통해 기법을 익혀보세요
            </Text>
            <Text style={styles.videoModalSubtext}>
              • 영상을 보면서 천천히 따라해보세요{'\n'}
              • 필요시 영상을 일시정지하며 연습하세요{'\n'}
              • 처음에는 어려워도 괜찮습니다
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
  content: {
    flex: 1,
  },
  section: {
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
  techniqueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  techniqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  techniqueName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    lineHeight: 28,
  },
  difficultyBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  techniqueDescription: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 16,
  },
  stepsSection: {
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B73FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 20,
    flex: 1,
  },
  tipSection: {
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: '#C2410C',
    lineHeight: 20,
  },
  practiceSection: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  practiceTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  practiceList: {
    gap: 8,
  },
  practiceText: {
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20,
  },
  videoSection: {
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  videoContainer: {
    marginBottom: 4,
  },
  videoPlaceholder: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    position: 'relative',
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: '#6B73FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  playButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  videoSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 4,
    textAlign: 'center',
  },
  videoDuration: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 16,
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
  youtubeInfo: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  youtubeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 2,
  },
  youtubeChannel: {
    fontSize: 11,
    color: '#991B1B',
  },
  videoModalContainer: {
    flex: 1,
    backgroundColor: '#FDF6E3',
  },
  videoModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  videoModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    marginRight: 16,
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
    fontSize: 18,
    color: '#4A5568',
    fontWeight: 'bold',
  },
  videoPlayerContainer: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoModalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  videoModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  videoModalSubtext: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    textAlign: 'left',
  },
});

export default BasicTechniquesScreen;