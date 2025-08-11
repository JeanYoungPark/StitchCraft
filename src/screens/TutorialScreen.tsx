import React, {useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TutorialScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  // 스크롤을 맨 위로 이동하는 함수
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  }, []);

  // 탭 이벤트 리스너 등록 - Tutorial 탭 클릭 시 항상 스크롤을 맨 위로
  useEffect(() => {
    const unsubscribe = navigation.getParent()?.addListener('tabPress', e => {
      // Tutorial 탭이 클릭되면 항상 스크롤을 맨 위로 이동
      if (e.target?.includes('Tutorial')) {
        // 약간의 지연을 두어 네비게이션이 완료된 후 스크롤
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }
    });
    return unsubscribe;
  }, [navigation, scrollToTop]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>뜨개질 배우기</Text>
          <Text style={styles.subtitle}>기초부터 차근차근 배워보세요</Text>
        </View>

        {/* Main Tutorial Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 과정</Text>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('FirstKnitting')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>🧶</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>첫 번째 뜨개질</Text>
                  <Text style={styles.cardSubtitle}>
                    3단계로 시작하는 기본 뜨기
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('YarnGuide')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>🧵</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>실 종류 가이드</Text>
                  <Text style={styles.cardSubtitle}>
                    면실, 모직실, 아크릴실 종류와 특징
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('NeedleGuide')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>🪡</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>바늘 종류 가이드</Text>
                  <Text style={styles.cardSubtitle}>
                    대바늘, 코바늘, 원형바늘 종류와 용도
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('BasicTechniques')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>📐</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>기본 기법 모음</Text>
                  <Text style={styles.cardSubtitle}>
                    코 만들기, 메리야스뜨기, 안뜨기 등
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>도움 자료</Text>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('KnittingDictionary')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>📖</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>뜨개질 용어 사전</Text>
                  <Text style={styles.cardSubtitle}>
                    한국어-영어 뜨개질 용어 모음
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('KnittingTips')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>💡</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>뜨개질 팁 모음</Text>
                  <Text style={styles.cardSubtitle}>
                    실수하기 쉬운 부분과 해결 방법
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('FAQ')}>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>❓</Text>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>자주 묻는 질문</Text>
                  <Text style={styles.cardSubtitle}>
                    초보자가 궁금해하는 질문들
                  </Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
    lineHeight: 28,
  },
  section: {
    marginBottom: 25,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
    lineHeight: 20,
  },
  arrow: {
    fontSize: 20,
    color: '#A0ADB8',
    fontWeight: 'bold',
  },
});

export default TutorialScreen;
