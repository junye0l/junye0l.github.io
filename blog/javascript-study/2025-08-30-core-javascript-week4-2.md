---
slug: core-javascript-week4-2
title: "스코프와 클로저"
authors: [junye0l]
tags: [JavaScript, 스코프, 클로저, 렉시컬스코프, 호이스팅, 모듈패턴, 스터디]
date: 2025-08-30T09:00:00+09:00
---

코어 자바스크립트 스터디 4주차-2 내용을 정리했습니다. 이번 주제는 **스코프와 클로저**입니다.

<!-- truncate -->

## 🎯 스코프란?

스코프란 식별자(변수명)가 유효한 범위를 말합니다. 즉, 변수를 어디서 참조할 수 있는지를 결정하는 규칙입니다.

JavaScript에서 스코프는 함수 단위로 생성되며, 이는 다른 언어와 구분되는 중요한 특징입니다.

### 스코프의 종류

```javascript
var 전역변수 = "어디서든 접근 가능";

function 외부함수() {
  var 외부변수 = "외부 함수 내부에서만 접근";

  function 내부함수() {
    var 내부변수 = "내부 함수에서만 접근";
    console.log(전역변수); // ✅ 접근 가능
    console.log(외부변수); // ✅ 접근 가능
    console.log(내부변수); // ✅ 접근 가능
  }

  console.log(전역변수); // ✅ 접근 가능
  console.log(외부변수); // ✅ 접근 가능
  console.log(내부변수); // ❌ ReferenceError!
}

console.log(전역변수); // ✅ 접근 가능
console.log(외부변수); // ❌ ReferenceError!
console.log(내부변수); // ❌ ReferenceError!
```

## 🌍 전역 스코프 (Global Scope)

```javascript
var 전역변수 = "I am global";
let 전역렛 = "I am also global";
const 전역상수 = "I am global constant";

function 어디서든접근() {
  console.log(전역변수); // 'I am global'
  console.log(전역렛); // 'I am also global'
  console.log(전역상수); // 'I am global constant'
}

if (true) {
  console.log(전역변수); // 'I am global'
  console.log(전역렛); // 'I am also global'
  console.log(전역상수); // 'I am global constant'
}
```

**전역 스코프의 특징**:

- 어디서든 접근 가능
- 프로그램이 종료될 때까지 메모리에 유지
- 전역 네임스페이스 오염 주의

## 🔧 함수 스코프 vs 블록 스코프

```javascript
function 함수스코프예제() {
  var 함수변수 = "함수 내부 변수";
  let 함수렛 = "함수 내부 let";
  const 함수상수 = "함수 내부 const";

  if (true) {
    var 블록안var = "var는 함수 스코프";
    let 블록안let = "let은 블록 스코프";
    const 블록안const = "const도 블록 스코프";
  }

  console.log(함수변수); // ✅ '함수 내부 변수'
  console.log(함수렛); // ✅ '함수 내부 let'
  console.log(함수상수); // ✅ '함수 내부 const'
  console.log(블록안var); // ✅ 'var는 함수 스코프'
  console.log(블록안let); // ❌ ReferenceError!
  console.log(블록안const); // ❌ ReferenceError!
}

함수스코프예제();
```

**핵심**: var는 함수 스코프를 따르지만, let과 const는 블록 스코프를 따릅니다.

### 블록 스코프 예시

```javascript
{
  var 블록var = "var는 블록을 무시";
  let 블록let = "let은 블록에 갇힘";
  const 블록const = "const도 블록에 갇힘";
}

console.log(블록var); // ✅ 'var는 블록을 무시'
console.log(블록let); // ❌ ReferenceError!
console.log(블록const); // ❌ ReferenceError!

// for문에서의 차이
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100); // 3, 3, 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 100); // 0, 1, 2
}
```

## 🔗 스코프 체인 (Scope Chain)

스코프 체인이란 식별자를 찾기 위해 스코프를 연쇄적으로 탐색하는 메커니즘입니다.

```javascript
var 전역변수 = "전역";

function 단계1() {
  var 변수 = "단계1";

  function 단계2() {
    var 변수 = "단계2";

    function 단계3() {
      console.log(변수); // 어떤 값이 출력될까요?
    }
    단계3();
  }
  단계2();
}

단계1(); // '단계2' 출력
```

