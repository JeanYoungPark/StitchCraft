import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AdBanner from '../components/AdBanner';

const { height: screenHeight } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; // 앱 네비게이터에서 정의된 탭바 높이

const FirstKnittingScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNeedleType, setSelectedNeedleType] = useState<'crochet' | 'knitting' | null>(null);

  // 코바늘 가이드
  const crochetSteps = [
    {
      title: '1단계: 준비하기',
      emoji: '🧶',
      description: '코바늘 뜨개질을 시작하기 전에 필요한 도구와 재료를 알아봅시다.',
      content: [
        '🪝 코바늘 1개 준비 (초보자용 5-6mm 추천)',
        '🧶 면실 또는 아크릴실 준비 (두꺼운 실 추천)',
        '📏 코바늘 사이즈와 실 두께를 맞춰주세요',
        '✋ 편안한 자세로 앉으세요',
        '💡 충분한 조명을 확인하세요'
      ]
    },
    {
      title: '2단계: 슬립노트 만들기',
      emoji: '🔄',
      description: '코바늘의 기본이 되는 슬립노트를 만들어봅시다.',
      content: [
        '1️⃣ 털실 끝을 15cm 정도 남겨두세요',
        '2️⃣ 실로 고리를 만들고 코바늘을 통과시키세요',
        '3️⃣ 고리를 조여서 첫번째 슬립노트를 완성하세요',
        '4️⃣ 너무 조이지 않게 주의하세요',
        '✅ 이것이 모든 코바늘 작업의 시작점입니다'
      ]
    },
    {
      title: '3단계: 기본 사슬뜨기',
      emoji: '🔗',
      description: '코바늘의 기본 기법인 사슬뜨기를 배워봅시다!',
      content: [
        '🎯 코바늘을 오른손에 잡으세요',
        '⬆️ 사슬노트에 코바늘을 넣으세요',
        '🔄 실을 코바늘에 감아주세요',
        '⬇️ 새로운 고리를 뽑아내세요',
        '✨ 축하합니다! 첫 번째 사슬 완성!'
      ]
    }
  ];

  // 대바늘 가이드
  const knittingSteps = [
    {
      title: '1단계: 준비하기',
      emoji: '🧶',
      description: '대바늘 뜨개질을 시작하기 전에 필요한 도구와 재료를 알아봅시다.',
      content: [
        '🪡 대바늘 2개 준비 (초보자용 8-10mm 추천)',
        '🧶 면실 또는 아크릴실 준비 (두꺼운 실 추천)',
        '📏 바늘 굵기와 실 두께를 맞춰주세요',
        '✋ 편안한 자세로 앉으세요',
        '💡 충분한 조명을 확인하세요'
      ]
    },
    {
      title: '2단계: 코 만들기',
      emoji: '🔄',
      description: '대바늘 뜨개질의 첫 번째 단계인 코 만들기를 배워봅시다.',
      content: [
        '1️⃣ 털실 끝을 15cm 정도 남겨두세요',
        '2️⃣ 바늘에 털실을 걸어 고리를 만드세요',
        '3️⃣ 고리를 조여서 첫 번째 코를 완성하세요',
        '4️⃣ 같은 방식으로 10개의 코를 만드세요',
        '✅ 코들이 너무 조이지 않게 주의하세요'
      ]
    },
    {
      title: '3단계: 첫 번째 줄 뜨기',
      emoji: '🪡',
      description: '이제 실제로 대바늘 뜨개질을 시작해봅시다!',
      content: [
        '🎯 오른손에 빈 바늘을 잡으세요',
        '⬆️ 첫 번째 코에 바늘을 넣으세요',
        '🔄 털실을 바늘에 감아주세요',
        '⬇️ 새로운 고리를 빼내세요',
        '✨ 축하합니다! 첫 번째 뜨기 완성!'
      ]
    }
  ];

  const steps = selectedNeedleType === 'crochet' ? crochetSteps : knittingSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // AsyncStorage 기능 임시 비활성화
    // try {
    //   // 완료 상태를 AsyncStorage에 저장
    //   const completionData = {
    //     completed: true,
    //     completedAt: new Date().toISOString(),
    //     needleType: selectedNeedleType,
    //   };
    //   await AsyncStorage.setItem('firstKnittingCompleted', JSON.stringify(completionData));
    //   console.log('첫 번째 뜨개질 완료 상태 저장됨:', completionData);
    // } catch (error) {
    //   console.error('완료 상태 저장 실패:', error);
    // }
    navigation.goBack();
  };

  const handleNeedleSelection = (type: 'crochet' | 'knitting') => {
    setSelectedNeedleType(type);
    setCurrentStep(0);
  };

  // 바늘 선택 화면
  if (!selectedNeedleType) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← 돌아가기</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>뜨개질 방법 선택</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>

        <ScrollView 
          style={[styles.content, { flex: 1 }]} // flex: 1 추가로 스크롤 공간 확보
          contentContainerStyle={[styles.selectionScrollContent, {
            paddingBottom: TAB_BAR_HEIGHT + 20, // 탭바 높이 + 여백
            flexGrow: 1 // 콘텐츠가 화면을 채우도록
          }]}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.selectionHeader}>
            <Text style={styles.selectionTitle}>어떤 뜨개질을 배우고 싶나요?</Text>
            <Text style={styles.selectionSubtitle}>
              바늘 종류에 따라 뜨개질 방법이 달라요
            </Text>
          </View>

          <View style={styles.needleOptions}>
            <TouchableOpacity 
              style={styles.needleOption}
              onPress={() => handleNeedleSelection('knitting')}
              activeOpacity={0.8}
            >
              <View style={styles.needleIcon}>
                <Text style={styles.needleEmoji}>🪡</Text>
              </View>
              <Text style={styles.needleTitle}>대바늘 뜨개질</Text>
              <Text style={styles.needleDescription}>
                직선 바늘 2개를 사용하는 전통적인 뜨개질
              </Text>
              <View style={styles.needleFeatures}>
                <Text style={styles.featureText}>• 스카프, 목도리, 스웨터 만들기</Text>
                <Text style={styles.featureText}>• 평면적인 뜨개 작품</Text>
                <Text style={styles.featureText}>• 초보자에게 추천</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.needleOption}
              onPress={() => handleNeedleSelection('crochet')}
              activeOpacity={0.8}
            >
              <View style={styles.needleIcon}>
                <Text style={styles.needleEmoji}>🪝</Text>
              </View>
              <Text style={styles.needleTitle}>코바늘 뜨개질</Text>
              <Text style={styles.needleDescription}>
                갈고리 모양 바늘 1개를 사용하는 뜨개질
              </Text>
              <View style={styles.needleFeatures}>
                <Text style={styles.featureText}>• 가방, 모자, 인형 만들기</Text>
                <Text style={styles.featureText}>• 입체적인 뜨개 작품</Text>
                <Text style={styles.featureText}>• 빠른 진행 속도</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>💡 처음이라 잘 모르겠다면?</Text>
            <Text style={styles.helpText}>
              대바늘은 더 안정적이고 실수를 고치기 쉬워서 초보자에게 추천해요!
            </Text>
          </View>
        </ScrollView>
        
        {/* 하단 배너 광고 */}
        <AdBanner />
      </View>
    );
  }

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedNeedleType(null)}
          >
            <Text style={styles.backButtonText}>← 선택으로</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {selectedNeedleType === 'crochet' ? '코바늘 뜨개질' : '대바늘 뜨개질'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Enhanced Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            {steps.map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <View style={[
                  styles.progressDot,
                  index === currentStep && styles.currentProgressDot,
                  index < currentStep && styles.completedProgressDot
                ]}>
                  {index < currentStep && (
                    <Text style={styles.completedIcon}>✓</Text>
                  )}
                  {index === currentStep && (
                    <Text style={styles.currentStepNumber}>{index + 1}</Text>
                  )}
                  {index > currentStep && (
                    <Text style={styles.pendingStepNumber}>{index + 1}</Text>
                  )}
                </View>
                <Text style={[
                  styles.stepLabel,
                  index === currentStep && styles.currentStepLabel,
                  index < currentStep && styles.completedStepLabel
                ]}>
                  {step.title.split(':')[0]}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarTrack}>
              <View style={[
                styles.progressBarFill,
                { width: `${(currentStep / (steps.length - 1)) * 100}%` }
              ]} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, {
          paddingBottom: 120 // 버튼컨테이너 공간 확보
        }]}
        showsVerticalScrollIndicator={false}
        bounces={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step Header */}
        <View style={styles.stepHeader}>
          <Text style={styles.stepEmoji}>{currentStepData.emoji}</Text>
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepDescription}>{currentStepData.description}</Text>
        </View>

        {/* Visual Learning Section */}
        <View style={styles.visualSection}>
          <Text style={styles.visualSectionTitle}>📷 시각 자료</Text>
          
          {/* Main Tutorial Video Placeholder - 1단계가 아닐 때만 표시 */}
          {currentStep !== 0 && (
            <TouchableOpacity 
              style={styles.videoPlaceholder}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="동영상 가이드 재생"
              accessibilityHint="단계별 상세 영상을 시청할 수 있습니다"
            >
              <View style={styles.placeholderIcon}>
                <Text style={styles.placeholderIconText}>▶️</Text>
              </View>
              <Text style={styles.placeholderText}>동영상 가이드</Text>
              <Text style={styles.placeholderSubtext}>단계별 상세 영상</Text>
              <View style={styles.playHint}>
                <Text style={styles.playHintText}>탭하여 재생</Text>
              </View>
            </TouchableOpacity>
          )}
          
          {/* Step Images Grid */}
          <View style={styles.imagesGrid}>
            {currentStep === 0 ? (
              // 1단계: 도구와 재료 이미지
              <>
                <TouchableOpacity 
                  style={styles.imagePlaceholder}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={selectedNeedleType === 'crochet' ? '코바늘 이미지 보기' : '대바늘 이미지 보기'}
                >
                  <Text style={styles.imageIconText}>🖼️</Text>
                  <Text style={styles.imageText}>
                    {selectedNeedleType === 'crochet' ? '코바늘' : '대바늘'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.imagePlaceholder}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="뜨개실 이미지 보기"
                >
                  <Text style={styles.imageIconText}>🖼️</Text>
                  <Text style={styles.imageText}>뜨개실</Text>
                </TouchableOpacity>
              </>
            ) : (
              // 2-3단계: 기본 자세와 도구 준비 이미지
              <>
                <TouchableOpacity 
                  style={styles.imagePlaceholder}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="기본 자세 이미지 보기"
                >
                  <Text style={styles.imageIconText}>🖼️</Text>
                  <Text style={styles.imageText}>기본 자세</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.imagePlaceholder}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="단계별 과정 이미지 보기"
                >
                  <Text style={styles.imageIconText}>🖼️</Text>
                  <Text style={styles.imageText}>단계별 과정</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Interactive Step Content */}
        <View style={styles.stepContent}>
          <Text style={styles.contentSectionTitle}>📝 단계별 가이드</Text>
          {currentStepData.content.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.contentItem}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`단계 ${index + 1}: ${item}`}
              accessibilityHint="탭하여 자세히 보기"
            >
              <View style={styles.contentRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.contentText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Tips Section */}
        <View style={styles.quickTipsSection}>
          <Text style={styles.quickTipsTitle}>⚡ 빠른 팁</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipEmoji}>👍</Text>
            <Text style={styles.tipText}>
              {selectedNeedleType === 'crochet' && currentStep === 0 && '코바늘은 갈고리 모양 바늘 1개, 대바늘은 직선형 바늘 2개입니다. 이 가이드는 코바늘용이에요!'}
              {selectedNeedleType === 'knitting' && currentStep === 0 && '대바늘은 직선형 바늘 2개, 코바늘은 갈고리 모양 바늘 1개입니다. 이 가이드는 대바늘용이에요!'}
              {currentStep === 1 && '코가 너무 조이면 다음 단계가 어려워지니 주의하세요'}
              {currentStep === 2 && '처음에는 속도보다 정확도가 중요해요'}
            </Text>
          </View>
        </View>

        {/* Encouragement Message */}
        <View style={styles.encouragementBox}>
          {currentStep === 0 && (
            <Text style={styles.encouragementText}>
              걱정하지 마세요! 천천히 따라하면 누구나 할 수 있어요 😊
            </Text>
          )}
          {currentStep === 1 && (
            <Text style={styles.encouragementText}>
              처음에는 어려울 수 있어요. 몇 번 연습해보세요! 💪
            </Text>
          )}
          {currentStep === 2 && (
            <Text style={styles.encouragementText}>
              와! 벌써 뜨개질을 할 수 있게 되었어요! 🎉
            </Text>
          )}
        </View>
      </ScrollView>

      {/* 하단 배너 광고 */}
      <AdBanner />

      {/* Enhanced Navigation Buttons - 절대 위치 고정 */}
      <View style={[styles.buttonContainer, {
        bottom: TAB_BAR_HEIGHT // 탭바 바로 위에 위치 (SafeArea는 탭바가 처리)
      }]}>
        <TouchableOpacity
          style={[
            styles.button, 
            styles.secondaryButton,
            currentStep === 0 && styles.disabledButton
          ]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
          activeOpacity={currentStep === 0 ? 1 : 0.7}
        >
          <Text style={[
            styles.buttonText,
            styles.secondaryButtonText,
            currentStep === 0 && styles.disabledButtonText
          ]}>
            ← 이전 단계
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={isLastStep ? handleFinish : handleNext}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            {isLastStep ? '완료하기 🎉' : '다음 단계 →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3',
  },
  safeArea: {
    flex: 0, // SafeAreaView는 최소 크기만 차지
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
  progressContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  progressTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  currentProgressDot: {
    backgroundColor: '#6B73FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#6B73FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  completedProgressDot: {
    backgroundColor: '#52C41A',
  },
  completedIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  currentStepNumber: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pendingStepNumber: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  stepLabel: {
    fontSize: 11,
    color: '#718096',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
  },
  currentStepLabel: {
    color: '#6B73FF',
    fontWeight: 'bold',
  },
  completedStepLabel: {
    color: '#52C41A',
    fontWeight: '600',
  },
  progressBarContainer: {
    alignItems: 'center',
  },
  progressBarTrack: {
    width: '100%',
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6B73FF',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    backgroundColor: '#FDF6E3',
  },
  scrollContent: {
    padding: 16,
    // paddingBottom은 동적으로 계산됨
  },
  selectionScrollContent: {
    padding: 16,
    // paddingBottom은 동적으로 계산됨
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  stepDescription: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepContent: {
    marginBottom: 20,
  },
  contentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6B73FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    fontWeight: '500',
    flex: 1,
  },
  quickTipsSection: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  quickTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 12,
    lineHeight: 22,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#C2410C',
    lineHeight: 20,
    fontWeight: '500',
    flex: 1,
  },
  encouragementBox: {
    backgroundColor: '#9CAF88',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  encouragementText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  visualSection: {
    marginBottom: 20,
  },
  visualSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    lineHeight: 26,
  },
  videoPlaceholder: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 120,
    justifyContent: 'center',
    position: 'relative',
  },
  playHint: {
    position: 'absolute',
    bottom: 8,
    right: 12,
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
  placeholderIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#6B73FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderIconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 4,
    lineHeight: 22,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  imagesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  imageIconText: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  contentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    lineHeight: 26,
  },
  buttonContainer: {
    position: 'absolute', // 절대 위치로 고정
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    // bottom은 동적으로 계산됨
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  primaryButton: {
    backgroundColor: '#6B73FF',
  },
  secondaryButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#4A5568',
  },
  disabledButtonText: {
    color: '#A0ADB8',
  },
  disabledButton: {
    opacity: 0.5,
  },
  // 바늘 선택 화면 스타일
  selectionHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  selectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  selectionSubtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  needleOptions: {
    gap: 16,
    marginBottom: 24,
  },
  needleOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  needleIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  needleEmoji: {
    fontSize: 48,
  },
  needleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  needleDescription: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  needleFeatures: {
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  helpSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0369A1',
    marginBottom: 8,
    lineHeight: 22,
  },
  helpText: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },
  // 숨겨진 버튼 컨테이너 - 정확한 높이 맞춤용
  hiddenButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    opacity: 0, // 완전히 투명
    pointerEvents: 'none', // 터치 이벤트 차단
  },
});

export default FirstKnittingScreen;