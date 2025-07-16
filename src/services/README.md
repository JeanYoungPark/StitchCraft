# Services

API 호출 및 외부 서비스 연동을 관리하는 폴더입니다.

## 구조

```
services/
├── api.js              # API 기본 설정
├── authService.js      # 인증 API
├── patternService.js   # 도안 API
├── yarnService.js      # 실 정보 API
├── needleService.js    # 바늘 정보 API
└── imageService.js     # 이미지 업로드 API
```

## API 호출 가이드

- axios 사용 권장
- 에러 처리 통합
- 토큰 자동 첨부
- 요청/응답 인터셉터 활용