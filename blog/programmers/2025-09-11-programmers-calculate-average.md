---
slug: programmers-calculate-average
title: "[프로그래머스] 평균 구하기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
date: 2025-09-11T09:00:00+09:00
description: "프로그래머스 Lv.1 - 배열의 평균값을 구하는 문제 풀이와 다양한 해결 방법"
---

프로그래머스 Level 1 문제 "평균 구하기"

<!-- truncate -->

## 문제설명

정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.

## 제한사항

- arr은 길이 1 이상, 100 이하인 배열입니다.
- arr의 원소는 -10,000 이상 10,000 이하인 정수입니다.

## 입출력 예

| arr       | return |
| --------- | ------ |
| [1,2,3,4] | 2.5    |
| [5,5]     | 5      |

## 해결 과정

1. **배열 합계 구하기**: 배열의 모든 원소를 더함
2. **개수로 나누기**: 합계를 배열의 길이로 나누어 평균 계산
3. **결과 반환**: 계산된 평균값 반환

## 정답 코드

```javascript
function solution(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}
```

## 코드 설명

1. **합계 변수 초기화**: sum = 0으로 배열 원소들의 합을 저장할 변수 생성
2. **for문으로 합계 계산**: 배열의 모든 원소를 순회하며 sum에 더하기
3. **평균 계산**: 총합을 배열의 길이로 나누어 평균 구하기
4. **결과 반환**: 계산된 평균값 반환

## 다른 해결 방법

### 방법 1: reduce 사용

```javascript
function solution(arr) {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum / arr.length;
}
```

### 방법 2: reduce 한 줄로

```javascript
function solution(arr) {
  return arr.reduce((sum, num) => sum + num) / arr.length;
}
```

### 방법 3: for...of 사용

```javascript
function solution(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum / arr.length;
}
```

### 방법 4: forEach 사용

```javascript
function solution(arr) {
  let sum = 0;
  arr.forEach((num) => (sum += num));
  return sum / arr.length;
}
```

## 배운 점

- **평균 계산의 기본**: 합계 ÷ 개수
- **배열 합계 구하기**: for문, reduce, forEach 등 다양한 방법
- **reduce 메서드**: 배열을 하나의 값으로 축약하는 함수형 프로그래밍
- **for...of vs for문**: 인덱스가 필요없을 때의 선택지

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
