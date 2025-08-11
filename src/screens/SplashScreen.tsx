import React, {useEffect, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onFinish}) => {
  // 로고 및 텍스트 애니메이션
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 로고 + 텍스트 애니메이션 시퀀스
    const splashAnimation = Animated.sequence([
      // 1. 로고 등장 (페이드인 + 스케일업 + 회전)
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),

      // 2. 텍스트 등장 (로고 등장 후 약간의 지연)
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // 3. 잠시 대기
      Animated.delay(800),

      // 4. 함께 페이드아웃
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]);

    splashAnimation.start(() => {
      onFinish();
    });

    return () => splashAnimation.stop();
  }, [logoOpacity, logoScale, logoRotation, textOpacity, onFinish]);

  // 회전 각도 계산 (살짝 회전)
  const rotateInterpolation = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'], // 10도 살짝 회전
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6E3" />
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          {/* 로고 이미지 + 회전 효과 */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{scale: logoScale}, {rotate: rotateInterpolation}],
              },
            ]}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* StitchCraft 브랜드 텍스트 */}
          <Animated.View style={[styles.textContainer, {opacity: textOpacity}]}>
            <Text style={styles.brandText}>StitchCraft</Text>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3', // 크림색 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24, // 로고와 텍스트 사이 간격
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
  },
  brandText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748', // 앱의 메인 텍스트 컬러
    letterSpacing: 1.5,
    textAlign: 'center',
  },
});

export default SplashScreen;
