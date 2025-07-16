# API 문서

StitchCraft API 명세서입니다.

## 기본 정보

- **Base URL**: `https://api.stitchcraft.com`
- **인증 방식**: JWT Bearer Token
- **응답 형식**: JSON

## 인증 (Authentication)

### 회원가입
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "뜨개질러버"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nickname": "뜨개질러버"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 로그인
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## 도안 (Patterns)

### 도안 목록 조회
```
GET /api/patterns
```

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20)
- `sort`: 정렬 방식 (latest, popular, liked)
- `category`: 카테고리 필터

**Response:**
```json
{
  "success": true,
  "data": {
    "patterns": [
      {
        "id": 1,
        "title": "아기 모자 도안",
        "description": "귀여운 아기 모자 뜨개질 도안입니다.",
        "difficulty": "초급",
        "category": "모자",
        "image_url": "https://cdn.stitchcraft.com/patterns/1.jpg",
        "likes_count": 25,
        "user": {
          "id": 1,
          "nickname": "뜨개질러버"
        },
        "created_at": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

### 도안 상세 조회
```
GET /api/patterns/{id}
```

### 도안 생성
```
POST /api/patterns
```

**Request Body (multipart/form-data):**
```
title: 도안 제목
description: 도안 설명
difficulty: 난이도 (초급/중급/고급)
category: 카테고리
image: 이미지 파일
grid_data: 도안 그리드 데이터 (JSON)
```

### 도안 좋아요
```
POST /api/patterns/{id}/like
```

### 도안 좋아요 취소
```
DELETE /api/patterns/{id}/like
```

## 실 정보 (Yarns)

### 실 목록 조회
```
GET /api/yarns
```

**Query Parameters:**
- `brand`: 브랜드 필터
- `weight`: 실 굵기 필터
- `fiber_type`: 섬유 타입 필터
- `color`: 색상 필터

### 실 상세 조회
```
GET /api/yarns/{id}
```

## 바늘 정보 (Needles)

### 바늘 목록 조회
```
GET /api/needles
```

**Query Parameters:**
- `type`: 바늘 타입 필터
- `size`: 사이즈 필터
- `material`: 재질 필터

### 바늘 상세 조회
```
GET /api/needles/{id}
```

## 사용자 (Users)

### 프로필 조회
```
GET /api/users/profile
```

### 프로필 수정
```
PUT /api/users/profile
```

### 내 도안 목록
```
GET /api/users/patterns
```

### 좋아요한 도안 목록
```
GET /api/users/liked-patterns
```

## 에러 코드

| 코드 | 메시지 | 설명 |
|------|--------|------|
| 400 | Bad Request | 잘못된 요청 |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 500 | Internal Server Error | 서버 오류 |

## 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": {
    // 응답 데이터
  }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값이 올바르지 않습니다.",
    "details": {
      "email": "이메일 형식이 올바르지 않습니다."
    }
  }
}
```