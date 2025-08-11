# BW Diet Web - 기술 아키텍처

## 🏗️ 전체 시스템 아키텍처

### 아키텍처 개요
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   React App     │◄───┤   API Server    │◄───┤   PostgreSQL    │
│   (Vite + TS)   │    │   (Node.js)     │    │   (Optional)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │
        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐
│ Local Storage   │    │ External APIs   │
│ IndexedDB       │    │ Food Database   │
└─────────────────┘    └─────────────────┘
```

## 🎯 기술 스택 선정

### Frontend Stack

#### Core Framework
- **React 18.2+** with TypeScript
  - 컴포넌트 기반 UI 개발
  - 강력한 타입 시스템
  - 풍부한 생태계

#### Build Tool
- **Vite 4.0+**
  - 빠른 개발 서버
  - 최적화된 프로덕션 빌드
  - TypeScript 네이티브 지원

#### 상태 관리
- **Zustand**
  - 가벼우면서 직관적인 API
  - TypeScript 완벽 지원
  - Redux 대비 보일러플레이트 최소화

#### UI & Styling
- **Tailwind CSS 3.0+**
  - 유틸리티 우선 CSS 프레임워크
  - 반응형 디자인 최적화
  - 커스터마이징 용이성

#### 차트 & 시각화
- **Chart.js + React-Chartjs-2**
  - 다양한 차트 타입 지원
  - 반응형 및 애니메이션 지원
  - 커스터마이징 자유도 높음

#### 폼 관리
- **React Hook Form**
  - 성능 최적화된 폼 라이브러리
  - 유효성 검사 내장
  - TypeScript 지원

#### HTTP 클라이언트
- **Axios**
  - Promise 기반 HTTP 클라이언트
  - 인터셉터 및 에러 핸들링
  - TypeScript 지원

### Development Tools

#### Testing
- **Vitest** - 단위 테스트
- **React Testing Library** - 컴포넌트 테스트
- **Playwright** - E2E 테스트

#### Code Quality
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포매팅
- **Husky** - Git Hooks

## 🏛️ 프론트엔드 아키텍처

### 폴더 구조
```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   ├── charts/         # 차트 컴포넌트
│   ├── forms/          # 폼 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── dashboard/      # 대시보드
│   ├── diet/           # 식단 관리
│   ├── exercise/       # 운동 관리
│   └── profile/        # 프로필 관리
├── hooks/              # 커스텀 훅
│   ├── useLocalStorage.ts
│   ├── useWeight.ts
│   └── useDiet.ts
├── stores/             # Zustand 스토어
│   ├── userStore.ts
│   ├── dietStore.ts
│   └── exerciseStore.ts
├── utils/              # 유틸리티 함수
│   ├── calculations.ts # BMI, 칼로리 계산
│   ├── dateHelpers.ts  # 날짜 관련 함수
│   └── validation.ts   # 유효성 검사
├── api/                # API 관련
│   ├── client.ts       # Axios 클라이언트
│   └── endpoints.ts    # API 엔드포인트
├── types/              # TypeScript 타입 정의
│   ├── user.ts
│   ├── diet.ts
│   └── exercise.ts
├── styles/             # 글로벌 스타일
└── assets/             # 정적 리소스
```

### 상태 관리 구조

#### User Store
```typescript
interface UserState {
  profile: UserProfile | null;
  goals: DietGoals | null;
  preferences: UserPreferences;
  actions: {
    setProfile: (profile: UserProfile) => void;
    setGoals: (goals: DietGoals) => void;
    updatePreferences: (preferences: Partial<UserPreferences>) => void;
  };
}
```

#### Diet Store
```typescript
interface DietState {
  entries: DietEntry[];
  foodDatabase: Food[];
  dailyIntake: DailyIntake;
  actions: {
    addEntry: (entry: DietEntry) => void;
    removeEntry: (id: string) => void;
    searchFood: (query: string) => Promise<Food[]>;
    calculateDailyIntake: () => DailyIntake;
  };
}
```

### 컴포넌트 아키텍처

#### 컴포넌트 계층
```
App
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── Footer
├── Router
│   ├── Dashboard
│   │   ├── StatsCards
│   │   ├── WeightChart
│   │   └── CalorieChart
│   ├── DietPage
│   │   ├── FoodSearch
│   │   ├── MealPlan
│   │   └── NutritionSummary
│   └── ExercisePage
│       ├── WorkoutLog
│       ├── ExerciseList
│       └── CalorieBurned
└── Modals
    ├── AddFoodModal
    └── EditProfileModal
```

## 💾 데이터 저장 전략

### Local Storage Strategy
```typescript
// 사용자 데이터 영속성
const STORAGE_KEYS = {
  USER_PROFILE: 'bw-diet-user-profile',
  DIET_ENTRIES: 'bw-diet-entries',
  EXERCISE_LOG: 'bw-diet-exercise',
  PREFERENCES: 'bw-diet-preferences'
} as const;

// IndexedDB for large datasets
interface DietDatabase {
  foods: Food[];          // 음식 데이터베이스
  entries: DietEntry[];   // 식단 기록
  exercises: Exercise[];  // 운동 기록
}
```

### 데이터 백업 & 동기화
- **로컬 우선 저장**: 오프라인 지원
- **주기적 백업**: JSON 내보내기/가져오기
- **향후 확장**: 클라우드 동기화 준비

## 🔧 개발 환경 설정

### 필수 도구
- **Node.js 18+**
- **npm 9+**
- **Git**
- **VS Code** (권장 IDE)

### VS Code 확장
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter

### 환경 변수
```env
# Development
VITE_APP_TITLE=BW Diet Web
VITE_API_BASE_URL=http://localhost:3001
VITE_FOOD_API_KEY=your-api-key

# Production
VITE_APP_TITLE=BW Diet Web
VITE_API_BASE_URL=https://api.bw-diet.com
VITE_FOOD_API_KEY=prod-api-key
```

## 🚀 빌드 & 배포

### 빌드 최적화
- **Code Splitting**: 페이지별 lazy loading
- **Tree Shaking**: 불필요한 코드 제거
- **Asset Optimization**: 이미지 및 폰트 최적화
- **Gzip Compression**: 번들 크기 압축

### 배포 전략
```yaml
# GitHub Actions 워크플로우
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
```

### 성능 목표
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB (gzipped)

## 🔐 보안 고려사항

### 클라이언트 보안
- **CSP (Content Security Policy)** 설정
- **XSS 방지**: DOMPurify 사용
- **민감 데이터 암호화**: 로컬 저장시 암호화
- **HTTPS 강제**: 프로덕션 환경

### 데이터 보호
- **개인정보 최소화**: 필요한 데이터만 수집
- **로컬 저장 우선**: 외부 전송 최소화
- **사용자 동의**: 데이터 처리 투명성