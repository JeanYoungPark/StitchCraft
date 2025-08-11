import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {YouTubeCreditInfo, ProductLink} from '../types/YouTubeCredit';

interface YouTubeCreditCardProps {
  creditInfo: YouTubeCreditInfo;
  compact?: boolean; // 간소화된 표시 여부
}

const YouTubeCreditCard: React.FC<YouTubeCreditCardProps> = ({
  creditInfo,
  compact = false,
}) => {
  const handleChannelPress = () => {
    Alert.alert(
      '채널 방문',
      `${creditInfo.channel.name} 채널로 이동하시겠습니까?`,
      [
        {text: '취소', style: 'cancel'},
        {
          text: '이동',
          onPress: () => {
            Linking.openURL(creditInfo.channel.url).catch(() => {
              Alert.alert('오류', '채널을 열 수 없습니다.');
            });
          },
        },
      ],
    );
  };

  const handleProductPress = (product: ProductLink) => {
    Alert.alert(
      `${product.title} 구매`,
      `${product.description || '상품 페이지'}로 이동하시겠습니까?${
        product.price
          ? `\n\n가격: ${product.price}${product.currency || ''}`
          : ''
      }`,
      [
        {text: '취소', style: 'cancel'},
        {
          text: '구매하기',
          onPress: () => {
            Linking.openURL(product.url).catch(() => {
              Alert.alert('오류', '상품 페이지를 열 수 없습니다.');
            });
          },
        },
      ],
    );
  };

  const getLicenseText = (licenseType: string) => {
    switch (licenseType) {
      case 'permission':
        return '사용 허가 받음';
      case 'creative_commons':
        return 'Creative Commons';
      case 'fair_use':
        return '공정 이용';
      case 'licensed':
        return '라이선스 구매';
      default:
        return '사용 허가';
    }
  };

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactHeader}>
          <Text style={styles.compactTitle}>📹 {creditInfo.title}</Text>
          <TouchableOpacity
            onPress={handleChannelPress}
            style={styles.channelBadge}>
            <Text style={styles.channelBadgeText}>
              {creditInfo.channel.verified && '✓ '}
              {creditInfo.channel.name}
            </Text>
          </TouchableOpacity>
        </View>

        {creditInfo.licenseNotes && (
          <Text style={styles.licenseNote}>{creditInfo.licenseNotes}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 비디오 제목 - 더 돋보이게 */}
      <View style={styles.titleSection}>
        <Text style={styles.videoTitle}>{creditInfo.title}</Text>
      </View>

      {/* 채널 정보 - 개선된 디자인 */}
      <View style={styles.channelSection}>
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>
            {creditInfo.channel.verified ? (
              <Text style={styles.verifiedIcon}>✓ </Text>
            ) : null}
            {creditInfo.channel.name}
          </Text>
          <Text style={styles.channelLabel}>유튜브 채널</Text>
        </View>
      </View>

      {/* 관련 상품 - 개선된 디자인 */}
      {creditInfo.productLinks && creditInfo.productLinks.length > 0 && (
        <View style={styles.productsSection}>
          <Text style={styles.productsTitle}>관련 상품</Text>

          <View style={styles.productsContainer}>
            {creditInfo.productLinks.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <View style={styles.productBullet}>
                  <Text style={styles.productBulletText}>{index + 1}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  {product.description && (
                    <Text style={styles.productDescription}>
                      {product.description}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 라이선스 정보 - 하단에 작고 눈에 덜 띄게 */}
      <View style={styles.licenseSectionBottom}>
        <Text style={styles.licenseTextSmall}>
          저작권: {getLicenseText(creditInfo.licenseType)}
          {creditInfo.permissionDate && ` (${creditInfo.permissionDate})`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 일반 표시용 스타일
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  // 컴팩트 표시용 스타일
  compactContainer: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4338CA',
    flex: 1,
    marginRight: 8,
  },
  channelBadge: {
    backgroundColor: '#4338CA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  channelBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  // 제목 섹션
  titleSection: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  videoDuration: {
    fontSize: 12,
    color: '#64748B',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  // 채널 섹션
  channelSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  verifiedIcon: {
    color: '#10B981',
  },
  channelLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  channelHandle: {
    fontSize: 13,
    color: '#6B7280',
  },
  visitChannelText: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500',
  },

  // 라이선스 섹션
  licenseSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  licenseInfo: {
    flex: 1,
  },
  licenseTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  licenseType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B45309',
    marginBottom: 2,
  },
  licenseDate: {
    fontSize: 12,
    color: '#A16207',
  },
  commercialBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  commercialBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // 메모 섹션
  notesSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0EA5E9',
  },
  notesText: {
    fontSize: 13,
    color: '#0C4A6E',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  licenseNote: {
    fontSize: 11,
    color: '#6366F1',
    marginTop: 4,
    fontStyle: 'italic',
  },

  // 상품 섹션
  productsSection: {
    marginBottom: 12,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    lineHeight: 24,
    marginBottom: 16,
  },
  productsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#9CAF88',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  productBulletText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    lineHeight: 22,
  },
  productDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  productArrow: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },

  // 크레딧 섹션
  creditSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  creditText: {
    fontSize: 12,
    color: '#4B5563',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // 하단 저작권 정보 (눈에 덜 띄게)
  licenseSectionBottom: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  licenseTextSmall: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
});

export default YouTubeCreditCard;
