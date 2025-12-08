---
slug: core-javascript-week2
title: "실행 컨텍스트와 불변 객체"
authors: [junye0l]
tags: [JavaScript, 불변객체, 얕은복사, 깊은복사, 언디파인드, 널, 스터디]
date: 2025-08-13T09:00:00+09:00
description: "불변 객체의 개념과 얕은 복사, 깊은 복사의 차이점, undefined와 null의 활용법 정리"
---

코어 자바스크립트 스터디 2주차 내용을 정리했습니다. 이번 주제는 **실행 컨텍스트**와 **불변 객체**입니다.

<!-- truncate -->

## 🔒 불변 객체 (Immutable Object)

불변 객체는 내부 상태가 변하지 않는 객체를 의미합니다. 프로그래밍에서는 특히 함수형 프로그래밍, 라이브러리/프레임워크, 디자인 패턴 등에서 불변 객체 개념이 자주 등장합니다.

### 불변성의 중요성

- **기본형 데이터**는 값을 변경할 수 없습니다
- **참조형 데이터**도 프로퍼티를 바꾸지 않으면 변경된 것이 아닙니다
- 어떤 함수를 통해 객체를 전달받고 변경을 하더라도, **원본 객체는 절대로 변경되지 않아야 할 때**가 많습니다

## ⚠️ 가변성으로 인한 문제

```javascript
// 객체의 가변성에 따른 문제
var user = {
  name: "Jaenam",
  gender: "male",
};

var changeName = function (user, newName) {
  var newUser = user;
  newUser.name = newName;
  return newUser;
};

var user2 = changeName(user, "Jung");
console.log(user.name, user2.name); // Jung Jung
console.log(user === user2); // true (같은 객체)
```

**문제점**: `user2`가 바뀌면 `user`도 바뀜 → 두 객체는 같은 참조값을 가지므로 불변성이 깨짐

## ✅ 해결책: 새로운 객체 생성

```javascript
// 새로운 객체를 만들어 반환
var changeName = function (user, newName) {
  return {
    name: newName,
    gender: user.gender,
  };
};

var user2 = changeName(user, "Jung");
console.log(user.name, user2.name); // Jaenam Jung
console.log(user === user2); // false
```

**한계**: 하지만 이 방식은 객체가 커질수록 하드코딩해야 할 코드가 많아짐 → 비효율적

## 📋 복사 방식의 구분

| 복사 방식                    | 설명                                             |
| ---------------------------- | ------------------------------------------------ |
| **얕은 복사 (Shallow Copy)** | 1단계 값만 복사. 중첩 객체는 주소(참조)만 복사됨 |
| **깊은 복사 (Deep Copy)**    | 중첩된 내부 값까지 전부 재귀적으로 복사          |

## 🔄 얕은 복사 (Shallow Copy)

```javascript
var copyObject = function (target) {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};
```

**주의사항**: 얕은 복사는 참조형 데이터(객체, 배열 등)의 경우 동일한 메모리 주소를 참조하므로, 내부 프로퍼티가 바뀌면 원본도 영향 받음

## 🕳️ 깊은 복사 (Deep Copy)

### 재귀적 깊은 복사

```javascript
var copyObjectDeep = function (target) {
  var result = {};
  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]); // 재귀
    }
  } else {
    result = target;
  }
  return result;
};
```

**주의사항**:

- `typeof null === 'object'`이기 때문에, null은 따로 필터링 필요
- `hasOwnProperty`를 활용하면 프로토타입에서 상속된 프로퍼티는 제외 가능

### ES6+ 고급 복사

```javascript
// ES6 이상에서 getter/setter까지 복사하려면
Object.getOwnPropertyDescriptor(obj, prop);
Object.getOwnPropertyDescriptors(obj);
```

### JSON을 이용한 간단한 깊은 복사

```javascript
const deepCopied = JSON.parse(JSON.stringify(obj));
```

**한계**: `undefined`, 함수, `Symbol`, `__proto__` 등은 복사되지 않음

## 🤷 undefined vs null

자바스크립트에서 "없음"을 표현하는 두 가지 방법:

| 값            | 설명                                                     |
| ------------- | -------------------------------------------------------- |
| **undefined** | 자바스크립트가 자동으로 부여하거나, 명시적으로 지정 가능 |
| **null**      | 개발자가 명시적으로 설정하는 '값이 없음'                 |

### undefined가 자동으로 부여되는 경우

```javascript
let x;
console.log(x); // undefined

const obj = {};
console.log(obj.name); // undefined

function noReturn() {}
console.log(noReturn()); // undefined
```

### 배열에서의 undefined vs 빈 요소

```javascript
const arr1 = [1, undefined, 3];
const arr2 = [1, , 3];

arr1.forEach((v, i) => console.log(i, v));
// 0 1
// 1 undefined
// 2 3

arr2.forEach((v, i) => console.log(i, v));
// 0 1
// 2 3 → index 1은 순회되지 않음
```

**핵심**:

- **명시적 undefined는 실존**
- **비어있는 요소는 순회 대상 아님**

## 📝 undefined vs null 사용 지침

- **undefined**: 엔진이 자동으로 줄 수 있으며, 존재하지 않는 값을 의미
- **null**: 개발자가 의도적으로 비워두는 값

### 권장사항

의도적으로 값이 없음을 표현할 때는 `null`을 사용하고, `undefined`는 값이 할당되지 않은 상태로 두는 것이 좋습니다.

## 🎯 정리

- **불변 객체는 원본을 보호하기 위해 새로운 객체를 생성하는 패턴**
- **얕은 복사는 1단계만, 깊은 복사는 중첩된 모든 레벨을 복사**
- **JSON 방식은 간단하지만 제약사항이 있음**
- **undefined는 자동 할당, null은 개발자 의도**
- **빈 배열 요소와 undefined는 forEach에서 다르게 동작**

---

**스터디**: 코어 자바스크립트 2주차
