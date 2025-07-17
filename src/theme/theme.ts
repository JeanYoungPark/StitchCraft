import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6B73FF',
    secondary: '#FF6B9D',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    onSurface: '#2D3748',
    onBackground: '#2D3748',
    error: '#E53E3E',
  },
};

export const colors = {
  primary: '#6B73FF',
  secondary: '#FF6B9D',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#2D3748',
  textSecondary: '#718096',
  border: '#E2E8F0',
  error: '#E53E3E',
  success: '#38A169',
  warning: '#D69E2E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};