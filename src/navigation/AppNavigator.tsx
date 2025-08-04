import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import PatternsScreen from '../screens/PatternsScreen';
import FirstKnittingScreen from '../screens/FirstKnittingScreen';
import PatternDetailScreen from '../screens/PatternDetailScreen';
import YarnGuideScreen from '../screens/YarnGuideScreen';
import NeedleGuideScreen from '../screens/NeedleGuideScreen';
import BasicTechniquesScreen from '../screens/BasicTechniquesScreen';
import KnittingDictionaryScreen from '../screens/KnittingDictionaryScreen';
import KnittingTipsScreen from '../screens/KnittingTipsScreen';
import FAQScreen from '../screens/FAQScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import ContactScreen from '../screens/ContactScreen';

// Stack navigator type definition for Home tab
export type HomeStackParamList = {
  HomeMain: undefined;
};

// Tutorial Stack navigator type definition
export type TutorialStackParamList = {
  TutorialMain: undefined;
  FirstKnitting: undefined;
  YarnGuide: undefined;
  NeedleGuide: undefined;
  BasicTechniques: undefined;
  KnittingDictionary: undefined;
  KnittingTips: undefined;
  FAQ: undefined;
};

// Patterns Stack navigator type definition
export type PatternsStackParamList = {
  PatternsList: { initialFilter?: string } | undefined;
  PatternDetail: {
    patternId: string;
    title: string;
    difficulty: string;
    duration: string;
    videoUrl?: string;
    materials: string[];
    steps: string[];
    description: string;
    hasImages?: boolean;
    hasPattern?: boolean;
  };
};

// Settings Stack navigator type definition
export type SettingsStackParamList = {
  SettingsMain: undefined;
  Bookmarks: undefined;
  Contact: undefined;
  PatternDetail: {
    patternId: string;
    title: string;
    difficulty: string;
    duration: string;
    videoUrl?: string;
    materials: string[];
    steps: string[];
    description: string;
    hasImages?: boolean;
    hasPattern?: boolean;
    fromBookmarks?: boolean;
  };
};

// Tab navigator type definition
export type BottomTabParamList = {
  Home: undefined;
  Tutorial: undefined;
  Patterns: undefined;
  Settings: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();
const TutorialStack = createStackNavigator<TutorialStackParamList>();
const PatternsStack = createStackNavigator<PatternsStackParamList>();
const SettingsStack = createStackNavigator<SettingsStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Home Stack Navigator
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

// Tutorial Stack Navigator
const TutorialStackNavigator = () => {
  return (
    <TutorialStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TutorialStack.Screen
        name="TutorialMain"
        component={TutorialScreen}
      />
      <TutorialStack.Screen
        name="FirstKnitting"
        component={FirstKnittingScreen}
      />
      <TutorialStack.Screen
        name="YarnGuide"
        component={YarnGuideScreen}
      />
      <TutorialStack.Screen
        name="NeedleGuide"
        component={NeedleGuideScreen}
      />
      <TutorialStack.Screen
        name="BasicTechniques"
        component={BasicTechniquesScreen}
      />
      <TutorialStack.Screen
        name="KnittingDictionary"
        component={KnittingDictionaryScreen}
      />
      <TutorialStack.Screen
        name="KnittingTips"
        component={KnittingTipsScreen}
      />
      <TutorialStack.Screen
        name="FAQ"
        component={FAQScreen}
      />
    </TutorialStack.Navigator>
  );
};

// Patterns Stack Navigator
const PatternsStackNavigator = () => {
  return (
    <PatternsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PatternsStack.Screen
        name="PatternsList"
        component={PatternsScreen}
      />
      <PatternsStack.Screen
        name="PatternDetail"
        component={PatternDetailScreen}
      />
    </PatternsStack.Navigator>
  );
};

// Settings Stack Navigator
const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen
        name="SettingsMain"
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
      />
      <SettingsStack.Screen
        name="Contact"
        component={ContactScreen}
      />
      <SettingsStack.Screen
        name="PatternDetail"
        component={PatternDetailScreen}
      />
    </SettingsStack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingTop: 0,
          paddingBottom: 0,
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: '#6B73FF',
        tabBarInactiveTintColor: '#A0ADB8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
          marginBottom: 8,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
        },
        tabBarShowIcon: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color, fontWeight: 'bold' }}>⌂</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Tutorial"
        component={TutorialStackNavigator}
        options={{
          title: '튜토리얼',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color, fontWeight: 'bold' }}>◉</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Patterns"
        component={PatternsStackNavigator}
        options={{
          title: '패턴',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color, fontWeight: 'bold' }}>⬟</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color, fontWeight: 'bold' }}>◎</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};