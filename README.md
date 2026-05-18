# 도서 관리 시스템

Spring Boot + Next.js 풀스택 도서 관리 애플리케이션

## 기술 스택

| Backend | Spring Boot 3.x, Java 21, Spring Data JPA, H2 |
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |

## 실행 방법

### 백엔드

```bash
cd book-management-backend
./gradlew bootRun
# → http://localhost:8080
# → H2 콘솔: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:bookdb)
```

### 프론트엔드

```bash
cd book-management-front
npm install
npm run dev
# → http://localhost:3000
```

## API 엔드포인트

| Method | URL | 설명 |

| GET | /api/books | 전체 목록 조회 |
| GET | /api/books?keyword={검색어} | 키워드 검색 |
| GET | /api/books/{id} | 단건 조회 |
| POST | /api/books | 도서 등록 |
| PUT | /api/books/{id} | 도서 수정 |
| DELETE | /api/books/{id} | 도서 삭제 |