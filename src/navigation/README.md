# Navigation

앱의 네비게이션 설정을 관리하는 폴더입니다.

## 구조

```
navigation/
├── AppNavigator.js     # 메인 네비게이터
├── AuthNavigator.js    # 인증 관련 네비게이션
├── TabNavigator.js     # 하단 탭 네비게이션
└── StackNavigator.js   # 스택 네비게이션
```

## 네비게이션 구조

- **AuthNavigator**: 로그인, 회원가입
- **TabNavigator**: 홈, 도안, 프로필 등 메인 탭
- **StackNavigator**: 상세 화면들