---
slug: programmers-arithmetic-sequence
title: "[프로그래머스] x만큼 간격이 있는 n개의 숫자"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
date: 2025-09-12T09:00:00+09:00
description: "프로그래머스 Lv.1 - 등차수열 배열을 생성하는 문제 풀이"
---

프로그래머스 Level 1 문제 "x만큼 간격이 있는 n개의 숫자"

<!-- truncate -->

## 문제 설명

함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다.

## 제한 조건

- x는 -10000000 이상, 10000000 이하인 정수입니다.
- n은 1000 이하인 자연수입니다.

## 입출력 예

| x   | n   | answer       |
| --- | --- | ------------ |
| 2   | 5   | [2,4,6,8,10] |
| 4   | 3   | [4,8,12]     |
| -4  | 2   | [-4, -8]     |

## 해결 과정

1. **등차수열 이해**: x부터 시작해서 x씩 증가하는 수열 생성
2. **배열 생성**: n개의 요소를 가진 배열 만들기
3. **규칙 적용**: 각 인덱스에 x \* (인덱스 + 1) 값 할당

## 정답 코드

```javascript
function solution(x, n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(x * i);
  }
  return result;
}
```

## 코드 설명

1. **빈 배열 생성**: result = []로 결과를 담을 배열 초기화
2. **반복문**: 1부터 n까지 반복 (i는 몇 번째 요소인지를 나타냄)
3. **값 계산**: x \* i로 등차수열의 각 항 계산
4. **배열에 추가**: push()로 계산된 값을 배열에 추가
5. **결과 반환**: 완성된 배열 반환

## 다른 해결 방법

### 방법 1: Array.from 사용

```javascript
function solution(x, n) {
  return Array.from({ length: n }, (_, i) => x * (i + 1));
}
```

### 방법 2: map 사용

```javascript
function solution(x, n) {
  return Array(n)
    .fill()
    .map((_, i) => x * (i + 1));
}
```

### 방법 3: while문 사용

```javascript
function solution(x, n) {
  const result = [];
  let i = 1;
  while (i <= n) {
    result.push(x * i);
    i++;
  }
  return result;
}
```

### 방법 4: 스프레드 연산자와 keys 사용

```javascript
function solution(x, n) {
  return [...Array(n).keys()].map((i) => x * (i + 1));
}
```

## 배운 점

- **등차수열 개념**: 첫째항이 x이고 공차가 x인 등차수열
- **배열 생성 방법**: for문, Array.from, fill() 등 다양한 방법
- **함수형 프로그래밍**: map을 활용한 선언적 코드 작성
- **인덱스 활용**: 배열의 인덱스를 이용한 수학적 계산

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
