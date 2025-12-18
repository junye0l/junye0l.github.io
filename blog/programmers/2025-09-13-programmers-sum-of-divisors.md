---
slug: programmers-sum-of-divisors
title: "[프로그래머스] 약수의 합"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 수학]
date: 2025-09-13T09:00:00+09:00
description: "프로그래머스 Lv.1 - 주어진 정수의 약수를 구하고 합계를 계산하는 문제 풀이"
---

프로그래머스 Level 1 문제 "약수의 합"

<!-- truncate -->

## 문제 설명

정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

## 제한 사항

- n은 0 이상 3000이하인 정수입니다.

## 입출력 예

| n   | return |
| --- | ------ |
| 12  | 28     |
| 5   | 6      |

### 입출력 예 설명

**입출력 예 #1**

- 12의 약수는 1, 2, 3, 4, 6, 12입니다. 이를 모두 더하면 28입니다.

**입출력 예 #2**

- 5의 약수는 1, 5입니다. 이를 모두 더하면 6입니다.

## 해결 과정

1. **약수 찾기**: 1부터 n까지의 수 중에서 n을 나누어떨어뜨리는 수들을 찾기
2. **약수 합계**: 찾은 약수들을 모두 더하기
3. **결과 반환**: 약수들의 합을 반환

## 정답 코드

```javascript
function solution(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }
  return sum;
}
```

## 코드 설명

1. **변수 초기화**: sum = 0으로 약수들의 합을 저장할 변수 초기화
2. **반복문**: 1부터 n까지 모든 수를 확인
3. **약수 판별**: n % i === 0이면 i는 n의 약수
4. **합계 계산**: 약수를 찾을 때마다 sum에 더하기
5. **결과 반환**: 최종 합계 반환

## 다른 해결 방법

### 방법 1: 효율적인 방법 (제곱근까지만 확인)

```javascript
function solution(n) {
  let sum = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) {
        sum += n / i;
      }
    }
  }
  return sum;
}
```

### 방법 2: filter와 reduce 사용

```javascript
function solution(n) {
  return Array.from({ length: n }, (_, i) => i + 1)
    .filter((i) => n % i === 0)
    .reduce((sum, divisor) => sum + divisor, 0);
}
```

### 방법 3: while문 사용

```javascript
function solution(n) {
  let sum = 0;
  let i = 1;
  while (i <= n) {
    if (n % i === 0) {
      sum += i;
    }
    i++;
  }
  return sum;
}
```

## 배운 점

- **약수의 개념**: 어떤 수를 나누어떨어뜨리는 수
- **나머지 연산자 활용**: % 연산자로 나누어떨어지는지 확인
- **최적화 방법**: 제곱근까지만 확인하여 시간복잡도 개선
- **함수형 프로그래밍**: filter와 reduce를 활용한 선언적 코드

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
