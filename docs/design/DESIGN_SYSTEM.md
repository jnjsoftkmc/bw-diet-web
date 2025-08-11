# BW Diet Web - 디자인 시스템

## 🎨 디자인 철학

### 핵심 가치
- **직관성**: 사용자가 생각 없이 사용할 수 있는 인터페이스
- **명료성**: 정보가 명확하고 이해하기 쉬운 시각적 표현  
- **일관성**: 모든 화면에서 통일된 경험 제공
- **접근성**: 모든 사용자가 사용할 수 있는 포용적 디자인

### 디자인 원칙
1. **모바일 우선**: 작은 화면에서 시작하여 확장
2. **데이터 중심**: 중요한 정보를 우선순위에 따라 배치
3. **점진적 공개**: 필요한 정보만 단계적으로 표시
4. **피드백 제공**: 모든 사용자 행동에 명확한 반응

## 🎯 사용자 인터페이스 컨셉

### 전체 톤앤매너
- **친근하고 동기부여가 되는 분위기**
- **의료/건강 앱의 신뢰감**
- **일상적 사용에 부담스럽지 않은 경량감**

### 정보 표현 방식
- **시각적 데이터**: 차트와 그래프 중심의 진행률 표시
- **색상 코딩**: 목표 달성도를 색상으로 직관적 표현
- **아이콘 활용**: 텍스트 대신 아이콘으로 빠른 인식

## 🎨 컬러 시스템

### Primary Colors
```css
--primary-50: #eff6ff;    /* 매우 연한 블루 - 배경 */
--primary-100: #dbeafe;   /* 연한 블루 - 보조 배경 */
--primary-200: #bfdbfe;   /* 중간 연한 블루 - 비활성 */
--primary-300: #93c5fd;   /* 중간 블루 - 보조 요소 */
--primary-400: #60a5fa;   /* 밝은 블루 - 호버 상태 */
--primary-500: #3b82f6;   /* 기본 블루 - 주요 액션 */
--primary-600: #2563eb;   /* 진한 블루 - 클릭 상태 */
--primary-700: #1d4ed8;   /* 더 진한 블루 - 강조 */
--primary-800: #1e40af;   /* 매우 진한 블루 */
--primary-900: #1e3a8a;   /* 가장 진한 블루 */
```

### Success Colors (건강/목표 달성)
```css
--success-50: #f0fdf4;    /* 매우 연한 그린 */
--success-100: #dcfce7;   /* 연한 그린 */
--success-200: #bbf7d0;   /* 중간 연한 그린 */
--success-300: #86efac;   /* 중간 그린 */
--success-400: #4ade80;   /* 밝은 그린 */
--success-500: #22c55e;   /* 기본 그린 - 성공 상태 */
--success-600: #16a34a;   /* 진한 그린 */
--success-700: #15803d;   /* 더 진한 그린 */
```

### Warning Colors (주의/개선 필요)
```css
--warning-50: #fffbeb;    /* 매우 연한 오렌지 */
--warning-100: #fef3c7;   /* 연한 오렌지 */
--warning-200: #fde68a;   /* 중간 연한 오렌지 */
--warning-300: #fcd34d;   /* 중간 오렌지 */
--warning-400: #fbbf24;   /* 밝은 오렌지 */
--warning-500: #f59e0b;   /* 기본 오렌지 - 경고 */
--warning-600: #d97706;   /* 진한 오렌지 */
```

### Error Colors (위험/초과)
```css
--error-50: #fef2f2;      /* 매우 연한 레드 */
--error-100: #fee2e2;     /* 연한 레드 */
--error-200: #fecaca;     /* 중간 연한 레드 */
--error-300: #fca5a5;     /* 중간 레드 */
--error-400: #f87171;     /* 밝은 레드 */
--error-500: #ef4444;     /* 기본 레드 - 에러 */
--error-600: #dc2626;     /* 진한 레드 */
```

