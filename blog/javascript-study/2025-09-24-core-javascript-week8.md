---
slug: core-javascript-week8
title: "클로저"
authors: [junye0l]
tags: [JavaScript, 클로저, 스터디]
date: 2025-09-24T09:00:00+09:00
description: "클로저의 정의와 동작 원리, 실전 활용 사례와 메모리 관리 주의사항"
---

# 클로저(Closure)

## 개념

:::info 정의
클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상입니다.
:::

```javascript
function outer() {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
}

var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

1. `outer` 함수 내부에 변수 `a`와 함수 `inner`를 선언합니다
2. `inner` 함수는 외부 함수의 변수 `a`를 참조합니다
3. `outer` 함수는 `inner` 함수 자체를 반환합니다
4. `outer()` 호출로 반환된 `inner` 함수를 `outer2`에 저장합니다
5. `outer` 함수 실행이 종료되었지만, `outer2()` 호출 시 여전히 변수 `a`에 접근 가능합니다

## 동작 원리

1. 내부 함수가 외부 함수의 변수를 참조
2. 내부 함수가 외부로 전달됨
3. 가비지 컬렉터가 참조된 변수를 메모리에서 유지

## 메모리 관리

### 메모리 해제

클로저 사용이 완료되면 참조를 해제한다.

```javascript
var closure = outer();
// 사용 완료 후
closure = null;
```

1. `outer()` 함수를 호출하여 클로저를 생성합니다
2. 클로저 사용이 완료되면 `closure` 변수에 `null`을 할당합니다
3. 참조 카운트가 0이 되어 가비지 컬렉터가 메모리를 회수합니다

### 메모리 해제를 왜 해야할까?

클로저는 외부 함수의 변수를 참조하고 있어서 가비지 컬렉터가 해당 변수들을 메모리에서 제거하지 않는다.

클로저를 계속 사용하지 않는데도 참조가 남아있다면.

- 메모리 누수 발생: 불필요한 변수들이 메모리에 계속 남아있음
- 성능 저하: 메모리 사용량이 계속 증가
- 브라우저 크래시 위험: 메모리 부족으로 인한 문제

특히 이벤트 리스너나 타이머 함수에서 클로저를 사용할 때 제대로 정리하지 않으면 메모리가 계속 쌓인다.

## 활용 사례

### 콜백 함수에서 외부 데이터 사용

```javascript
function attachListener(name) {
  return function () {
    console.log(name + " 클릭됨");
  };
}

button.addEventListener("click", attachListener("버튼1"));
```

1. `attachListener` 함수는 `name` 매개변수를 받습니다
2. 내부에서 익명 함수를 반환하는데, 이 함수는 `name` 변수를 참조합니다
3. `attachListener("버튼1")` 호출 시 반환된 함수가 이벤트 리스너로 등록됩니다
4. 클릭 이벤트 발생 시 클로저로 인해 `name` 값이 유지되어 "버튼1 클릭됨"이 출력됩니다

### 정보 은닉

외부에서 접근할 수 없는 private 변수를 구현합니다.

```javascript
function createCounter() {
  var count = 0;

  return {
    increment: function () {
      return ++count;
    },
    decrement: function () {
      return --count;
    },
    getCount: function () {
      return count;
    },
  };
}

var counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount()); // 1
```

1. `createCounter` 함수 내부에 `count` 변수를 선언합니다
2. 객체를 반환하는데, 이 객체의 메소드들이 `count`를 참조합니다
3. `count` 변수는 외부에서 직접 접근할 수 없고, 오직 반환된 메소드를 통해서만 조작 가능합니다
4. `counter.increment()` 호출 시 클로저로 인해 `count` 값이 증가하고 결과를 반환합니다

### 부분 적용 함수

일부 인자를 미리 고정하고 나머지 인자를 나중에 전달합니다.

```javascript
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function add(a, b, c, d, e) {
  return a + b + c + d + e;
}

var add3 = partial(add, 1, 2, 3);
console.log(add3(4, 5)); // 15
```

1. `partial` 함수는 원본 함수 `fn`과 미리 적용할 인자들 `presetArgs`를 받습니다
2. 새로운 함수를 반환하는데, 이 함수는 나머지 인자들 `laterArgs`를 받습니다
3. `add3`는 `add` 함수에 1, 2, 3을 미리 적용한 부분 적용 함수입니다
4. `add3(4, 5)` 호출 시 모든 인자(1, 2, 3, 4, 5)가 합쳐져 원본 `add` 함수가 실행됩니다

### 디바운스 함수

연속된 함수 호출을 제어하여 마지막 호출만 실행되도록 합니다.

```javascript
function debounce(eventName, func, wait) {
  var timeoutId = null;
  return function (event) {
    var self = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
}

document.body.addEventListener("mousemove", debounce("move", handleMove, 500));
```

1. `debounce` 함수는 이벤트명, 실행할 함수, 대기 시간을 받습니다
2. `timeoutId` 변수는 클로저로 유지되어 타이머 상태를 추적합니다
3. 반환된 함수가 호출될 때마다 기존 타이머를 취소(`clearTimeout`)합니다
4. 새로운 타이머를 설정하여 `wait` 시간 후 `func`를 실행합니다
5. 연속 호출 시 타이머가 계속 재설정되어 마지막 호출만 실행됩니다

### 커링 함수

여러 인자를 받는 함수를 하나의 인자씩 받는 함수로 변환합니다.

```javascript
function curry5(func) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return func(a, b, c, d, e);
          };
        };
      };
    };
  };
}
```

1. `curry5` 함수는 5개 인자를 받는 함수를 커링으로 변환합니다
2. 각 단계에서 하나의 인자를 받아 다음 함수를 반환합니다
3. 마지막 인자를 받으면 모든 인자를 원본 함수에 전달하여 실행합니다

**ES6 화살표 함수로 간소화:**

```javascript
const curriedAdd = (a) => (b) => (c) => a + b + c;

console.log(curriedAdd(1)(2)(3)); // 6
```

1. 화살표 함수로 더 간결하게 표현 가능합니다
2. `curriedAdd(1)`은 `b => c => 1 + b + c` 함수를 반환합니다
3. `curriedAdd(1)(2)`는 `c => 1 + 2 + c` 함수를 반환합니다
4. `curriedAdd(1)(2)(3)`은 최종 결과 `6`을 반환합니다

:::tip 부분 적용 함수 vs 커링 함수

- **부분 적용 함수**: 여러 인자를 한 번에 전달 가능
- **커링 함수**: 한 번에 하나의 인자만 전달, 마지막 인자 전달 시 실행
  :::

## 요약

- 클로저는 내부 함수가 외부 함수의 변수에 접근하는 현상
- 가비지 컬렉션으로 인해 외부 함수 종료 후에도 변수가 유지됨
- 정보 은닉, 콜백 처리, 함수형 프로그래밍에 활용
- 사용 완료 후 `null` 할당으로 메모리 해제 필요
