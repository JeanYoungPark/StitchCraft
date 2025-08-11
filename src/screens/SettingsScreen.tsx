import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {databaseManager} from '../database/DatabaseManager';
import {SettingsStackParamList} from '../navigation/AppNavigator';
import AdBanner from '../components/AdBanner';

type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'SettingsMain'
>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [databaseVersion, setDatabaseVersion] = useState<string>('');

  // 스크롤을 맨 위로 이동하는 함수
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  }, []);

  // 탭 이벤트 리스너 등록 - Settings 탭 클릭 시 항상 스크롤을 맨 위로
  useEffect(() => {
    const unsubscribe = navigation.getParent()?.addListener('tabPress', e => {
      // Settings 탭이 클릭되면 항상 스크롤을 맨 위로 이동
      if (e.target?.includes('Settings')) {
        // 약간의 지연을 두어 네비게이션이 완료된 후 스크롤
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }
    });
    return unsubscribe;
  }, [navigation, scrollToTop]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // 데이터베이스 버전 로드
      const dbVersion = await databaseManager.getSetting(
        'pattern_data_version',
      );
      setDatabaseVersion(dbVersion || '없음');
    } catch (error) {
      console.error('설정 로드 실패:', error);
      Alert.alert('오류', '설정을 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  const handleContact = () => {
    navigation.navigate('Contact');
  };

  const handleViewBookmarks = () => {
    navigation.navigate('Bookmarks');
  };

  // 패턴 업데이트 함수
  const handlePatternUpdate = async () => {
    try {
      setUpdating(true);
      console.log('패턴 데이터 업데이트 시작...');
      await databaseManager.forceUpdatePatterns();

      // 데이터베이스 버전 다시 로드
      const dbVersion = await databaseManager.getSetting(
        'pattern_data_version',
      );
      setDatabaseVersion(dbVersion || '없음');

      Alert.alert(
        '완료',
        '새로운 패턴이 업데이트되었습니다! 패턴 탭에서 확인해보세요.',
      );
    } catch (error) {
      console.error('패턴 업데이트 실패:', error);
      Alert.alert('오류', '패턴 업데이트에 실패했습니다.');
    }
    setUpdating(false);
  };

  // 개발/테스트용 데이터 초기화 함수
  const handleResetData = () => {
    Alert.alert(
      '데이터 초기화',
      '모든 북마크와 설정이 초기화됩니다. 정말 진행하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '초기화',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseManager.clearAllData();
              // TODO: AsyncStorage 연결 후 활성화
              // await AsyncStorage.removeItem('hasVisitedHome');
              await loadSettings();
              Alert.alert('완료', '데이터가 초기화되었습니다.');
            } catch (error) {
              console.error('데이터 초기화 실패:', error);
              Alert.alert('오류', '데이터 초기화에 실패했습니다.');
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6B73FF" />
          <Text style={styles.loadingText}>설정을 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.content}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>설정</Text>
          <Text style={styles.headerSubtitle}>앱 설정 및 북마크 관리</Text>
        </View>

        {/* 북마크 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>북마크</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleViewBookmarks}>
            <View style={styles.menuLeft}>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>내 북마크</Text>
                <Text style={styles.menuDescription}>
                  저장한 패턴과 튜토리얼
                </Text>
              </View>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 설정 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 설정</Text>

          <TouchableOpacity
            style={[
              styles.menuItem,
              updating === true && styles.disabledMenuItem,
            ]}
            onPress={handlePatternUpdate}
            disabled={updating === true}>
            <View style={styles.menuLeft}>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>패턴 업데이트</Text>
                <Text style={styles.menuDescription}>
                  {updating === true
                    ? '업데이트 중...'
                    : '새로운 패턴 확인하기'}
                </Text>
              </View>
            </View>
            {updating === true ? (
              <ActivityIndicator size="small" color="#6B73FF" />
            ) : (
              <Text style={styles.menuArrow}>›</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleContact}>
            <View style={styles.menuLeft}>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>문의하기</Text>
                <Text style={styles.menuDescription}>버그 신고 및 제안</Text>
              </View>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          {/* 개발/테스트용 데이터 초기화 버튼 */}
          {__DEV__ === true && (
            <TouchableOpacity style={styles.menuItem} onPress={handleResetData}>
              <View style={styles.menuLeft}>
                <View style={styles.menuText}>
                  <Text style={[styles.menuTitle, styles.dangerText]}>
                    데이터 초기화
                  </Text>
                  <Text style={styles.menuDescription}>개발/테스트용</Text>
                </View>
              </View>
              <Text style={[styles.menuArrow, styles.dangerText]}>›</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 앱 정보 */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>StitchCraft v1.0.0</Text>
          <Text style={styles.dataInfo}>
            북마크는 기기에 저장되며, 앱 삭제 시 함께 제거됩니다
          </Text>
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
  content: {
    flex: 1,
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F7FAFC',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#F7FAFC',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
    marginBottom: 3,
  },
  menuDescription: {
    fontSize: 14,
    color: '#718096',
  },
  menuArrow: {
    fontSize: 18,
    color: '#6B73FF',
    fontWeight: 'bold',
  },
  dangerText: {
    color: '#DC2626',
  },
  disabledMenuItem: {
    opacity: 0.6,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 'auto',
  },
  appVersion: {
    fontSize: 14,
    color: '#A0ADB8',
    fontWeight: '500',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
  },
  dataInfo: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    maxWidth: 300,
  },
});

export default SettingsScreen;
