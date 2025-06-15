# 🏷️ 바코드 생성기

React + TypeScript + Vite로 구현된 현대적인 바코드 생성기입니다.

## ✨ 주요 기능

- **다양한 바코드 형식 지원**: CODE128, EAN13, EAN8, UPC, CODE39, ITF14, ITF, MSI, pharmacode, codabar
- **실시간 미리보기**: 입력과 동시에 바코드가 실시간으로 생성됩니다
- **커스터마이징 옵션**:
  - 선 두께 조절
  - 바코드 높이 조절
  - 텍스트 표시/숨김 옵션
- **바코드 다운로드**: 생성된 바코드를 PNG 이미지로 다운로드
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **모던 UI**: 깔끔하고 직관적인 사용자 인터페이스

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론:
   ```bash
   git clone <repository-url>
   cd barcode-generator
   ```

2. 의존성 설치:
   ```bash
   npm install
   ```

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. 브라우저에서 `http://localhost:5173` 접속

### 빌드

프로덕션용 빌드:
```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 (Grid, Flexbox, 그라디언트)
- **바코드 생성**: JsBarcode
- **코드 품질**: ESLint

## 📖 사용법

1. **바코드 텍스트 입력**: 바코드로 변환할 텍스트나 숫자를 입력합니다
2. **형식 선택**: 드롭다운에서 원하는 바코드 형식을 선택합니다
3. **옵션 조정**: 슬라이더를 사용해 선 두께와 높이를 조절합니다
4. **미리보기 확인**: 오른쪽 패널에서 생성된 바코드를 확인합니다
5. **다운로드**: '바코드 다운로드' 버튼을 클릭해 PNG 파일로 저장합니다

## 🎨 지원하는 바코드 형식

| 형식 | 설명 | 용도 |
|------|------|------|
| CODE128 | 가장 일반적인 1차원 바코드 | 일반적인 상품, 배송 |
| EAN13 | 유럽 상품 번호 | 소매 상품 |
| EAN8 | EAN13의 단축형 | 소형 상품 |
| UPC | 북미 상품 코드 | 북미 소매 상품 |
| CODE39 | 알파벳과 숫자 지원 | 산업용, 재고 관리 |
| ITF14 | 배송 컨테이너용 | 물류, 배송 |

## 🔧 개발

### 코드 린팅

```bash
npm run lint
```

### 프리뷰 (빌드된 앱 미리보기)

```bash
npm run preview
```

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.
