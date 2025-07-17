import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { colors, spacing } from '../theme/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        StitchCraft
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        뜨개질 패턴을 만들고 공유하세요
      </Text>
      <Button 
        mode="contained" 
        onPress={() => console.log('패턴 만들기')}
        style={styles.button}
      >
        패턴 만들기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.md,
  },
});