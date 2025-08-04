import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Navigation types
type ContactScreenNavigationProp = StackNavigationProp<any>;

const ContactScreen: React.FC = () => {
  const navigation = useNavigation<ContactScreenNavigationProp>();
  const [selectedType, setSelectedType] = useState<'bug' | 'suggestion' | 'question' | ''>('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const contactTypes = [
    { id: 'bug', title: '버그 신고', description: '앱에서 발생한 오류나 문제점' },
    { id: 'suggestion', title: '기능 제안', description: '새로운 기능이나 개선 아이디어' },
    { id: 'question', title: '사용 문의', description: '앱 사용법에 대한 질문' },
  ];

  const handleTypeSelect = (type: 'bug' | 'suggestion' | 'question') => {
    setSelectedType(type);
  };

  const handleSubmit = async () => {
    // 입력 검증
    if (!selectedType) {
      Alert.alert('알림', '문의 유형을 선택해주세요.');
      return;
    }
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }

    try {
      // 이메일 앱을 통한 문의 전송
      const selectedTypeInfo = getSelectedTypeInfo();
      const subject = encodeURIComponent(`[StitchCraft] ${selectedTypeInfo?.title}: ${title.trim()}`);
      const body = encodeURIComponent(`
문의 유형: ${selectedTypeInfo?.title}
제목: ${title.trim()}

내용:
${message.trim()}

${email.trim() ? `연락처: ${email.trim()}` : '연락처: 없음'}

---
앱 정보: StitchCraft v1.0.0
전송 시간: ${new Date().toLocaleString('ko-KR')}
      `);
      
      // TODO: 실제 사용할 이메일 주소로 변경 필요
      const emailUrl = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
      
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
        
        // 이메일 앱이 열린 후 폼 초기화
        setTimeout(() => {
          Alert.alert(
            '이메일 앱으로 이동',
            '이메일 앱에서 문의를 전송해주세요.\n소중한 의견 감사합니다!',
            [
              {
                text: '확인',
                onPress: () => {
                  // 폼 초기화
                  setSelectedType('');
                  setTitle('');
                  setMessage('');
                  setEmail('');
                  navigation.goBack();
                }
              }
            ]
          );
        }, 500);
      } else {
        Alert.alert(
          '이메일 앱 없음',
          '기기에 설정된 이메일 앱이 없습니다.\n다음 정보를 직접 이메일로 보내주세요:\n\nyour-email@example.com',
          [
            { text: '확인' }
          ]
        );
      }
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      Alert.alert('오류', '이메일 앱을 열 수 없습니다.');
    }
  };

  const getSelectedTypeInfo = () => {
    return contactTypes.find(type => type.id === selectedType);
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
        <Text style={styles.headerTitle}>문의하기</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 안내 메시지 */}
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>안녕하세요!</Text>
            <Text style={styles.introText}>
              StitchCraft를 이용해주셔서 감사합니다.{'\n'}
              궁금한 점이나 개선사항이 있으시면 언제든 말씀해주세요.
            </Text>
          </View>

          {/* 문의 유형 선택 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>문의 유형</Text>
            <View style={styles.typeGrid}>
              {contactTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    selectedType === type.id && styles.selectedTypeCard
                  ]}
                  onPress={() => handleTypeSelect(type.id as 'bug' | 'suggestion' | 'question')}
                >
                  <Text style={[
                    styles.typeTitle,
                    selectedType === type.id && styles.selectedTypeTitle
                  ]}>
                    {type.title}
                  </Text>
                  <Text style={[
                    styles.typeDescription,
                    selectedType === type.id && styles.selectedTypeDescription
                  ]}>
                    {type.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 제목 입력 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>제목</Text>
            <TextInput
              style={styles.titleInput}
              placeholder={selectedType ? 
                `${getSelectedTypeInfo()?.title} 제목을 입력해주세요` : 
                '문의 제목을 입력해주세요'
              }
              placeholderTextColor="#A0ADB8"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>

          {/* 내용 입력 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>내용</Text>
            <TextInput
              style={styles.messageInput}
              placeholder={selectedType === 'bug' ? 
                '발생한 문제와 상황을 자세히 설명해주세요.\n예: 언제, 어떤 동작에서 문제가 발생했는지' :
                selectedType === 'suggestion' ?
                '어떤 기능이 있으면 좋을지 자세히 설명해주세요.\n예: 사용 시나리오, 기대 효과 등' :
                selectedType === 'question' ?
                '앱 사용법에 대해 궁금한 점을 자세히 설명해주세요.\n예: 어떤 기능을 어떻게 사용하는지' :
                '문의 내용을 자세히 작성해주세요'
              }
              placeholderTextColor="#A0ADB8"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.charCount}>{message.length}/1000</Text>
          </View>

          {/* 이메일 입력 (선택사항) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>이메일 <Text style={styles.optional}>(선택사항)</Text></Text>
            <TextInput
              style={styles.emailInput}
              placeholder="답변을 받을 이메일 주소를 입력해주세요"
              placeholderTextColor="#A0ADB8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.emailNote}>
              이메일 주소를 입력하시면 문의에 대한 답변을 받아보실 수 있습니다.
            </Text>
          </View>

          {/* 제출 버튼 */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedType || !title.trim() || !message.trim()) && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!selectedType || !title.trim() || !message.trim()}
          >
            <Text style={[
              styles.submitButtonText,
              (!selectedType || !title.trim() || !message.trim()) && styles.disabledButtonText
            ]}>
              문의하기
            </Text>
          </TouchableOpacity>

          {/* 하단 여백 */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerPlaceholder: {
    width: 80,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  introSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  optional: {
    fontSize: 14,
    color: '#A0ADB8',
    fontWeight: 'normal',
  },
  typeGrid: {
    gap: 12,
  },
  typeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedTypeCard: {
    borderColor: '#6B73FF',
    backgroundColor: '#F0F9FF',
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  selectedTypeTitle: {
    color: '#6B73FF',
  },
  typeDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  selectedTypeDescription: {
    color: '#0369A1',
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 120,
    marginBottom: 8,
  },
  emailInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    color: '#A0ADB8',
    textAlign: 'right',
  },
  emailNote: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 16,
  },
  submitButton: {
    backgroundColor: '#6B73FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#A0ADB8',
  },
  bottomPadding: {
    height: 40,
  },
});

export default ContactScreen;