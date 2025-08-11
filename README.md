# StitchCraft 🧶

> 뜨개질 애호가들을 위한 React Native 앱 - 도안 생성, 공유, 발견 플랫폼

## 🎯 프로젝트 소개

StitchCraft는 뜨개질을 사랑하는 사람들을 위한 모바일 앱입니다. 나만의 도안을 만들고, 다른 사람들과 공유하며, 새로운 아이디어를 발견할 수 있는 플랫폼을 제공합니다.

## ✨ 주요 기능

### 🎯 현재 구현된 기능

- ✅ **홈 화면** - StitchCraft 메인 페이지
- ✅ **패턴 목록** - 패턴 브라우징 화면
- ✅ **프로필** - 사용자 프로필 화면
- ✅ **네비게이션** - 하단 탭 및 스택 네비게이션
- ✅ **테마 시스템** - 일관된 디자인 시스템
- ✅ **TypeScript** - 타입 안전성
- ✅ **웹 지원** - 크로스 플랫폼 지원

### 🚀 계획된 기능

- [ ] **도안 에디터** - 그리드 기반 도안 생성 도구
- [ ] **패턴 카드** - 도안 목록 표시
- [ ] **좋아요 시스템** - 패턴 좋아요 및 북마크
- [ ] **검색 기능** - 패턴 검색 및 필터링
- [ ] **사용자 인증** - 로그인/회원가입
- [ ] **이미지 업로드** - 도안 이미지 관리
- [ ] **댓글 시스템** - 패턴에 대한 피드백
- [ ] **실/바늘 정보** - 재료 정보 관리

## 🛠️ 기술 스택

### Frontend

- **React Native** - 크로스 플랫폼 모바일 앱
- **Expo** - 개발 및 배포 플랫폼
- **TypeScript** - 타입 안전성
- **React Navigation** - 네비게이션 관리
- **React Native Paper** - UI 컴포넌트 라이브러리
- **Redux Toolkit** - 상태 관리

### Backend (계획)

- **Node.js + Express** - RESTful API 서버
- **PostgreSQL** - 메인 데이터베이스
- **AWS S3** - 이미지 파일 저장
- **JWT** - 사용자 인증

## 🚀 시작하기

### 필요 조건

- Node.js 16.x 이상
- Expo CLI
- iOS 시뮬레이터 또는 Android 에뮬레이터
- Expo Go 앱 (실제 기기 테스트용)

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/JeanYoungPark/StitchCraft.git
cd StitchCraft

# 의존성 설치
npm install

# 개발 서버 시작
npm start

# 플랫폼별 실행
npm run android  # Android
npm run ios      # iOS
npm run web      # 웹 브라우저
```

### 📱 모바일에서 테스트

1. **Expo Go 앱 설치** (iOS/Android)
2. **QR 코드 스캔** (터미널에 표시됨)
3. **앱 실행 및 테스트**

## 📁 프로젝트 구조

```
StitchCraft/
├── App.tsx                 # 메인 앱 컴포넌트
├── package.json           # 프로젝트 설정
├── app.json              # Expo 설정
├── babel.config.js       # Babel 설정
├── tsconfig.json         # TypeScript 설정
├── eas.json             # EAS 빌드 설정
└── src/
    ├── components/      # 재사용 가능한 컴포넌트
    ├── screens/         # 화면 컴포넌트
    ├── navigation/      # 네비게이션 설정
    ├── redux/          # Redux 상태 관리
    ├── services/       # API 서비스
    ├── theme/          # 테마 및 스타일
    ├── types/          # TypeScript 타입 정의
    └── utils/          # 유틸리티 함수
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: #6B73FF (보라색)
- **Secondary**: #FF6B9D (핑크색)
- **Background**: #F5F5F5 (연한 회색)
- **Surface**: #FFFFFF (흰색)
- **Text**: #2D3748 (어두운 회색)

### 스페이싱 시스템

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## 📱 화면 구성

### 현재 화면들

1. **홈 화면** (`src/screens/HomeScreen.tsx`)

   - 앱 소개 및 주요 액션 버튼
   - "패턴 만들기" CTA

2. **패턴 화면** (`src/screens/PatternsScreen.tsx`)

   - 패턴 목록 표시 (추후 구현)
   - 검색 및 필터 기능 (추후 구현)

3. **프로필 화면** (`src/screens/ProfileScreen.tsx`)
   - 사용자 정보 표시 (추후 구현)
   - 내가 만든 패턴 목록 (추후 구현)

## 🔧 개발 가이드

### 새로운 화면 추가

1. `src/screens/` 에 새 컴포넌트 생성
2. `src/navigation/AppNavigator.tsx` 에 라우트 추가
3. 필요한 경우 `src/types/index.ts` 에 타입 정의

### 새로운 컴포넌트 추가

1. `src/components/` 에 컴포넌트 생성
2. 테마 시스템 활용 (`src/theme/theme.ts`)
3. TypeScript 타입 정의

### 상태 관리

1. `src/redux/` 에 슬라이스 생성
2. `src/redux/store.ts` 에 슬라이스 등록
3. 컴포넌트에서 `useAppSelector`, `useAppDispatch` 사용

## 🚀 배포

### 웹 배포

```bash
# 웹 빌드 생성
npm run build

# 빌드 결과물은 web-build/ 폴더에 생성됨
```

### 모바일 앱 빌드

```bash
# EAS CLI 설치
npm install -g eas-cli

# EAS 로그인
eas login

# Android APK 빌드
eas build --platform android --profile preview

# iOS 빌드
eas build --platform ios --profile preview
```

## 🤝 기여하기

1. 이 레포지토리를 Fork합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m '새로운 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🧶 StitchCraft 팀

뜨개질로 연결되는 세상을 만들어가고 있습니다!

---

**StitchCraft** - 뜨개질로 연결되는 세상 🧶✨
