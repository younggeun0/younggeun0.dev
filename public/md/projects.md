# [프로젝트 경험](https://younggeun0.dev/project-experience)
## 메디쿼터스 (2023 ~ 현재)

### nugu 몰 최적화

```
배경
- 인터넷 속도가 한국에 비해 느린 일본에서 앱이 느리단 이슈가 주기적으로 인입
- 크롬 개발자도구 라이트하우스, 퍼포먼스 탭 측정결과가 좋지 않아 최적화를 진행

진행
- 불필요하게 큰 컴포넌트 작은 컴포넌트들로 분리, 스테이트 내려 구조 최적화
- 컨텍스트 API 적용하여 프롭 드릴링 제거
- form 요소 react-hook-form 적용, 불필요한 중복 상태값(isSubmitting, errors 등) 제거
- 서버 상태는 react-query로 관리하도록 수정, 캐시 사용으로 데이터 중복 요청 제거
- 뷰포트 밖 요소들은 렌더링되지 않도록 윈도우 가상화 적용
- 번들 사이즈가 더 작은 모듈로 교체(clsx, tanstack virtual)
- 외부 트래킹 모듈 nextjs 로드 전략 변경(beforeInteractive)하여 total blocking time 개선
- CDN 프리커넥트 링크 추가하여 FCP 개선
- LCP 이미지에 fetchPriority high 추가하여 LCP 개선
- CLS 발생 가능한 요소들에 aspect-ratio 스타일 적용하고 최소 높이 설정하여 레이아웃 쉬프트 방지
- 여백을 주기 위해서만 사용하던 VSpacer같은 컴포넌트 제거
- SSR이었던 페이지 중 ISR로 변경 가능한 페이지들은 ISR 적용

결과
- 크롬 개발자도구 라이트하우스, 퍼포먼스 탭 측정결과 FCP, LCP, CLS, total blocking time 개선
- 윈도우 가상화 적용 후 최초 렌더링 요소가 최대 90% 축소
- 몰 페이지 로딩 속도 개선
```

### nugu 몰 스타일링 서비스 개발

```
배경
- 브랜드/인플루언서가 스타일 컨텐츠를 직접 등록,게시하고픈 니즈가 있어 서비스 개발

진행
- 기획 1명, BE 1명, FE 3명 TF팀으로 구성됐었고 FE 리드를 맡아 협업하며 서비스 개발
- 주니어 개발자들과 페어 프로그래밍으로 진행하며 코칭 및 코드리뷰 진행
- hls.js를 이용한 동영상 스트리밍 구현
- react-virtualized를 이용한 윈도우 가상화 구현, 인피니티 스크롤 시 비디오 누적으로 인한 메모리 오버플로우 이슈 해결

결과
- 예상 기한에 맞춰 이슈 없이 서비스 출시
- 2025년 7월 기준 약 500명의 인플루언서가 4000개 이상의 컨텐츠를 등록, 평균 10% 장바구니 전환율 달성
```

### nugu 몰 프로모션 페이지 개발

```
배경
- 인터렉티브한 요소가 포함된 메인 프로모션 페이지 개발

진행
- 마케팅, 기획, 디자인팀과 협업, 스토리 보드 참고하여 프로모션 페이지 개발
- 프로모션을 위한 django 백앤드 개발도 같이 진행

결과
- 출석체크 이벤트, 랜덤 쿠폰, 선착순 쿠폰 등 다양한 프로모션 기능 구현
- 반복 사용되는 이벤트 관련 컴포넌트들 추상화하여 재사용성 향상
```

### Fun List 기여

```
배경
- 개선되면 좋을 것들을 Fun List(켄트 벡이 말한 TODO 목록)에 담았다가 여유가 있을때 꺼내 처리

진행
- 개발 환경에서 실제 CDN 이미지 대신 더미 이미지를 사용하는 환경변수 추가
- 프로모션 페이지 자동 교체 스케줄링 작업하여 프로모션을 위한 불필요한 배포 제거
- git PR template 추가하여 코드리뷰 시 필요한 정보를 필수 기입할 수 있게 가이드하여 참고할 수 있도록 함
- 점메추 슬랙봇 추가하여 점메추 기능 제공

결과
- 필요하다 생각하여 진행한 작업들이 팀에 공유되어 팀 전체 퍼포먼스 개선에 기여
```

### 2024~2023

