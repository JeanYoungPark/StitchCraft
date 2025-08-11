import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AdBanner from '../components/AdBanner';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>설정</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Bookmarks')}>
          <Text style={styles.menuText}>내 북마크</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.menuText}>문의하기</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingBottom: 60}}>
        <AdBanner />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#2D3748',
  },
});

export default SettingsScreen;
