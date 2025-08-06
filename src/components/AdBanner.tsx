import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AdBannerProps {
  size?: BannerAdSize;
  style?: any;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  size = BannerAdSize.BANNER,
  style 
}) => {
  const insets = useSafeAreaInsets();
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [adError, setAdError] = React.useState<string | null>(null);
  
  // 개발 환경에서는 테스트 ID 사용
  const adUnitId = __DEV__ 
    ? TestIds.BANNER 
    : 'ca-app-pub-3940256099942544/6300978111'; // 실제 배포 시 변경 필요

  return (
    <View style={[
      styles.container, 
      { paddingBottom: insets.bottom }, // iPhone 하단 안전 영역 고려
      style
    ]}>
      {adError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>광고 로드 실패</Text>
        </View>
      ) : (
        <BannerAd
          unitId={adUnitId}
          size={size}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            console.log('✅ Banner ad loaded successfully');
            setAdLoaded(true);
            setAdError(null);
          }}
          onAdFailedToLoad={(error) => {
            console.error('❌ Banner ad failed to load:', error);
            setAdError('광고를 불러올 수 없습니다');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    minHeight: 60, // 최소 높이 보장
  },
  errorContainer: {
    padding: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    textAlign: 'center',
  },
});

export default AdBanner;