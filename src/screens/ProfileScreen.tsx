import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface UserSettings {
  measurementUnit: 'metric' | 'imperial';
}

interface UserProfile {
  name: string;
  level: string;
  avatar: string;
}

const ProfileScreen: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    measurementUnit: 'metric',
  });

  const [profile, setProfile] = useState<UserProfile>({
    name: '뜨개질 초보자',
    level: 'Level 2 - 열정적인 뜨개꾼',
    avatar: '🧶'
  });

  const handleNameChange = () => {
    Alert.alert(
      "이름 변경",
      "새로운 이름을 선택해주세요",
      [
        { text: "취소", style: "cancel" },
        { text: "뜨개질 초보자", onPress: () => setProfile(prev => ({ ...prev, name: '뜨개질 초보자' })) },
        { text: "뜨개질 애호가", onPress: () => setProfile(prev => ({ ...prev, name: '뜨개질 애호가' })) },
        { text: "뜨개질 마스터", onPress: () => setProfile(prev => ({ ...prev, name: '뜨개질 마스터' })) }
      ]
    );
  };

  const handleLevelChange = () => {
    Alert.alert(
      "레벨 변경",
      "현재 레벨을 선택해주세요",
      [
        { text: "취소", style: "cancel" },
        { text: "Level 1 - 뜨개질 입문자", onPress: () => setProfile(prev => ({ ...prev, level: 'Level 1 - 뜨개질 입문자' })) },
        { text: "Level 2 - 열정적인 뜨개꾼", onPress: () => setProfile(prev => ({ ...prev, level: 'Level 2 - 열정적인 뜨개꾼' })) },
        { text: "Level 3 - 숙련된 뜨개꾼", onPress: () => setProfile(prev => ({ ...prev, level: 'Level 3 - 숙련된 뜨개꾼' })) },
        { text: "Level 4 - 뜨개질 전문가", onPress: () => setProfile(prev => ({ ...prev, level: 'Level 4 - 뜨개질 전문가' })) }
      ]
    );
  };

  const handleAvatarChange = () => {
    Alert.alert(
      "아바타 변경",
      "새로운 아바타를 선택해주세요",
      [
        { text: "취소", style: "cancel" },
        { text: "🧶", onPress: () => setProfile(prev => ({ ...prev, avatar: '🧶' })) },
        { text: "🧵", onPress: () => setProfile(prev => ({ ...prev, avatar: '🧵' })) },
        { text: "✂️", onPress: () => setProfile(prev => ({ ...prev, avatar: '✂️' })) },
        { text: "🪡", onPress: () => setProfile(prev => ({ ...prev, avatar: '🪡' })) }
      ]
    );
  };

  const handleMeasurementUnitChange = () => {
    Alert.alert(
      "측정 단위 변경",
      "측정 단위를 선택해주세요",
      [
        { text: "취소", style: "cancel" },
        { 
          text: "미터법 (cm, mm)", 
          onPress: () => setSettings(prev => ({ ...prev, measurementUnit: 'metric' }))
        },
        { 
          text: "야드파운드법 (inch)", 
          onPress: () => setSettings(prev => ({ ...prev, measurementUnit: 'imperial' }))
        }
      ]
    );
  };

  const handleContact = () => {
    Alert.alert(
      "문의하기",
      "개발자에게 문의사항이나 제안을 보내시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "문의하기", onPress: () => console.log("문의하기 기능") }
      ]
    );
  };

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
            activeOpacity={0.7}
          >
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
              activeOpacity={0.7}
            >
              <Text style={styles.userName}>{profile.name}</Text>
              <Text style={styles.editHint}>이름 변경</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.editableField}
              onPress={handleLevelChange}
              activeOpacity={0.7}
            >
              <Text style={styles.userLevel}>{profile.level}</Text>
              <Text style={styles.editHint}>레벨 변경</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={handleMeasurementUnitChange}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>📏</Text>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>측정 단위</Text>
                <Text style={styles.menuDescription}>
                  {settings.measurementUnit === 'metric' ? '미터법 (cm, mm)' : '야드파운드법 (inch)'}
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
        </View>

        {/* 앱 정보 */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>StitchCraft v1.0.0</Text>
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
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#6B73FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F7FAFC',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  },
});

export default ProfileScreen;