**스코프 체인 탐색 과정**:

1. 현재 스코프(단계3)에서 `변수` 찾기 → 없음
2. 상위 스코프(단계2)에서 `변수` 찾기 → 발견! ('단계2')
3. 더 이상 탐색하지 않고 해당 값 반환

## 📖 렉시컬 스코프 (Lexical Scope)

JavaScript는 렉시컬 스코프를 따릅니다. 이는 함수가 호출되는 위치가 아닌, **함수가 선언된 위치**에 따라 스코프가 결정된다는 의미입니다.

```javascript
var 글로벌 = "전역 변수";

function 함수1() {
  var 지역 = "함수1 지역 변수";
  함수2();
}

function 함수2() {
  console.log(글로벌); // ✅ 접근 가능 (전역에서 선언되었으니)
  console.log(지역); // ❌ ReferenceError! (함수2가 선언된 위치에서 지역 변수가 없음)
}

함수1();
```

**핵심**: 함수2가 함수1 내부에서 호출되었지만, 함수2는 전역에서 선언되었기 때문에 전역 스코프만 참조할 수 있습니다.

### 렉시컬 스코프 심화 예제

```javascript
var 변수 = "전역";

function 렉시컬예제() {
  var 변수 = "렉시컬";

  function 내부함수() {
    console.log(변수); // '렉시컬' - 선언 위치 기준
  }

  내부함수();
  return 내부함수;
}

function 다른함수() {
  var 변수 = "다른함수";
  var 가져온함수 = 렉시컬예제();
  가져온함수(); // 여전히 '렉시컬' - 호출 위치와 무관
}

다른함수();
```

## 🚀 호이스팅과 TDZ

### var 호이스팅

```javascript
console.log(변수); // undefined (선언은 호이스팅, 초기화는 안됨)
var 변수 = "할당됨";
console.log(변수); // '할당됨'

// 실제로는 이렇게 동작
var 변수; // undefined로 초기화 (호이스팅)
console.log(변수); // undefined
변수 = "할당됨";
console.log(변수); // '할당됨'
```

### let/const와 TDZ

```javascript
console.log(렛변수); // ❌ ReferenceError! (TDZ)
console.log(상수); // ❌ ReferenceError! (TDZ)

let 렛변수 = "let 값";
const 상수 = "const 값";

console.log(렛변수); // 'let 값'
console.log(상수); // 'const 값'
```

**TDZ (Temporal Dead Zone)**: let/const는 선언 전까지 접근할 수 없는 영역이 존재합니다.

## 🔐 클로저 (Closure)

클로저는 스코프 체인을 활용한 JavaScript의 강력한 기능입니다.

```javascript
function 외부함수(외부변수) {
  function 내부함수(내부변수) {
    console.log("외부변수:", 외부변수);
    console.log("내부변수:", 내부변수);
  }
  return 내부함수;
}

const 클로저함수 = 외부함수("외부에서 전달");
클로저함수("내부에서 전달");
// 외부변수: 외부에서 전달
// 내부변수: 내부에서 전달
```

### 클로저의 실용적 예제

```javascript
function 카운터만들기() {
  let 카운트 = 0;

  return {
    증가: function () {
      카운트++;
      return 카운트;
    },
    감소: function () {
      카운트--;
      return 카운트;
    },
    현재값: function () {
      return 카운트;
    },
  };
}

const 카운터1 = 카운터만들기();
const 카운터2 = 카운터만들기();

console.log(카운터1.증가()); // 1
console.log(카운터1.증가()); // 2
console.log(카운터2.증가()); // 1 (독립적인 스코프)
console.log(카운터1.현재값()); // 2
console.log(카운터2.현재값()); // 1
```

## 🐛 클로저 관련 주의사항

### 반복문에서의 클로저 문제

