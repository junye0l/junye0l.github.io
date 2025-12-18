---
slug: programmers-plus-minus
title: "[프로그래머스] 음양 더하기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
date: 2025-09-16T09:00:00+09:00
description: "프로그래머스 Lv.1 - 절댓값 배열과 부호 배열을 활용한 덧셈 문제 풀이"
---

프로그래머스 Level 1 문제 "음양 더하기"

<!-- truncate -->

## 📋 문제 설명

어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와 이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다. 실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.

## 🔒 제한사항

- absolutes의 길이는 1 이상 1,000 이하입니다.
- absolutes의 모든 수는 각각 1 이상 1,000 이하입니다.
- signs의 길이는 absolutes의 길이와 같습니다.
- signs[i] 가 참이면 absolutes[i] 의 실제 정수가 양수임을, 그렇지 않으면 음수임을 의미합니다.

## 📝 입출력 예

| absolutes | signs              | result |
| --------- | ------------------ | ------ |
| [4,7,12]  | [true,false,true]  | 9      |
| [1,2,3]   | [false,false,true] | 0      |

### 입출력 예 설명

**입출력 예 #1**

- signs가 [true,false,true] 이므로, 실제 수들의 값은 각각 4, -7, 12입니다.
- 따라서 세 수의 합인 9를 return 해야 합니다.

**입출력 예 #2**

- signs가 [false,false,true] 이므로, 실제 수들의 값은 각각 -1, -2, 3입니다.
- 따라서 세 수의 합인 0을 return 해야 합니다.

## 💡 해결 과정

이 문제는 다음과 같은 단계로 접근할 수 있습니다:

1. **배열 순회**: absolutes 배열과 signs 배열을 동시에 순회
2. **부호 적용**: signs[i]가 true면 양수, false면 음수로 변환
3. **합계 계산**: 변환된 값들을 모두 더함

## ✅ 정답 코드

```javascript
function solution(absolutes, signs) {
  let sum = 0;
  for (let i = 0; i < absolutes.length; i++) {
    if (signs[i]) {
      sum += absolutes[i]; // 양수
    } else {
      sum -= absolutes[i]; // 음수
    }
  }
  return sum;
}
```

## 🔍 코드 설명

1. **변수 초기화**: `let sum = 0`으로 합계를 담을 변수 초기화

2. **for문 순회**: 배열의 길이만큼 반복하며 각 인덱스에 접근

3. **조건문으로 부호 판단**:

   - `signs[i]`가 true면 `absolutes[i]`를 그대로 더함
   - `signs[i]`가 false면 `absolutes[i]`를 빼기 (음수 효과)

4. **결과 반환**: 최종 합계 return

## 🚀 다른 해결 방법

### 방법 1: reduce 사용

```javascript
function solution(absolutes, signs) {
  return absolutes.reduce((sum, num, i) => {
    return sum + (signs[i] ? num : -num);
  }, 0);
}
```

### 방법 2: map과 reduce 조합

```javascript
function solution(absolutes, signs) {
  return absolutes
    .map((num, i) => (signs[i] ? num : -num))
    .reduce((sum, num) => sum + num, 0);
}
```

### 방법 3: 삼항연산자 활용

```javascript
function solution(absolutes, signs) {
  let sum = 0;
  for (let i = 0; i < absolutes.length; i++) {
    sum += signs[i] ? absolutes[i] : -absolutes[i];
  }
  return sum;
}
```

## 📚 배운 점

- **불리언 배열 활용**: true/false 값을 조건문에 직접 사용하는 방법
- **배열 인덱스 동시 접근**: 두 배열을 같은 인덱스로 접근하는 패턴
- **삼항연산자**: 간단한 조건문을 한 줄로 표현하는 방법
- **reduce 메서드**: 배열을 하나의 값으로 축약하는 함수형 프로그래밍 접근

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
