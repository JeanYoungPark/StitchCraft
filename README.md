# StitchCraft

> 뜨개질 애호가들을 위한 React Native 패턴 관리 앱

## 프로젝트 개요

StitchCraft는 뜨개질을 사랑하는 사람들을 위한 모바일 앱입니다. YouTube 튜토리얼과 연계한 패턴 학습, 북마크 기능, 체계적인 뜨개질 가이드를 제공하는 올인원 뜨개질 플랫폼입니다.

## 주요 기능

### 구현 완료된 기능

- **패턴 관리 시스템**: SQLite 기반 로컬 데이터베이스
- **YouTube 통합**: 앱 내 YouTube 영상 재생 및 크리에이터 크레딧
- **패턴 상세 페이지**: 난이도, 소요시간, 재료, 단계별 가이드
- **북마크 시스템**: 관심 패턴 저장 및 관리
- **뜨개질 튜토리얼**: 초보자를 위한 체계적인 학습 콘텐츠
- **모바일 광고**: AdMob을 통한 수익화 준비
- **4탭 네비게이션**: Home, Tutorial, Patterns, Settings
- **오프라인 지원**: 로컬 데이터베이스로 네트워크 없이도 사용 가능

### 현재 제공 중인 패턴

- **페페 개구리 지갑**: 고급 난이도 (3-4시간)
- **붕어빵 키링**: 초급 난이도 (1-2시간) - 홀리랜드 DIY키트

## 기술 스택

### Frontend
- **React Native**: 크로스 플랫폼 모바일 앱 (CLI 기반)
- **TypeScript**: 타입 안전성 및 개발 생산성
- **React Navigation**: Stack & Bottom Tab 네비게이션
- **React Native YouTube iframe**: YouTube 영상 통합

### Database & Storage
- **SQLite**: 로컬 데이터베이스
- **React Native SQLite Storage**: 데이터 관리
- **AsyncStorage**: 사용자 설정 저장

### Additional Libraries
- **React Native Google Mobile Ads**: AdMob 광고 통합
- **React Native Safe Area Context**: 안전 영역 관리
- **React Native Gesture Handler**: 제스처 처리
- **React Native Vector Icons**: 아이콘 시스템

## 시작하기

### 필요 조건

- Node.js 16.x 이상
- React Native CLI
- iOS 시뮬레이터 (Mac) 또는 Android 에뮬레이터
- Xcode (iOS 개발용, Mac만)
- Android Studio (Android 개발용)

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/JeanYoungPark/StitchCraft.git
cd StitchCraft

# 의존성 설치
npm install

# iOS 의존성 설치 (Mac만)
cd ios && pod install && cd ..

# Metro 서버 시작
npm start

# 플랫폼별 실행
npm run android  # Android
npm run ios       # iOS
```

## 프로젝트 구조

```
StitchCraft/
├── App.tsx                     # 메인 앱 컴포넌트
├── src/
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── AdBanner.tsx       # 광고 배너 컴포넌트
│   │   └── YouTubeCreditCard.tsx # YouTube 크레딧 표시
│   ├── database/              # 데이터베이스 관련
│   │   ├── DatabaseManager.ts # SQLite 데이터베이스 관리
│   │   └── PatternData.ts     # 패턴 데이터 정의
│   ├── data/                  # 정적 데이터
│   │   ├── DailyTipsData.ts   # 일일 팁 데이터
│   │   └── KnittingDictionaryData.ts # 뜨개질 용어사전
│   ├── navigation/            # 네비게이션 설정
│   │   └── AppNavigator.tsx   # 메인 네비게이션
│   ├── screens/               # 화면 컴포넌트
│   │   ├── HomeScreen.tsx     # 홈 화면
│   │   ├── PatternsScreen.tsx # 패턴 목록 화면
│   │   ├── PatternDetailScreen.tsx # 패턴 상세 화면
│   │   ├── BookmarksScreen.tsx # 북마크 화면
│   │   ├── TutorialScreen.tsx # 튜토리얼 메인
│   │   ├── SettingsScreen.tsx # 설정 화면
│   │   └── ... (기타 튜토리얼 화면들)
│   └── types/                 # TypeScript 타입 정의
│       └── YouTubeCredit.ts   # YouTube 크레딧 타입
├── android/                   # Android 프로젝트
├── ios/                      # iOS 프로젝트
└── package.json              # 프로젝트 설정
```

## 데이터베이스 설계

### 주요 테이블

- **patterns**: 패턴 정보 저장
- **bookmarks**: 사용자 북마크 관리  
- **app_settings**: 앱 설정 및 데이터 버전 관리

### 데이터 버전 관리

- 자동 스키마 마이그레이션 시스템
- 패턴 데이터 버전 관리 (현재 v1.0)
- 설정에서 수동 패턴 업데이트 가능

## 화면 구성

### 4개 메인 탭

1. **홈**: StitchCraft 소개 및 주요 기능 안내
2. **튜토리얼**: 체계적인 뜨개질 학습 콘텐츠
   - 첫 뜨개질
   - 실 가이드
   - 바늘 가이드  
   - 기본 기법
   - 뜨개질 사전
   - 뜨개질 팁
   - FAQ
3. **패턴**: 패턴 목록 및 상세 정보
   - 난이도별 필터링
   - YouTube 영상 통합
   - 관련 상품 정보
4. **설정**: 앱 설정 및 사용자 기능
   - 북마크 관리
   - 패턴 데이터 업데이트
   - 문의하기

## 개발 프로세스

### 코드 품질

- TypeScript strict 모드 사용
- ESLint 및 Prettier 적용
- 컴포넌트 기반 아키텍처
- 에러 바운더리 및 예외 처리

### 성능 최적화

- SQLite 쿼리 최적화
- 이미지 레이지 로딩
- React Navigation 최적화
- 메모리 누수 방지

## 배포

### 개발 환경
```bash
# 개발 서버 실행
npm start

# 디버그 빌드 생성
npm run android:debug
npm run ios:debug
```

### 프로덕션 빌드
```bash
# Android Release APK
cd android && ./gradlew assembleRelease

# iOS Archive (Xcode 필요)
# Xcode에서 Product > Archive
```

## 기여하기

1. Fork 후 feature 브랜치 생성
2. 변경사항 커밋
3. Pull Request 제출

### 개발 가이드라인

- TypeScript 타입 정의 필수
- 컴포넌트는 함수형으로 작성
- 에러 핸들링 필수
- 사용자 경험을 최우선으로 고려

## 향후 계획

### 단기 목표
- 패턴 데이터 확장 (50개 이상)
- 검색 및 필터링 기능 강화
- 패턴 카테고리별 분류 시스템

### 중기 목표  
- 소셜 기능 (패턴 공유, 커뮤니티)
- 사용자 제작 패턴 업로드
- 다국어 지원 (영어, 일본어)

### 장기 목표
- 프리미엄 구독 모델
- AI 기반 패턴 추천
- 웹 버전 출시

## 라이센스

MIT 라이센스 하에 배포됩니다.

---

**StitchCraft** - 뜨개질로 연결되는 세상