---
slug: programmers-string-to-integer
title: "Lv.1 - 문자열을 정수로 바꾸기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 타입변환]
date: 2025-09-13T09:00:00+09:00
description: "프로그래머스 Lv.1 - 문자열을 정수로 변환하는 타입 변환 문제 풀이"
---

프로그래머스 Level 1 문제 "문자열을 정수로 바꾸기"

<!-- truncate -->

## 문제 설명

문자열 s를 숫자로 변환한 결과를 반환하는 함수, solution을 완성하세요.

## 제한 조건

- s의 길이는 1 이상 5이하입니다.
- s의 맨앞에는 부호(+, -)가 올 수 있습니다.
- s는 부호와 숫자로만 이루어져있습니다.
- s는 "0"으로 시작하지 않습니다.

## 입출력 예

예를들어 str이 "1234"이면 1234를 반환하고, "-1234"이면 -1234를 반환하면 됩니다.
str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없습니다.

## 해결 과정

이 문제는 문자열을 숫자로 변환하는 기본적인 타입 변환 문제입니다:

1. **문자열 분석**: 부호가 있는지 확인
2. **타입 변환**: 문자열을 숫자로 변환
3. **결과 반환**: 변환된 숫자 반환

## 정답 코드

```javascript
function solution(s) {
  return parseInt(s);
}
```

## 코드 설명

1. **parseInt() 사용**: 문자열을 정수로 변환하는 가장 직접적인 방법
2. **부호 처리**: parseInt()는 자동으로 +, - 부호를 처리
3. **간단한 구현**: 한 줄로 해결 가능

## 다른 해결 방법

### 방법 1: Number 생성자 사용

```javascript
function solution(s) {
  return Number(s);
}
```

### 방법 2: + 연산자 사용

```javascript
function solution(s) {
  return +s;
}
```

### 방법 3: \* 연산자 사용

```javascript
function solution(s) {
  return s * 1;
}
```

### 방법 4: Math.floor 활용

```javascript
function solution(s) {
  return Math.floor(s);
}
```

## 타입 변환 방법 비교

| 방법       | 특징                 | 예시                    |
| ---------- | -------------------- | ----------------------- |
| parseInt() | 정수 변환, 문자 무시 | parseInt("123px") → 123 |
| Number()   | 엄격한 변환          | Number("123px") → NaN   |
| + 연산자   | 간결한 표현          | +"123" → 123            |
| \* 1       | 수학 연산 활용       | "123" \* 1 → 123        |

## 배운 점

- **타입 변환의 다양한 방법**: JavaScript의 여러 타입 변환 기법
- **parseInt vs Number**: 각각의 동작 방식과 차이점
- **부호 처리**: +, - 부호가 포함된 문자열 처리
- **간결한 코드**: 한 줄로 해결할 수 있는 단순한 문제

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
