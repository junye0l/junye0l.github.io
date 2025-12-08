---
slug: core-javascript-week6
title: "call, apply, bind, 화살표 함수"
authors: [junye0l]
tags: [JavaScript, this, call, apply, bind, 화살표함수, 유사배열객체, 스터디]
date: 2025-09-10T09:00:00+09:00
description: "call, apply, bind 메서드의 사용법과 차이점, 화살표 함수의 this 바인딩 특성"
---

코어 자바스크립트 스터디 6주차 내용을 정리했습니다. 이번 주제는 **call, apply, bind 메서드와 화살표 함수**의 this 바인딩입니다.

<!-- truncate -->

## 📞 call 메서드

call 메서드는 **메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령**입니다.

```javascript
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

### 특징

- call 메서드의 **첫 번째 인자를 this로 바인딩**
- **이후의 인자들을 호출할 함수의 매개변수**로 사용
- 함수를 그냥 실행하면 this는 전역객체를 참조하지만, **call 메서드를 이용하면 임의의 객체를 this로 지정** 가능

```javascript
const obj = { name: "철수" };

function introduce(age, hobby) {
  console.log(
    `안녕하세요, 저는 ${this.name}이고 ${age}살이며 ${hobby}를 좋아합니다.`
  );
}

introduce.call(obj, 25, "독서");
// "안녕하세요, 저는 철수이고 25살이며 독서를 좋아합니다."
```

## 🍎 apply 메서드

apply 메서드는 **call 메서드와 기능적으로 완전히 동일**합니다.

```javascript
Function.prototype.apply(thisArg[, argsArray])
```

### call과의 차이점

**두 번째 인자를 배열로 받아** 그 배열의 요소들을 호출할 함수의 매개변수로 지정합니다.

```javascript
const obj = { name: "영희" };

function introduce(age, hobby) {
  console.log(
    `안녕하세요, 저는 ${this.name}이고 ${age}살이며 ${hobby}를 좋아합니다.`
  );
}

// call vs apply
introduce.call(obj, 23, "영화감상"); // 인수를 개별적으로
introduce.apply(obj, [23, "영화감상"]); // 인수를 배열로
```

## 🔄 유사배열객체에 배열 메서드 적용

객체에는 배열 메서드를 직접 적용할 수 없습니다. 하지만 **유사배열객체**의 경우 call/apply 메서드를 이용해 배열 메서드를 차용할 수 있습니다.

### 유사배열객체의 조건

- **키가 0 또는 양의 정수인 프로퍼티가 존재**
- **length 프로퍼티의 값이 0 또는 양의 정수**인 객체

```javascript
const obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

// 배열 메서드를 객체에 적용
Array.prototype.push.call(obj, "d");
console.log(obj); // {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}

// 객체를 배열로 전환
const arr = Array.prototype.slice.call(obj);
console.log(arr); // ['a', 'b', 'c', 'd']
```

### slice 메서드의 특별한 활용

**slice 메서드**는 매개변수를 아무것도 넘기지 않을 경우 **원본 배열의 얕은 복사본을 반환**합니다. 이를 이용해 유사배열객체를 배열로 전환할 수 있습니다.

### 대표적인 유사배열객체들

```javascript
// 1. arguments 객체
function example() {
  const argsArray = Array.prototype.slice.call(arguments);
  console.log(argsArray);
}

// 2. NodeList
const nodeList = document.querySelectorAll("div");
const nodeArray = Array.prototype.slice.call(nodeList);

// 3. 문자열 (단, 읽기 전용이므로 변경 메서드는 에러)
const str = "hello";
const strArray = Array.prototype.slice.call(str);
console.log(strArray); // ['h', 'e', 'l', 'l', 'o']
```

### ES6의 개선사항

call/apply를 이용한 형변환은 본래 메서드의 의도와 다소 동떨어진 활용법입니다. **ES6에서는 더 명확한 방법을 제공**합니다:

```javascript
// ES6 Array.from 메서드
const obj = { 0: "a", 1: "b", 2: "c", length: 3 };
const arr = Array.from(obj);
console.log(arr); // ['a', 'b', 'c']
```

## 📊 apply 메서드의 실용적 활용

### 최대/최솟값 구하기

```javascript
const numbers = [10, 20, 30, 40, 50];

// 기존 방식 (apply 사용)
const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);

console.log(max); // 50
console.log(min); // 10

// ES6 spread operator (더 간단!)
const maxES6 = Math.max(...numbers);
const minES6 = Math.min(...numbers);
```

## 🔗 bind 메서드

bind 메서드는 **ES5에서 추가된 기능**으로, call과 비슷하지만 **즉시 호출하지 않고** 새로운 함수를 반환합니다.

```javascript
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

### 두 가지 목적

1. **함수에 this를 미리 적용**
2. **부분 적용 함수 구현**