### Neutral Colors (텍스트/배경)
```css
--neutral-0: #ffffff;     /* 화이트 - 카드 배경 */
--neutral-50: #f9fafb;    /* 매우 연한 그레이 - 페이지 배경 */
--neutral-100: #f3f4f6;   /* 연한 그레이 - 구분선 */
--neutral-200: #e5e7eb;   /* 중간 연한 그레이 - 비활성 테두리 */
--neutral-300: #d1d5db;   /* 중간 그레이 - 플레이스홀더 */
--neutral-400: #9ca3af;   /* 어두운 그레이 - 보조 텍스트 */
--neutral-500: #6b7280;   /* 진한 그레이 - 일반 텍스트 */
--neutral-600: #4b5563;   /* 더 진한 그레이 - 제목 */
--neutral-700: #374151;   /* 매우 진한 그레이 - 강조 텍스트 */
--neutral-800: #1f2937;   /* 거의 검정 - 헤딩 */
--neutral-900: #111827;   /* 검정 - 최고 강조 */
```

### 색상 사용 가이드
- **Primary**: 버튼, 링크, 선택된 상태, 브랜드 요소
- **Success**: 목표 달성, 성공 메시지, 건강한 지표
- **Warning**: 주의 필요, 권장 범위 근접
- **Error**: 오류, 위험 수치, 목표 미달성
- **Neutral**: 텍스트, 배경, 구분선, 아이콘

## 📝 타이포그래피

### 폰트 패밀리
```css
--font-family-primary: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 
                       'Segoe UI', 'Noto Sans KR', sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 
                    'Roboto Mono', monospace;
```

### 폰트 크기 & 행간
```css
/* Headings */
--text-xs: 0.75rem;      /* 12px - 캡션, 라벨 */
--text-sm: 0.875rem;     /* 14px - 보조 텍스트 */
--text-base: 1rem;       /* 16px - 본문 텍스트 */
--text-lg: 1.125rem;     /* 18px - 큰 본문 */
--text-xl: 1.25rem;      /* 20px - 소제목 */
--text-2xl: 1.5rem;      /* 24px - 제목 */
--text-3xl: 1.875rem;    /* 30px - 큰 제목 */
--text-4xl: 2.25rem;     /* 36px - 주요 제목 */

/* Line Heights */
--leading-tight: 1.25;   /* 제목용 */
--leading-normal: 1.5;   /* 본문용 */
--leading-relaxed: 1.75; /* 긴 텍스트용 */

/* Font Weights */
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### 텍스트 스타일 정의
```css
.text-heading-1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--neutral-800);
}

.text-heading-2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--neutral-700);
}

.text-heading-3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--neutral-700);
}

.text-body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-600);
}

.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-600);
}

.text-caption {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--neutral-500);
}

.text-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--neutral-700);
}
```

## 📏 스페이싱 시스템

### 스페이스 단위 (8pt Grid System)
```css
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

### 컴포넌트 간격 가이드
- **컴포넌트 내 요소**: 4px-8px (space-1, space-2)
- **관련된 요소들**: 12px-16px (space-3, space-4)
- **섹션 구분**: 24px-32px (space-6, space-8)
- **페이지 여백**: 40px-48px (space-10, space-12)

## 🔘 컴포넌트 디자인

### 버튼 (Button)
```css
/* Primary Button */
.btn-primary {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background: var(--primary-600);
  color: white;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-700);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--primary-800);
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background: transparent;
  color: var(--primary-600);
  border: 2px solid var(--primary-600);
  transition: all 0.2s ease;
}

/* Small Button */
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

/* Large Button */
.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
}
```

### 카드 (Card)
```css
.card {
  background: var(--neutral-0);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid var(--neutral-100);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-header {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--neutral-100);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--neutral-800);
  margin: 0;
}
```

