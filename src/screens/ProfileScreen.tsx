import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {databaseManager, UserProfile} from '../database/DatabaseManager';

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [databaseVersion, setDatabaseVersion] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [userProfile, dbVersion] = await Promise.all([
        databaseManager.getUserProfile(),
        databaseManager.getSetting('pattern_data_version'),
      ]);
      setProfile(userProfile);
      setDatabaseVersion(dbVersion || '없음');
    } catch (error) {
      console.error('프로필 로드 실패:', error);
      Alert.alert('오류', '프로필을 불러오는데 실패했습니다.');
      setDatabaseVersion('오류');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = () => {
    Alert.alert('이름 변경', '새로운 이름을 선택해주세요', [
      {text: '취소', style: 'cancel'},
      {
        text: '뜨개질 초보자',
        onPress: () => updateProfile({name: '뜨개질 초보자'}),
      },
      {
        text: '뜨개질 애호가',
        onPress: () => updateProfile({name: '뜨개질 애호가'}),
      },
      {
        text: '뜨개질 마스터',
        onPress: () => updateProfile({name: '뜨개질 마스터'}),
      },
    ]);
  };

  const handleLevelChange = () => {
    Alert.alert('레벨 변경', '현재 레벨을 선택해주세요', [
      {text: '취소', style: 'cancel'},
      {
        text: 'Level 1 - 뜨개질 입문자',
        onPress: () => updateProfile({level: 'Level 1 - 뜨개질 입문자'}),
      },
      {
        text: 'Level 2 - 열정적인 뜨개꾼',
        onPress: () => updateProfile({level: 'Level 2 - 열정적인 뜨개꾼'}),
      },
      {
        text: 'Level 3 - 숙련된 뜨개꾼',
        onPress: () => updateProfile({level: 'Level 3 - 숙련된 뜨개꾼'}),
      },
      {
        text: 'Level 4 - 뜨개질 전문가',
        onPress: () => updateProfile({level: 'Level 4 - 뜨개질 전문가'}),
      },
    ]);
  };

  const handleAvatarChange = () => {
    Alert.alert('아바타 변경', '새로운 아바타를 선택해주세요', [
      {text: '취소', style: 'cancel'},
      {text: '🧶', onPress: () => updateProfile({avatar: '🧶'})},
      {text: '🧵', onPress: () => updateProfile({avatar: '🧵'})},
      {text: '✂️', onPress: () => updateProfile({avatar: '✂️'})},
      {text: '🪡', onPress: () => updateProfile({avatar: '🪡'})},
    ]);
  };

  const handleMeasurementUnitChange = () => {
    Alert.alert('측정 단위 변경', '측정 단위를 선택해주세요', [
      {text: '취소', style: 'cancel'},
      {
        text: '미터법 (cm, mm)',
        onPress: () => updateProfile({measurementUnit: 'metric'}),
      },
      {
        text: '야드파운드법 (inch)',
        onPress: () => updateProfile({measurementUnit: 'imperial'}),
      },
    ]);
  };

  const handleContact = () => {
    Alert.alert('문의하기', '개발자에게 문의사항이나 제안을 보내시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {text: '문의하기', onPress: () => console.log('문의하기 기능')},
    ]);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      await databaseManager.updateUserProfile(updates);

      // 로컬 상태 업데이트
      setProfile(prev => (prev ? {...prev, ...updates} : null));

      Alert.alert('완료', '프로필이 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      Alert.alert('오류', '프로필 업데이트에 실패했습니다.');
    }
  };

  // 패턴 업데이트 함수
  const handlePatternUpdate = async () => {
    try {
      setUpdating(true);
      console.log('🔄 패턴 데이터 업데이트 시작...');
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
    } finally {
      setUpdating(false);
    }
  };

  // 개발/테스트용 데이터 초기화 함수
  const handleResetData = () => {
    Alert.alert(
      '데이터 초기화',
      '모든 데이터가 초기화됩니다. 정말 진행하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '초기화',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseManager.clearAllData();
              await loadProfile();
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
          <Text style={styles.loadingText}>프로필을 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>프로필을 불러올 수 없습니다</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 프로필 헤더 */}
        <View style={styles.profileHeader}>
          <Text style={styles.headerTitle}>내 프로필</Text>
          <Text style={styles.headerSubtitle}>탭하여 편집하세요</Text>
        </View>

        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleAvatarChange}
            activeOpacity={0.7}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.avatar}</Text>
            </View>
            <View style={styles.editIcon}>
              <Text style={styles.editIconText}>✏️</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <TouchableOpacity
              style={styles.editableField}
              onPress={handleNameChange}
              activeOpacity={0.7}>
              <Text style={styles.userName}>{profile.name}</Text>
              <Text style={styles.editHint}>이름 변경</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editableField}
              onPress={handleLevelChange}
              activeOpacity={0.7}>
              <Text style={styles.userLevel}>{profile.level}</Text>
              <Text style={styles.editHint}>레벨 변경</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={[styles.menuItem, updating && styles.disabledMenuItem]}
            onPress={handlePatternUpdate}
            disabled={updating}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>📝</Text>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>패턴 업데이트</Text>
                <Text style={styles.menuDescription}>
                  {updating ? '업데이트 중...' : '새로운 패턴 확인하기'}
                </Text>
              </View>
            </View>
            {updating ? (
              <ActivityIndicator size="small" color="#6B73FF" />
            ) : (
              <Text style={styles.menuArrow}>›</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleMeasurementUnitChange}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>📏</Text>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>측정 단위</Text>
                <Text style={styles.menuDescription}>
                  {profile.measurementUnit === 'metric'
                    ? '미터법 (cm, mm)'
                    : '야드파운드법 (inch)'}
                </Text>
              </View>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleContact}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>💬</Text>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>문의하기</Text>
                <Text style={styles.menuDescription}>버그 신고 및 제안</Text>
              </View>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          {/* 개발/테스트용 데이터 초기화 버튼 */}
          {__DEV__ && (
            <TouchableOpacity style={styles.menuItem} onPress={handleResetData}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>🔄</Text>
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
          <Text style={styles.dbInfo}>SQLite 연동</Text>
          <Text style={styles.dbVersionInfo}>
            패턴 DB 버전: {databaseVersion || '로딩중...'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3',
    paddingBottom: 60, // Tab bar height
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: '#6B73FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  profileHeader: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
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
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 20,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#6B73FF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F7FAFC',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6B73FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#6B73FF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 48,
  },
  editIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: '#6B73FF',
  },
  editIconText: {
    fontSize: 14,
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  editableField: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    textAlign: 'center',
  },
  userLevel: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 4,
    textAlign: 'center',
  },
  editHint: {
    fontSize: 12,
    color: '#6B73FF',
    fontWeight: '500',
    opacity: 0.8,
  },
  menuSection: {
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
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
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
    marginBottom: 8,
  },
  dbInfo: {
    fontSize: 12,
    color: '#6B73FF',
    fontWeight: '500',
  },
  dbVersionInfo: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default ProfileScreen;
