---
slug: programmers-sqrt-check
title: "Lv.1 - 정수 제곱근 판별"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 수학]
date: 2025-09-15T09:00:00+09:00
description: "프로그래머스 Lv.1 - 정수가 완전제곱수인지 판별하고 다음 제곱수를 구하는 문제 풀이"
---

프로그래머스 Level 1 문제 "정수 제곱근 판별"

<!-- truncate -->

## 문제 설명

임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다. n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

## 제한 사항

- n은 1이상, 50000000000000 이하인 양의 정수입니다.

## 입출력 예

| n   | return |
| --- | ------ |
| 121 | 144    |
| 3   | -1     |

### 입출력 예 설명

**입출력 예#1**

- 121은 양의 정수 11의 제곱이므로, (11+1)를 제곱한 144를 리턴합니다.

**입출력 예#2**

- 3은 양의 정수의 제곱이 아니므로, -1을 리턴합니다.

## 해결 과정

이 문제는 다음과 같은 단계로 접근할 수 있습니다:

1. **제곱근 계산**: Math.sqrt()를 사용해 n의 제곱근을 구함
2. **정수 여부 확인**: 제곱근이 정수인지 판별
3. **조건에 따른 반환**: 정수면 (제곱근+1)²을 반환, 아니면 -1 반환

## 정답 코드

```javascript
function solution(n) {
  const sqrt = Math.sqrt(n);

  if (sqrt === Math.floor(sqrt)) {
    return Math.pow(sqrt + 1, 2);
  } else {
    return -1;
  }
}
```

## 코드 설명

1. **제곱근 계산**: `Math.sqrt(n)`으로 n의 제곱근을 구함

2. **정수 판별**: `sqrt === Math.floor(sqrt)`

   - Math.floor()는 소수점 이하를 버림
   - 제곱근과 버림한 값이 같으면 정수

3. **결과 반환**:
   - 정수면: `Math.pow(sqrt + 1, 2)` - (제곱근+1)의 제곱
   - 정수가 아니면: -1 반환

## 다른 해결 방법

### 방법 1: Number.isInteger 사용

```javascript
function solution(n) {
  const sqrt = Math.sqrt(n);

  if (Number.isInteger(sqrt)) {
    return Math.pow(sqrt + 1, 2);
  } else {
    return -1;
  }
}
```

### 방법 2: 삼항연산자 사용

```javascript
function solution(n) {
  const sqrt = Math.sqrt(n);
  return Number.isInteger(sqrt) ? Math.pow(sqrt + 1, 2) : -1;
}
```

### 방법 3: \*\* 연산자 사용

```javascript
function solution(n) {
  const sqrt = Math.sqrt(n);
  return sqrt % 1 === 0 ? (sqrt + 1) ** 2 : -1;
}
```

## 배운 점

- **Math.sqrt() 활용**: 제곱근을 구하는 기본 메서드
- **정수 판별 방법**: Math.floor(), Number.isInteger(), % 연산자 활용
- **Math.pow() vs ** 연산자\*\*: 거듭제곱을 표현하는 두 가지 방법
- **제곱근의 성질**: 완전제곱수의 개념과 판별 방법

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