### 입력 필드 (Input)
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid var(--neutral-200);
  font-size: 16px;
  color: var(--neutral-700);
  background: var(--neutral-0);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:invalid {
  border-color: var(--error-500);
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--neutral-700);
}
```

### 프로그레스 바 (Progress Bar)
```css
.progress-container {
  width: 100%;
  height: 8px;
  background: var(--neutral-100);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--success-400), var(--success-500));
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-bar.warning {
  background: linear-gradient(90deg, var(--warning-400), var(--warning-500));
}

.progress-bar.error {
  background: linear-gradient(90deg, var(--error-400), var(--error-500));
}
```

## 📊 차트 & 데이터 시각화

### 차트 색상 팔레트
```css
--chart-color-1: #3b82f6;  /* Primary Blue */
--chart-color-2: #10b981;  /* Success Green */
--chart-color-3: #f59e0b;  /* Warning Orange */
--chart-color-4: #ef4444;  /* Error Red */
--chart-color-5: #8b5cf6;  /* Purple */
--chart-color-6: #06b6d4;  /* Cyan */
--chart-color-7: #84cc16;  /* Lime */
--chart-color-8: #f97316;  /* Orange */
```

### 차트 스타일링
- **배경**: 투명 또는 매우 연한 중성색
- **격자선**: 연한 회색 (#f3f4f6)
- **텍스트**: 중간 회색 (#6b7280)
- **강조 요소**: 브랜드 컬러 사용

## 🔍 아이콘 시스템

### 아이콘 라이브러리
- **주요 라이브러리**: Heroicons, Lucide React
- **스타일**: Outline (기본), Solid (강조시)
- **크기**: 16px, 20px, 24px, 32px

### 아이콘 사용 가이드
```css
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
```

### 주요 아이콘 정의
- **체중**: 저울(Scale) 아이콘
- **식단**: 접시(Plate) 또는 사과(Apple) 아이콘  
- **운동**: 아령(Dumbbell) 또는 달리기(Running) 아이콘
- **목표**: 타겟(Target) 아이콘
- **진행률**: 차트(Chart) 아이콘
- **추가**: 플러스(Plus) 아이콘
- **편집**: 연필(Pencil) 아이콘
- **삭제**: 휴지통(Trash) 아이콘

## 📱 반응형 디자인

### 브레이크포인트
```css
/* Mobile First Approach */
--screen-sm: 640px;   /* 태블릿 */
--screen-md: 768px;   /* 작은 데스크톱 */
--screen-lg: 1024px;  /* 데스크톱 */
--screen-xl: 1280px;  /* 큰 데스크톱 */
--screen-2xl: 1536px; /* 매우 큰 화면 */
```

### 컨테이너 최대 너비
```css
.container {
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .container { max-width: 640px; padding: 0 24px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; padding: 0 32px; }
}
```

### 그리드 시스템
```css
.grid {
  display: grid;
  gap: 16px;
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

## ♿ 접근성 가이드

### 색상 대비
- **일반 텍스트**: 최소 4.5:1 대비율
- **큰 텍스트**: 최소 3:1 대비율
- **UI 컴포넌트**: 최소 3:1 대비율

### 포커스 상태
```css
.focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 스크린 리더
- **의미있는 alt 텍스트** 제공
- **aria-label** 적절히 사용
- **heading 구조** 논리적 순서 유지
- **form label** 명확한 연결

### 키보드 네비게이션
- **Tab 순서** 논리적 흐름
- **Enter/Space** 버튼 활성화
- **Escape** 모달 닫기
- **화살표 키** 메뉴 네비게이션

## 🎭 애니메이션

### 전환 효과
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;

/* 기본 전환 */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: var(--transition-base);
  transition-timing-function: ease;
}

/* 호버 효과 */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* 로딩 애니메이션 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 페이드 인 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
```

### 마이크로 인터랙션
- **버튼 클릭**: 약간의 스케일 변화
- **카드 호버**: 그림자 증가
- **폼 포커스**: 부드러운 테두리 색상 변화
- **로딩**: 스피너 또는 프로그레스 바
- **성공/에러**: 색상 변화와 아이콘 애니메이션