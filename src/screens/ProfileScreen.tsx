import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../theme/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        프로필
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        여기에 사용자 프로필이 표시됩니다
      </Text>
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
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});