```javascript
const obj = { name: "민수" };

function introduce(age, hobby, location) {
  console.log(
    `안녕하세요, 저는 ${this.name}이고 ${age}살이며 ${hobby}를 좋아하고 ${location}에 살아요.`
  );
}

// this만 바인딩
const boundIntroduce = introduce.bind(obj);
boundIntroduce(28, "게임", "서울");

// this + 일부 매개변수도 바인딩 (부분 적용 함수)
const partialBound = introduce.bind(obj, 28, "게임");
partialBound("서울");
// "안녕하세요, 저는 민수이고 28살이며 게임을 좋아하고 서울에 살아요."
```

### bind의 특별한 성질

```javascript
console.log(introduce.name); // 'introduce'
console.log(boundIntroduce.name); // 'bound introduce'
```

**name 프로퍼티에 'bound' 접두어가 붙어** 코드 추적이 더 수월합니다.

### 내부함수 this 문제 해결

```javascript
const obj = {
  outer: function () {
    console.log(this); // obj

    // 문제: 내부함수의 this는 전역객체
    function innerFunc() {
      console.log(this); // Window (전역객체)
    }

    // 해결: bind로 this 고정
    const boundInner = innerFunc.bind(this);
    boundInner(); // obj
  },
};
```

### 콜백함수에서의 this 제어

```javascript
const obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500); // Window
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000); // obj
  },
};
```

## ⚡ 화살표 함수의 특별한 this

**ES6에 새롭게 도입된 화살표 함수**는 실행 컨텍스트 생성 시 **this를 바인딩하는 과정이 제외**됩니다.

### 화살표 함수의 this 특징

- **함수 내부에 this가 아예 없음**
- **접근하면 스코프체인상 가장 가까운 this에 접근**
- **call/apply/bind로 this 변경 불가**

```javascript
const obj = {
  outer: function () {
    console.log(this); // obj

    // 일반 함수: this가 전역객체
    const innerFunc1 = function () {
      console.log(this); // Window
    };

    // 화살표 함수: 상위 스코프의 this 사용
    const innerFunc2 = () => {
      console.log(this); // obj
    };

    innerFunc1();
    innerFunc2();
  },
};
```

### 실용적 활용

```javascript
const obj = {
  name: "화살표",
  friends: ["철수", "영희", "민수"],

  // 기존 방식
  greetAll1: function () {
    this.friends.forEach(function (friend) {
      console.log(`${this.name}이 ${friend}에게 인사합니다.`); // undefined
    });
  },

  // 화살표 함수로 해결
  greetAll2: function () {
    this.friends.forEach((friend) => {
      console.log(`${this.name}이 ${friend}에게 인사합니다.`); // 정상 동작
    });
  },
};
```

## 🎯 thisArg를 받는 메서드들

일부 메서드는 **추가로 this로 지정할 객체(thisArg)를 인자로 받을 수 있습니다**:

```javascript
const obj = { multiplier: 3 };

const numbers = [1, 2, 3, 4, 5];

// thisArg 없이
numbers.forEach(function (num) {
  console.log(num * this.multiplier); // NaN (this는 전역객체)
});

// thisArg 활용
numbers.forEach(function (num) {
  console.log(num * this.multiplier); // 3, 6, 9, 12, 15
}, obj); // 두 번째 인자로 obj 전달
```

### thisArg를 받는 배열 메서드들

- `forEach(callback, thisArg)`
- `map(callback, thisArg)`
- `filter(callback, thisArg)`
- `some(callback, thisArg)`
- `every(callback, thisArg)`
- `find(callback, thisArg)`
- `findIndex(callback, thisArg)`

## 📝 this 바인딩 규칙 총정리

1. **전역공간에서의 this** → 전역객체 (브라우저: window, Node.js: global)
2. **메서드로서 호출한 경우** → 메서드 호출 주체 (메서드명 앞의 객체)
3. **함수로서 호출한 경우** → 전역객체 (메서드의 내부함수도 동일)
4. **콜백 함수 내부에서의 this** → 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따름
5. **생성자 함수에서의 this** → 생성될 인스턴스
6. **call, apply 메서드** → this를 명시적으로 지정하면서 함수 호출
7. **bind 메서드** → this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만듦
8. **화살표 함수** → 상위 스코프의 this를 그대로 활용 (바인딩 과정 없음)

## 🎯 정리

- **call/apply는 this를 지정하며 즉시 함수를 실행**합니다
- **bind는 this를 지정한 새로운 함수를 반환**합니다
- **유사배열객체에 call/apply로 배열 메서드를 적용**할 수 있습니다
- **화살표 함수는 자신만의 this를 갖지 않아** 상위 스코프의 this를 사용합니다
- **일부 배열 메서드는 thisArg 매개변수**로 this를 직접 지정할 수 있습니다

이러한 방법들을 활용하면 JavaScript에서 this를 더욱 유연하고 정확하게 제어할 수 있습니다! 🚀

---

**스터디**: 코어 자바스크립트 6주차