```javascript
// 문제가 있는 코드
var 버튼들 = [];
for (var i = 0; i < 3; i++) {
  버튼들[i] = function () {
    console.log("버튼", i, "클릭!"); // 모두 3을 출력
  };
}

버튼들[0](); // '버튼 3 클릭!'
버튼들[1](); // '버튼 3 클릭!'
버튼들[2](); // '버튼 3 클릭!'

// 해결책 1: let 사용
const 올바른버튼들1 = [];
for (let j = 0; j < 3; j++) {
  올바른버튼들1[j] = function () {
    console.log("버튼", j, "클릭!");
  };
}

올바른버튼들1[0](); // '버튼 0 클릭!'
올바른버튼들1[1](); // '버튼 1 클릭!'
올바른버튼들1[2](); // '버튼 2 클릭!'

// 해결책 2: 즉시실행함수(IIFE) 사용
const 올바른버튼들2 = [];
for (var k = 0; k < 3; k++) {
  올바른버튼들2[k] = (function (인덱스) {
    return function () {
      console.log("버튼", 인덱스, "클릭!");
    };
  })(k);
}

올바른버튼들2[0](); // '버튼 0 클릭!'
올바른버튼들2[1](); // '버튼 1 클릭!'
올바른버튼들2[2](); // '버튼 2 클릭!'
```

## 📦 모듈 패턴

### 즉시실행함수를 이용한 모듈

```javascript
const 모듈 = (function () {
  // 비공개 변수들
  let 비밀데이터 = "접근 불가";
  let 카운터 = 0;

  // 비공개 함수들
  function 비공개함수() {
    console.log("외부에서 호출 불가");
  }

  // 공개 API 반환
  return {
    공개메서드1: function () {
      카운터++;
      console.log("카운터:", 카운터);
    },
    공개메서드2: function () {
      비공개함수(); // 내부에서는 호출 가능
      return 비밀데이터.length;
    },
    getter: function () {
      return 카운터;
    },
  };
})();

모듈.공개메서드1(); // '카운터: 1'
console.log(모듈.getter()); // 1

// 비공개 요소들은 접근 불가
console.log(모듈.비밀데이터); // undefined
모듈.비공개함수(); // TypeError!
```

### ES6 모듈

```javascript
// math.js 파일
const PI = 3.14159;
let 계산횟수 = 0;

function 원넓이(반지름) {
  계산횟수++;
  return PI * 반지름 * 반지름;
}

function 원둘레(반지름) {
  계산횟수++;
  return 2 * PI * 반지름;
}

// 공개할 것만 export
export { 원넓이, 원둘레 };
export { PI as 파이상수 };

// main.js 파일
import { 원넓이, 원둘레, 파이상수 } from "./math.js";

console.log(원넓이(5)); // 78.53975
console.log(파이상수); // 3.14159
console.log(계산횟수); // ❌ ReferenceError! (비공개)
```

## ⚡ 성능 최적화 팁

```javascript
// 성능에 좋지 않은 예
function 성능나쁨() {
  for (let i = 0; i < 1000; i++) {
    // 반복문 안에서 함수 선언 (매번 새로 생성)
    const 헬퍼함수 = function () {
      return Math.random();
    };
    console.log(헬퍼함수());
  }
}

// 성능에 좋은 예
function 성능좋음() {
  // 함수를 반복문 밖에서 선언
  const 헬퍼함수 = function () {
    return Math.random();
  };

  for (let i = 0; i < 1000; i++) {
    console.log(헬퍼함수());
  }
}

// 스코프 체인 최적화
const 전역변수 = "전역값";

function 최적화예제() {
  // 자주 사용되는 전역 변수를 지역 변수로 캐싱
  const 로컬전역변수 = 전역변수;

  for (let i = 0; i < 10000; i++) {
    // 스코프 체인을 타고 올라가지 않아도 됨
    console.log(로컬전역변수);
  }
}
```

## 📝 정리

**스코프의 기본 규칙**:

1. **함수 스코프**: var는 함수 단위로 스코프 생성
2. **블록 스코프**: let/const는 블록 단위로 스코프 생성
3. **렉시컬 스코프**: 함수 선언 위치에 따라 스코프 결정
4. **스코프 체인**: 안쪽에서 바깥쪽으로 변수 탐색

**호이스팅 특징**:

- var: 선언과 초기화가 분리됨
- let/const: TDZ로 인해 선언 전 접근 불가

**기억하세요**: 스코프는 코드 작성 시점에 결정되며, 실행 시점의 호출 위치와는 무관합니다!

---

**스터디**: 코어 자바스크립트 4주차-2
