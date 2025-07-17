import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/redux/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
