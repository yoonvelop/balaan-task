
# balaan_task_윤혜빈

발란 과제

## 💻 실행
<pre>
$ npm install          # 패키지 설치
$ npm run serve        # 실행
</pre>


## 📖 설명
- 페이지
    - 1.개인정보입력  : /signup/step1
    - 2.배송지정보입력 : /signup/step2
    - 3.결재정보입력 : /signup/step3
    - 4.회원가입 완료 : /signup/complete
    - / 의 경우 바로 개인정보 입력페이지로 이동

## 🛠 설치 Lib
#### 필수
- Vue3

#### 추가 라이브러리
- vuex: 상태 관리
- typescript : 타입 가드
- vue-router: 라우팅 관리
- eslint, prettier: 자동 포맷 

## 🏛️ 구조
- /components: 재사용 가능한 컴포넌트
- /views: 라우트별 페이지 컴포넌트
- /store: vuex 상태 관리
- /router: router 설정