---
slug: programmers-even-odd
title: "Lv.1 - 짝수와 홀수"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 조건문]
date: 2025-09-11T09:00:00+09:00
---

프로그래머스 Level 1 문제 "짝수와 홀수"

<!-- truncate -->

## 문제설명

정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 함수, solution을 완성해주세요.

## 제한조건

- num은 int 범위의 정수입니다.
- 0은 짝수입니다.

## 입출력 예

| num | return |
| --- | ------ |
| 3   | "Odd"  |
| 4   | "Even" |

## 해결 과정

1. **짝수/홀수 판별**: 나머지 연산자 %를 이용해 2로 나눈 나머지 확인
2. **조건문 활용**: 나머지가 0이면 짝수, 1이면 홀수
3. **문자열 반환**: 조건에 따라 "Even" 또는 "Odd" 반환

## 정답 코드

```javascript
function solution(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
```

## 코드 설명

1. **나머지 연산**: num % 2로 2로 나눈 나머지 계산
2. **조건 확인**: 나머지가 0이면 짝수 (Even)
3. **기본값**: 그렇지 않으면 홀수 (Odd)

## 다른 해결 방법

### 방법 1: 삼항연산자 사용

```javascript
function solution(num) {
  return num % 2 === 0 ? "Even" : "Odd";
}
```

### 방법 2: 비트 연산자 사용

```javascript
function solution(num) {
  return (num & 1) === 0 ? "Even" : "Odd";
}
```

### 방법 3: Math.abs 활용

```javascript
function solution(num) {
  return Math.abs(num) % 2 === 0 ? "Even" : "Odd";
}
```

### 방법 4: switch문 사용

```javascript
function solution(num) {
  switch (num % 2) {
    case 0:
      return "Even";
    case 1:
      return "Odd";
  }
}
```

## 배운 점

- **나머지 연산자 활용**: % 연산자로 짝수/홀수 판별
- **비트 연산**: & 연산자를 이용한 효율적인 짝수/홀수 판별
- **삼항연산자**: 간단한 조건문을 한 줄로 표현
- **기본 조건문**: if-else의 기본적인 사용법

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
