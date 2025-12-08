---
slug: core-javascript-week5
title: "this"
authors: [junye0l]
tags: [JavaScript, this, 호출방식, call, apply, bind, 화살표함수, 스터디]
date: 2025-09-03T09:00:00+09:00
description: "JavaScript의 this 바인딩 규칙과 호출 방식에 따른 동작, call/apply/bind 메서드 활용법"
---

코어 자바스크립트 스터디 5주차 내용을 정리했습니다. 이번 주제는 **this**에 대한 모든 것입니다.

<!-- truncate -->

## 🎯 this의 핵심 개념

다른 언어에서 this는 클래스 안에서만 쓰이지만, JavaScript에서는 어디서든 this를 쓸 수 있어요. 그래서 헷갈리죠!

**핵심**: "this는 함수가 호출되는 순간에 결정된다"는 것입니다. 함수를 어떻게 호출하느냐에 따라 this가 가리키는 대상이 달라져요.

```javascript
// 같은 함수라도 호출 방식에 따라 this가 달라집니다
function 누구냐너() {
  console.log("나는", this);
}

누구냐너(); // 전역 객체 (Window)
const 객체 = { 메서드: 누구냐너 };
객체.메서드(); // 객체 자신
```

## 🌍 전역 공간에서의 this

```javascript
console.log(this); // 브라우저: Window 객체, Node.js: global 객체

// 전역 변수와 전역 객체의 관계
var 전역변수 = "안녕하세요";
console.log(전역변수); // '안녕하세요'
console.log(window.전역변수); // '안녕하세요'
console.log(this.전역변수); // '안녕하세요'
```

**핵심**: 전역 공간에서 this는 전역 객체를 가리킵니다. 그래서 전역 변수를 선언하면 자동으로 전역 객체의 프로퍼티가 됩니다.

## 📦 메서드로서 호출될 때의 this

```javascript
const 카페 = {
  이름: "스타벅스",
  인사하기: function () {
    console.log(`안녕하세요, ${this.이름}입니다!`);
  },
};

카페.인사하기(); // "안녕하세요, 스타벅스입니다!"
```

**핵심**: 메서드로 호출하면 점(.) 앞의 객체가 this가 됩니다.

## 🔧 함수로서 호출될 때의 this

```javascript
function 일반함수() {
  console.log(this); // Window 객체
}

일반함수(); // 함수로 호출하면 this는 전역 객체
```

**주의사항**: 이건 JavaScript의 설계 실수로 여겨집니다. 예상과 다르게 동작할 수 있어요!

### 메서드 내부 함수에서의 this 문제

```javascript
const 객체 = {
  이름: "외부",
  외부메서드: function () {
    console.log("외부 this:", this.이름); // '외부'

    function 내부함수() {
      console.log("내부 this:", this.이름); // undefined (전역 객체)
    }
    내부함수(); // 함수로 호출되어 this가 전역 객체

    // 해결방법 1: 화살표 함수 사용
    const 화살표함수 = () => {
      console.log("화살표 this:", this.이름); // '외부'
    };
    화살표함수();

    // 해결방법 2: 다른 객체의 메서드로 만들기
    const 내부객체 = {
      메서드: 내부함수,
    };
    내부객체.메서드(); // 내부객체가 this
  },
};

객체.외부메서드();
```

**화살표 함수의 특별함**: 화살표 함수는 자신만의 this를 만들지 않고, 상위 스코프의 this를 그대로 사용합니다.

## 📞 콜백 함수 호출 시의 this

```javascript
// 기본적으로 전역 객체를 가리킴
[1, 2, 3].forEach(function (item) {
  console.log(this); // Window 객체
});

// 하지만 일부 메서드는 this를 지정해줌
document.getElementById("버튼").addEventListener("click", function () {
  console.log(this); // 클릭된 버튼 엘리먼트
});
```

**핵심**: 콜백 함수의 this는 그 함수를 호출하는 메서드가 결정합니다.

## 🏗️ 생성자 함수 호출 시의 this

```javascript
function 고양이(이름, 나이) {
  this.울음소리 = "야옹";
  this.이름 = 이름;
  this.나이 = 나이;
}

const 초코 = new 고양이("초코", 7);
console.log(초코);
// 고양이 {울음소리: '야옹', 이름: '초코', 나이: 7}
```

**핵심**: `new` 키워드로 호출하면 this는 새로 만들어질 인스턴스를 가리킵니다.

## 🎛️ call/apply 메서드로 this 바인딩

### call 메서드

```javascript
const 객체1 = { 이름: "철수" };
const 객체2 = { 이름: "영희" };

function 자기소개(나이, 취미) {
  console.log(
    `안녕하세요, 저는 ${this.이름}이고 ${나이}살이며 ${취미}를 좋아해요.`
  );
}

자기소개.call(객체1, 25, "독서");
// "안녕하세요, 저는 철수이고 25살이며 독서를 좋아해요."

자기소개.call(객체2, 23, "영화감상");
// "안녕하세요, 저는 영희이고 23살이며 영화감상을 좋아해요."
```

### apply 메서드

