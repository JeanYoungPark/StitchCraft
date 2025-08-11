import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import YouTubeCreditCard from '../components/YouTubeCreditCard';
import {TechniqueWithCredit} from '../types/YouTubeCredit';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BasicTechniquesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<
    'knitting' | 'crochet' | 'finishing'
  >('knitting');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>('');

  // 기존 하드코딩된 데이터를 새로운 크레딧 시스템으로 교체
  // const knittingTechniques = knittingTechniquesWithCredits;

  // 기존 하드코딩된 데이터를 새로운 크레딧 시스템으로 교체
  // const crochetTechniques = crochetTechniquesWithCredits;

  // 기존 하드코딩된 데이터를 새로운 크레딧 시스템으로 교체
  // const finishingTechniques = finishingTechniquesWithCredits;

  const getCurrentTechniques = (): TechniqueWithCredit[] => {
    // 현재 YouTube 저작권 승인된 기법 데이터가 없음
    // 새로운 데이터가 추가되면 여기에 포함 예정
    switch (selectedCategory) {
      case 'knitting':
        return []; // 대바늘 기법 (추후 추가 예정)
      case 'crochet':
        return []; // 코바늘 기법 (추후 추가 예정)
      case 'finishing':
        return []; // 마무리 기법 (추후 추가 예정)
      default:
        return [];
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급':
        return {bg: '#F0FDF4', text: '#15803D'};
      case '중급':
        return {bg: '#FFFBF0', text: '#D97706'};
      case '고급':
        return {bg: '#FEF2F2', text: '#DC2626'};
      default:
        return {bg: '#F0FDF4', text: '#15803D'};
    }
  };

  const getYoutubeVideoId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const handleVideoPress = (technique: TechniqueWithCredit) => {
    if (!technique.youtubeCredit) {
      Alert.alert('알림', '이 기법에는 아직 영상이 준비되지 않았습니다.');
      return;
    }

    const videoId = getYoutubeVideoId(technique.youtubeCredit.videoUrl);

    if (videoId) {
      // 앱 내에서 재생
      setCurrentVideoId(videoId);
      setCurrentVideoTitle(technique.name);
      setShowVideoModal(true);
    } else {
      // 외부 링크로 재생 (fallback)
      Alert.alert(
        '영상 재생',
        `${technique.name} 영상을 유튜브에서 재생하시겠습니까?`,
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '재생',
            onPress: () => {
              Linking.openURL(technique.youtubeCredit!.videoUrl).catch(() => {
                Alert.alert('오류', '영상을 재생할 수 없습니다.');
              });
            },
          },
        ],
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
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← 돌아가기</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>기본 기법 모음</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'knitting' && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory('knitting')}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === 'knitting' && styles.activeTabText,
            ]}>
            대바늘
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'crochet' && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory('crochet')}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === 'crochet' && styles.activeTabText,
            ]}>
            코바늘
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'finishing' && styles.activeTab,
          ]}
          onPress={() => setSelectedCategory('finishing')}>
          <Text
            style={[
              styles.tabText,
              selectedCategory === 'finishing' && styles.activeTabText,
            ]}>
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
            {selectedCategory === 'knitting' &&
              '직선 바늘을 사용한 기본 뜨개질 기법들'}
            {selectedCategory === 'crochet' &&
              '갈고리 바늘을 사용한 기본 뜨개질 기법들'}
            {selectedCategory === 'finishing' &&
              '작품을 완성하는 마무리 기법들'}
          </Text>

          {getCurrentTechniques().map((technique, index) => {
            const difficultyColors = getDifficultyColor(technique.difficulty);

            return (
              <View key={index} style={styles.techniqueCard}>
                <View style={styles.techniqueHeader}>
                  <Text style={styles.techniqueName}>{technique.name}</Text>
                  <View
                    style={[
                      styles.difficultyBadge,
                      {backgroundColor: difficultyColors.bg},
                    ]}>
                    <Text
                      style={[
                        styles.difficultyText,
                        {color: difficultyColors.text},
                      ]}>
                      {technique.difficulty}
                    </Text>
                  </View>
                </View>

                <Text style={styles.techniqueDescription}>
                  {technique.description}
                </Text>

                {/* Video Section */}
                {technique.youtubeCredit && (
                  <View style={styles.videoSection}>
                    <Text style={styles.videoTitle}>📹 영상으로 배우기</Text>
                    <TouchableOpacity
                      style={styles.videoContainer}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`${technique.name} 영상 보기`}
                      onPress={() => handleVideoPress(technique)}>
                      <View style={styles.videoPlaceholder}>
                        <View style={styles.playButton}>
                          <Text style={styles.playButtonText}>▶️</Text>
                        </View>
                        <Text style={styles.videoSubtitle}>
                          {technique.name}
                        </Text>
                        <Text style={styles.videoDuration}>
                          {technique.youtubeCredit.duration || '약 3-5분'}
                        </Text>
                        <View style={styles.playHint}>
                          <Text style={styles.playHintText}>탭하여 재생</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* YouTube 저작권 정보 표시 */}
                    <YouTubeCreditCard
                      creditInfo={technique.youtubeCredit}
                      compact={true}
                    />
                  </View>
                )}

                <View style={styles.stepsSection}>
                  <Text style={styles.stepsTitle}>단계별 방법</Text>
                  {technique.steps.map((step, stepIndex) => (
                    <View key={stepIndex} style={styles.stepItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>
                          {stepIndex + 1}
                        </Text>
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
            <Text style={styles.practiceText}>
              • 처음에는 굵은 실과 큰 바늘로 연습하세요
            </Text>
            <Text style={styles.practiceText}>
              • 텐션(실의 장력)을 일정하게 유지하는 것이 중요해요
            </Text>
            <Text style={styles.practiceText}>
              • 매일 조금씩 연습하면 금세 늘어요
            </Text>
            <Text style={styles.practiceText}>
              • 틀려도 괜찮아요, 풀고 다시 해보세요
            </Text>
            <Text style={styles.practiceText}>
              • 영상을 보면서 따라하면 더 쉬워요
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* YouTube Video Modal */}
      <Modal
        visible={showVideoModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeVideoModal}>
        <SafeAreaView style={styles.videoModalContainer}>
          <View style={styles.videoModalHeader}>
            <Text style={styles.videoModalTitle} numberOfLines={2}>
              {currentVideoTitle}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeVideoModal}>
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
                onChangeState={state => {
                  console.log('YouTube player state:', state);
                }}
                onReady={() => {
                  console.log('YouTube player ready');
                }}
                onError={error => {
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
              • 영상을 보면서 천천히 따라해보세요{'\n'}• 필요시 영상을
              일시정지하며 연습하세요{'\n'}• 처음에는 어려워도 괜찮습니다
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
    shadowOffset: {width: 0, height: 2},
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
