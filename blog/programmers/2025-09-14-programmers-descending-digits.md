---
slug: programmers-descending-digits
title: "Lv.1 - 정수 내림차순으로 배치하기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 정렬]
date: 2025-09-14T09:00:00+09:00
---

프로그래머스 Level 1 문제 "정수 내림차순으로 배치하기"

<!-- truncate -->

## 문제 설명

함수 solution은 정수 n을 매개변수로 입력받습니다. n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요. 예를들어 n이 118372면 873211을 리턴하면 됩니다.

## 제한 조건

- n은 1이상 8000000000 이하인 자연수입니다.

## 입출력 예

| n      | return |
| ------ | ------ |
| 118372 | 873211 |

## 해결 과정

1. **숫자를 문자열로 변환**: 각 자릿수에 접근하기 위해
2. **문자열을 배열로 분리**: 각 자릿수를 개별 요소로 만들기
3. **내림차순 정렬**: 큰 수부터 작은 수 순으로 정렬
4. **다시 숫자로 변환**: 정렬된 문자열을 숫자로 변환

## 정답 코드

```javascript
function solution(n) {
  return parseInt(
    String(n)
      .split("")
      .sort((a, b) => b - a)
      .join("")
  );
}
```

## 코드 설명

1. **String(n)**: 숫자를 문자열로 변환
2. **.split('')**: 문자열을 각 자릿수별로 배열로 분리
3. **.sort((a, b) => b - a)**: 내림차순으로 정렬 (큰 수 → 작은 수)
4. **.join('')**: 배열을 다시 문자열로 합치기
5. **parseInt()**: 문자열을 정수로 변환

## 다른 해결 방법

### 방법 1: Number 생성자 사용

```javascript
function solution(n) {
  return Number(
    String(n)
      .split("")
      .sort((a, b) => b - a)
      .join("")
  );
}
```

### 방법 2: + 연산자 사용

```javascript
function solution(n) {
  return +String(n)
    .split("")
    .sort((a, b) => b - a)
    .join("");
}
```

### 방법 3: Array.from 사용

```javascript
function solution(n) {
  return parseInt(
    Array.from(String(n))
      .sort((a, b) => b - a)
      .join("")
  );
}
```

## 배운 점

- **문자열과 배열 변환**: split()과 join()을 활용한 데이터 변환
- **정렬 기준 설정**: sort() 메서드의 비교 함수 활용
- **타입 변환**: 문자열 ↔ 숫자 변환의 다양한 방법
- **메서드 체이닝**: 여러 메서드를 연결하여 간결한 코드 작성

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