```javascript
function 합계계산(a, b, c) {
  console.log(`${this.이름}의 계산 결과:`, a + b + c);
}

const 계산기 = { 이름: "스마트 계산기" };

// call과 apply의 차이점
합계계산.call(계산기, 1, 2, 3); // 인수를 하나씩
합계계산.apply(계산기, [1, 2, 3]); // 인수를 배열로
```

### 실용 예제: 유사배열객체에 배열 메서드 사용

```javascript
// 유사배열객체 (Array-like Object)
const 유사배열 = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

// 배열 메서드를 빌려 쓰기
Array.prototype.push.call(유사배열, "d");
console.log(유사배열);
// {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}

const 진짜배열 = Array.prototype.slice.call(유사배열);
console.log(진짜배열); // ['a', 'b', 'c', 'd']
```

## 🔒 bind 메서드

```javascript
function 인사(인사말, 마무리) {
  console.log(`${인사말}, 저는 ${this.이름}입니다. ${마무리}!`);
}

const 사람 = { 이름: "김철수" };

// this만 고정
const 철수인사 = 인사.bind(사람);
철수인사("안녕하세요", "만나서 반가워요");
// "안녕하세요, 저는 김철수입니다. 만나서 반가워요!"

// this + 일부 인수까지 고정 (부분 적용 함수)
const 철수안녕 = 인사.bind(사람, "안녕하세요");
철수안녕("좋은 하루 되세요");
// "안녕하세요, 저는 김철수입니다. 좋은 하루 되세요!"
```

```javascript
// bind로 만든 함수는 이름에 'bound'가 붙음
console.log(인사.name); // 'insa'
console.log(철수인사.name); // 'bound insa'
```

### 실용 예제: setTimeout에서 this 문제 해결

```javascript
const 타이머객체 = {
  메시지: "시간이 됐습니다!",
  지금알림: function () {
    console.log(this.메시지);
  },
  나중알림1: function () {
    // 문제: setTimeout의 콜백은 전역 객체를 this로 함
    setTimeout(this.지금알림, 1000); // undefined
  },
  나중알림2: function () {
    // 해결: bind로 this 고정
    setTimeout(this.지금알림.bind(this), 1000); // '시간이 됐습니다!'
  },
  나중알림3: function () {
    // 해결: 화살표 함수 사용
    setTimeout(() => this.지금알림(), 1000); // '시간이 됐습니다!'
  },
};

타이머객체.나중알림1(); // undefined 출력
타이머객체.나중알림2(); // '시간이 됐습니다!' 출력
타이머객체.나중알림3(); // '시간이 됐습니다!' 출력
```

## ⚡ 화살표 함수의 특별한 this

```javascript
// HTML: <button id="버튼">클릭하세요</button>
document.getElementById("버튼").addEventListener("click", function () {
  console.log(this); // 버튼 엘리먼트
  this.style.color = "red"; // 버튼 글자색이 빨간색으로 변경
});

// 화살표 함수를 쓰면?
document.getElementById("버튼").addEventListener("click", () => {
  console.log(this); // Window 객체 (주의!)
});
```

### thisArg 매개변수 활용

```javascript
const 학급 = {
  이름: "3학년 1반",
  학생들: ["철수", "영희", "민수"],
  출석체크: function () {
    // thisArg 매개변수로 this 지정
    this.학생들.forEach(function (학생) {
      console.log(`${this.이름}: ${학생} 출석`);
    }, this); // 여기서 this를 전달!

    // 또는 화살표 함수 사용
    this.학생들.forEach((학생) => {
      console.log(`${this.이름}: ${학생} 출석`);
    });
  },
};

학급.출석체크();
// "3학년 1반: 철수 출석"
// "3학년 1반: 영희 출석"
// "3학년 1반: 민수 출석"
```

## 🐛 this 디버깅 팁

```javascript
// this가 예상과 다르게 동작할 때 체크 포인트
function 디버깅함수() {
  console.log("함수명:", arguments.callee.name);
  console.log("호출 방식:", this === window ? "함수 호출" : "메서드 호출");
  console.log("this 값:", this);
  console.log("---");
}

const 객체 = { 메서드: 디버깅함수 };

디버깅함수(); // 함수 호출
객체.메서드(); // 메서드 호출
디버깅함수.call(객체); // call로 호출
```

## 📝 this 결정 규칙 정리

**this 결정 규칙 (우선순위 순)**:

1. **new 함수()** → 새로 생성된 인스턴스
2. **call/apply/bind** → 직접 지정한 객체
3. **객체.메서드()** → 점 앞의 객체
4. **함수()** → 전역 객체 (또는 strict mode에서 undefined)

**화살표 함수의 특별함**:

- 자신만의 this를 만들지 않음
- 상위 스코프의 this를 그대로 사용
- call/apply/bind로도 변경 불가

## 🎯 정리

- **this는 함수가 정의될 때가 아니라 호출될 때 결정됩니다**
- **호출 방식에 따라 this가 가리키는 대상이 달라집니다**
- **call/apply/bind로 this를 명시적으로 지정할 수 있습니다**
- **화살표 함수는 렉시컬 this를 사용합니다**
- **콜백 함수에서 this 문제를 해결하는 여러 방법이 있습니다**

**기억하세요**: this는 함수가 정의될 때가 아니라 호출될 때 결정됩니다! 🎯

---

**스터디**: 코어 자바스크립트 5주차
