# Redux

앱의 전역 상태 관리를 위한 Redux 설정입니다.

## 구조

```
redux/
├── store.js            # Redux 스토어 설정
├── slices/             # Redux Toolkit slices
│   ├── authSlice.js    # 인증 상태
│   ├── patternSlice.js # 도안 상태
│   ├── yarnSlice.js    # 실 정보 상태
│   └── needleSlice.js  # 바늘 정보 상태
└── middleware/         # 커스텀 미들웨어
```

## 상태 관리 가이드

- Redux Toolkit 사용 권장
- 비동기 작업은 createAsyncThunk 사용
- 상태는 정규화하여 저장
- 불변성 유지