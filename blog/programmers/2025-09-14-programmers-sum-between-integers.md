---
slug: programmers-sum-between-integers
title: "[프로그래머스] 두 정수 사이의 합"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 수학]
date: 2025-09-14T09:00:00+09:00
description: "프로그래머스 Lv.1 - 두 정수 사이에 있는 모든 정수의 합을 구하는 문제 풀이"
---

프로그래머스 Level 1 문제 "두 정수 사이의 합"

<!-- truncate -->

## 문제 설명

두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요. 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

## 제한 조건

- a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.
- a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.
- a와 b의 대소관계는 정해져있지 않습니다.

## 입출력 예

| a   | b   | return |
| --- | --- | ------ |
| 3   | 5   | 12     |
| 3   | 3   | 3      |
| 5   | 3   | 12     |

## 해결 과정

1. **대소관계 정리**: a와 b 중 작은 값과 큰 값을 구분
2. **범위 내 정수 합산**: 작은 값부터 큰 값까지 모든 정수를 더함
3. **등차수열 공식 활용**: 효율적인 계산을 위해 수학 공식 사용

## 정답 코드

```javascript
function solution(a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  // 등차수열의 합 공식: (첫째항 + 마지막항) × 항의 개수 / 2
  const count = max - min + 1;
  return ((min + max) * count) / 2;
}
```

## 코드 설명

1. **최솟값, 최댓값 구하기**: Math.min()과 Math.max()로 범위 설정
2. **항의 개수 계산**: max - min + 1로 범위 내 정수의 개수 구함
3. **등차수열 합 공식**: (첫째항 + 마지막항) × 항의 개수 / 2

## 다른 해결 방법

### 방법 1: for문 사용

```javascript
function solution(a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  let sum = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
  }

  return sum;
}
```

### 방법 2: while문 사용

```javascript
function solution(a, b) {
  let min = Math.min(a, b);
  const max = Math.max(a, b);
  let sum = 0;

  while (min <= max) {
    sum += min;
    min++;
  }

  return sum;
}
```

### 방법 3: 삼항연산자 활용

```javascript
function solution(a, b) {
    return a === b ? a : (a + b) * (Math.abs(a - b) + 1)
```
