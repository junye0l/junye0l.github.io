---
slug: core-javascript-week7
title: "콜백함수"
authors: [junye0l]
tags: [JavaScript, 콜백함수, 비동기, Promise, async/await, 스터디]
---

코어 자바스크립트 스터디 7주차 내용을 정리했습니다. 이번 주제는 **콜백 함수**입니다.

<!-- truncate -->

## 🎯 콜백 함수란?

콜백 함수는 다른 함수에게 실행 권한을 맡기는 함수입니다.
쉽게 말해, "이 함수를 나중에 적절한 타이밍에 실행해줘!"라고 다른 함수에게 부탁하는 것과 같습니다.

### 기본 개념

```javascript
// 콜백 함수의 기본 개념
function 주문받기(메뉴, 완료시실행할함수) {
  console.log(`${메뉴} 준비 중...`);
  setTimeout(() => {
    console.log(`${메뉴} 완성!`);
    완료시실행할함수(); // 콜백 함수 실행
  }, 2000);
}

주문받기("아메리카노", function () {
  console.log("감사합니다!");
});
```

## ⏰ setInterval 예제

```javascript
let count = 0;
function 숫자세기() {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
}

// setInterval이 언제 실행할지 결정
const timer = setInterval(숫자세기, 300);
// 출력: 0, 1, 2, 3, 4 (0.3초 간격)
```

**핵심**: `setInterval`이 `숫자세기` 함수를 언제 실행할지 완전히 통제합니다.

## 🗺️ map 메서드와 매개변수 순서

```javascript
// map 메서드 예제
const 원본배열 = [10, 20, 30];
const 결과1 = 원본배열.map(function (값, 인덱스, 전체배열) {
  console.log(`값: ${값}, 인덱스: ${인덱스}`);
  return 값 + 5;
});
console.log(결과1); // [15, 25, 35]

// 매개변수 순서를 바꾸면?
const 결과2 = 원본배열.map(function (인덱스라고생각한것, 값이라고생각한것) {
  return 값이라고생각한것 + 5; // 실제로는 인덱스 + 5
});
console.log(결과2); // [5, 6, 7] (인덱스 0,1,2 + 5)
```

**주의사항**: 매개변수 이름은 중요하지 않습니다. 순서가 중요해요!

## 🎯 this 바인딩

### 콜백에서의 this 변화

```javascript
const 객체 = {
  데이터: [1, 2, 3],
  출력메서드: function (값, 인덱스) {
    console.log("this:", this, "값:", 값, "인덱스:", 인덱스);
  },
};

// 메서드로 호출 - this는 객체를 가리킴
객체.출력메서드(1, 2);
// this: {데이터: Array(3), 출력메서드: ƒ} 값: 1 인덱스: 2

// 콜백으로 전달 - this는 전역 객체를 가리킴
[4, 5, 6].forEach(객체.출력메서드);
// this: Window 값: 4 인덱스: 0
// this: Window 값: 5 인덱스: 1
// this: Window 값: 6 인덱스: 2
```

**교훈**: 콜백으로 전달되는 순간, 원래 객체와의 연결이 끊어집니다.

## 😱 콜백 지옥 (Callback Hell)

### 문제가 되는 코드

```javascript
setTimeout(
  function (name) {
    let coffeeList = name;
    console.log(coffeeList);
    setTimeout(
      function (name) {
        coffeeList += ", " + name;
        console.log(coffeeList);
        setTimeout(
          function (name) {
            coffeeList += ", " + name;
            console.log(coffeeList);
            setTimeout(
              function (name) {
                coffeeList += ", " + name;
                console.log(coffeeList);
              },
              500,
              "카페라떼"
            );
          },
          500,
          "카페모카"
        );
      },
      500,
      "아메리카노"
    );
  },
  500,
  "에스프레소"
);
```

**이 코드의 문제점**:

- 가독성이 매우 떨어짐
- 디버깅이 어려움
- 코드 수정이 복잡함

## 🛠️ 콜백 지옥 해결 방법

### 1. 함수 분리

```javascript
let coffeeList = "";

function 에스프레소추가(name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(아메리카노추가, 500, "아메리카노");
}

function 아메리카노추가(name) {
  coffeeList += ", " + name;
  console.log(coffeeList);
  setTimeout(모카추가, 500, "카페모카");
}

function 모카추가(name) {
  coffeeList += ", " + name;
  console.log(coffeeList);
  setTimeout(라떼추가, 500, "카페라떼");
}

function 라떼추가(name) {
  coffeeList += ", " + name;
  console.log(coffeeList);
}

setTimeout(에스프레소추가, 500, "에스프레소");
```

### 2. Promise 체이닝

```javascript
function 커피추가(name) {
  return function (prevName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newName = prevName ? `${prevName}, ${name}` : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
}

커피추가("에스프레소")()
  .then(커피추가("아메리카노"))
  .then(커피추가("카페모카"))
  .then(커피추가("카페라떼"));
```

**핵심 포인트**: `커피추가`는 고차함수(함수를 반환하는 함수)이고, 각 단계에서 Promise를 반환해서 체이닝이 가능합니다.

### 3. Generator

```javascript
function 커피준비(prevName, name) {
  setTimeout(() => {
    const newName = prevName ? `${prevName}, ${name}` : name;
    console.log(newName);
    커피메이커.next(newName); // 다음 단계로 진행
  }, 500);
}

function* 커피제조과정() {
  const 에스프레소 = yield 커피준비("", "에스프레소");
  const 아메리카노 = yield 커피준비(에스프레소, "아메리카노");
  const 모카 = yield 커피준비(아메리카노, "카페모카");
  const 라떼 = yield 커피준비(모카, "카페라떼");
  return "주문 완료!";
}

const 커피메이커 = 커피제조과정();
커피메이커.next(); // 제조 과정 시작
```

**핵심 포인트**: `yield`로 함수를 멈추고, `next()`로 다시 시작하는 특별한 함수입니다.

### 4. async/await (추천!)

```javascript
function 커피만들기(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(name), 500);
  });
}

async function 커피주문() {
  let 주문목록 = "";

  const 항목추가 = async (name) => {
    const 커피 = await 커피만들기(name);
    주문목록 += (주문목록 ? ", " : "") + 커피;
    console.log(주문목록);
  };

  await 항목추가("에스프레소");
  await 항목추가("아메리카노");
  await 항목추가("카페모카");
  await 항목추가("카페라떼");
}

커피주문();
```

**핵심 포인트**: 비동기 코드를 동기 코드처럼 위에서 아래로 읽을 수 있게 만드는 마법 같은 문법입니다!

## 📝 정리

### 콜백 함수란?

다른 함수에게 "나중에 실행해줘"라고 맡기는 함수

### 콜백 함수의 특징:

- 다른 함수의 매개변수로 전달됨
- 실행 시점은 호출하는 함수가 결정
- this 바인딩이 예상과 다를 수 있음

### 콜백 지옥 해결 방법:

1. **함수를 분리**해서 가독성 향상
2. **Promise**로 체인 구조 만들기
3. **Generator**로 실행 흐름 제어하기
4. **async/await**로 동기 코드처럼 작성하기 (추천!)

### 💡 실무 팁

콜백 함수를 사용할 때는 항상 "누가 언제 이 함수를 호출하는가?"를 생각해보세요. 그러면 예상치 못한 동작을 피할 수 있습니다!

---

**스터디**: 코어 자바스크립트 7주차
