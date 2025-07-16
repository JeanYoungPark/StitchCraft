# StitchCraft 🧶

> 뜨개질 애호가들을 위한 React Native 앱 - 도안 생성, 공유, 발견 플랫폼

## 프로젝트 소개

StitchCraft는 뜨개질을 사랑하는 사람들을 위한 모바일 앱입니다. 나만의 도안을 만들고, 다른 사람들과 공유하며, 새로운 아이디어를 발견할 수 있는 플랫폼을 제공합니다.

## 주요 기능

### 🎯 1단계 (MVP)
- [ ] 사용자 회원가입 및 로그인
- [ ] 실 종류 카테고리 조회
- [ ] 바늘 종류 카테고리 조회
- [ ] 도안 이미지 업로드
- [ ] 기본 마이페이지

### 🚀 2단계 (소셜 기능)
- [ ] 도안 좋아요 기능
- [ ] 인기 도안 순위 표시
- [ ] 도안 검색 기능
- [ ] 도안 상세 정보 페이지
- [ ] 도안 공유 기능

### 🔥 3단계 (고급 기능)
- [ ] 도안 에디터 (그리드 방식)
- [ ] 실시간 댓글 시스템
- [ ] 푸시 알림
- [ ] 오프라인 모드 지원

## 기술 스택

### Frontend
- **React Native** - 크로스 플랫폼 모바일 앱
- **React Navigation** - 화면 전환 관리
- **React Native Paper** - UI 컴포넌트 라이브러리
- **Redux Toolkit** - 상태 관리
- **React Native Image Picker** - 이미지 선택
- **React Native Vector Icons** - 아이콘

### Backend (예정)
- **Node.js + Express** - RESTful API 서버
- **PostgreSQL** - 메인 데이터베이스
- **AWS S3** - 이미지 파일 저장
- **JWT** - 사용자 인증
- **Firebase** - 푸시 알림

## 데이터베이스 설계

```sql
-- 사용자 테이블
users (
  id, email, nickname, profile_image, 
  created_at, updated_at
)

-- 실 정보 테이블
yarns (
  id, name, brand, weight, fiber_type, 
  color, image_url, created_at
)

-- 바늘 정보 테이블
needles (
  id, type, size, material, brand, 
  image_url, created_at
)

-- 도안 테이블
patterns (
  id, title, description, difficulty, 
  category, image_url, grid_data, user_id, 
  likes_count, created_at, updated_at
)

-- 좋아요 테이블
likes (
  id, user_id, pattern_id, created_at
)
```

## 개발 환경 설정

### 필요 조건
- Node.js 16.x 이상
- React Native CLI 또는 Expo CLI
- Android Studio (Android 개발)
- Xcode (iOS 개발 - macOS만)

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/JeanYoungPark/StitchCraft.git
cd StitchCraft

# 의존성 설치
npm install

# iOS 실행 (macOS)
npx react-native run-ios

# Android 실행
npx react-native run-android
```

## 프로젝트 구조

```
StitchCraft/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── screens/        # 화면 컴포넌트
│   ├── navigation/     # 네비게이션 설정
│   ├── redux/          # 상태 관리
│   ├── services/       # API 호출
│   ├── utils/          # 유틸리티 함수
│   └── assets/         # 이미지, 폰트 등
├── android/            # Android 네이티브 코드
├── ios/                # iOS 네이티브 코드
└── docs/               # 문서
```

## 기여하기

1. 이 레포지토리를 Fork합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m '새로운 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

프로젝트에 대한 질문이나 제안이 있으시면 이슈를 등록해주세요.

---

**StitchCraft** - 뜨개질로 연결되는 세상 🧶✨