```
nugu 몰 UI 고도화
- nextjs12→14로 버전업: nextjs 마이너 이슈 해결, 앱 라우터로 전환 가능한 기반 구축
- Figma 디자인 기반 디자인 리뉴얼: 기획, 디자인 팀과 협업하여 UI/UX 개선
- Storybook을 도입하여 일부 공용 컴포넌트들을 스토리로 추출: 구현이 파편화된 공용 컴포넌트들을 하나의 컴포넌트로 통합
- vitest, react testing library로 리팩터링 진행한 일부 컴포넌트들 TDD 진행: 테스트 코드 작성으로 컴포넌트 안정성 확보

nugu 몰 UI 고도화
- nextjs12→14로 버전업: nextjs 마이너 이슈 해결, 앱 라우터로 전환 가능한 기반 구축
- Figma 디자인 기반 디자인 리뉴얼: 기획, 디자인 팀과 협업하여 UI/UX 개선
- Storybook을 도입하여 일부 공용 컴포넌트들을 스토리로 추출: 구현이 파편화된 공용 컴포넌트들을 하나의 컴포넌트로 통합
- vitest, react testing library로 리팩터링 진행한 일부 컴포넌트들 TDD 진행: 테스트 코드 작성으로 컴포넌트 안정성 확보

nugu 기획전 퍼블리싱
- 디자인 요구사항에 맞춰 flex, grid를 이용하여 다양한 레이아웃 구성, 영상, 애니메이션 등 요구사항을 맞추기 위해 vimeo sdk, aos 등 모듈을 사용

nugu 몰, 어드민(Back Office) 개발
- cafe24 몰과 어드민을 자사 몰, 어드민으로 이관: cafe24 종속성 제거
- 스크래핑을 통해 cafe24 데이터 마이그레이션
- 게시물 관리 기능(tinymce, ace editor, dropzone) 구현
- 카테고리 관리 기능(fancytree) 구현
- 상품 관리 기능 구현
- 셀메이트 상품 동기화 기능 개발
```



## 에버온 (2022)

### 차세대 백오피스 기능 개발

```
- react-admin 프레임워크를 이용한 어드민 페이지 구현
- Keycloak을 이용한 RBAC SSO 구현
- Dooray! 그룹웨어 연동
- nivo 그래프 모듈을 이용한 통계 대시보드 구축
- 게시판으로 관리되던 고객 문의를 칸반보드 UI로 이관: 고객 문의 관리 환경 개선
- SVN으로 관리하던 소스코드를 Gitlab으로 이관: 소스코드 관리 환경 개선
```



## 포시에스 (2019 ~ 2022)

### 오즈리포트 HTML5 뷰어 솔루션 개발

```
- 다양한 브라우저 호환성(IE8~)을 고려하는 개발 경험
- 동일 로직을 사용하는 다양한 언어(C++, C#, Applet, ActionScript)의 제품들이 있어 다양한 개발 언어로 기능 포팅 경험
- 뷰어 내용을 스크린 리더(센스리더)로 읽을 수 있도록 접근성 개선
- 전자문서 출력 시 인증 바코드 솔루션 연동(MarkAny, SGA)
- opencv-js, zxing 라이브러리를 이용하여 인감 스캔, 카드 스캔 기능 구현
- 뷰어 동기화 중계 서버 모듈 개발
- WYSIWYG 편집기(summernote) 임베딩 기능 개발
```



# 토이프로젝트


## [모바일 청첩장(2025)](https://wedding-invitation-silk.vercel.app/)

```
모바일 청첩장 개발. 방명록, 길찾기 기능 제공

사용
- NextJS app router RSC
- tanstack query
- tailwindcss
- firebase
- NAVER map API # 라이센스 변경으로 현재는 제거

배포
- Vercel
```


## 메디쿼터스 자사몰 상품 모아보는 페이지(2025)

```
임직원용 자사몰 상품 모아보는 페이지 개발
자사몰 할인 상품을 할인가로 모아볼 수 있는 기능 제공

사용
- NextJS app router RSC
- tanstack query
- tailwindcss

배포
- Vercel
```


## [domado(2024)](https://github.com/younggeun0/domado)

```
일렉트론을 활용한 뽀모도로 앱
개인적으로 뽀모도로를 사용하기 위해 개발

사용
- electron-react-boilerplate

배포
- github release
```



## [react-simple-south-korea-map-chart(2022)](https://github.com/younggeun0/react-simple-south-korea-map-chart) 

```
간단한 한국 지도 차트 컴포넌트

사용
- React

배포
- npm
```


## [Pick Your Holds(2022)](https://github.com/younggeun0/PickYourHolds_React)

```
사진 촬영 후 클라이밍 문제를 만들어 이미지를 공유할 수 있는 웹앱

사용
- vanilaJS(jQuery), React

배포
- 이전 블로그(github.io)에 배포
```