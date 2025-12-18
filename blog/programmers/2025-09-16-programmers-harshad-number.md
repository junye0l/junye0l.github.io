---
slug: programmers-harshad-number
title: "[프로그래머스] 하샤드 수"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 수학]
date: 2025-09-16T09:00:00+09:00
description: "프로그래머스 Lv.1 - 자릿수의 합으로 나누어떨어지는 하샤드 수를 판별하는 문제 풀이"
---

프로그래머스 Level 1 문제 "하샤드 수"

<!-- truncate -->

## 📋 문제 설명

양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.

## 🔒 제한 조건

- x는 1 이상, 10000 이하인 정수입니다.

## 📝 입출력 예

| x   | return |
| --- | ------ |
| 10  | true   |
| 12  | true   |
| 11  | false  |
| 13  | false  |

### 입출력 예 설명

**입출력 예 #1**

- 10의 모든 자릿수의 합은 1+0=1입니다. 10은 1로 나누어 떨어지므로 10은 하샤드 수입니다.

**입출력 예 #2**

- 12의 모든 자릿수의 합은 1+2=3입니다. 12는 3으로 나누어 떨어지므로 12는 하샤드 수입니다.

**입출력 예 #3**

- 11의 모든 자릿수의 합은 1+1=2입니다. 11은 2로 나누어 떨어지지 않으므로 11는 하샤드 수가 아닙니다.

**입출력 예 #4**

- 13의 모든 자릿수의 합은 1+3=4입니다. 13은 4로 나누어 떨어지지 않으므로 13은 하샤드 수가 아닙니다.

## 💡 해결 과정

이 문제는 다음과 같은 단계로 접근할 수 있습니다:

1. **자릿수 분리**: 숫자의 각 자릿수를 분리
2. **자릿수 합 계산**: 분리된 자릿수들을 모두 더함
3. **나누어떨어지는지 확인**: 원래 숫자가 자릿수 합으로 나누어떨어지는지 검사

## ✅ 정답 코드

```javascript
function solution(x) {
  let digitSum = 0;
  let temp = x;

  while (temp > 0) {
    digitSum += temp % 10;
    temp = Math.floor(temp / 10);
  }

  return x % digitSum === 0;
}
```

## 🔍 코드 설명

1. **변수 초기화**:

   - `digitSum`: 자릿수 합을 저장할 변수
   - `temp`: 원본 숫자를 보존하기 위한 임시 변수

2. **while문으로 자릿수 분리**:

   - `temp % 10`: 마지막 자릿수 추출
   - `digitSum += temp % 10`: 자릿수를 합계에 추가
   - `temp = Math.floor(temp / 10)`: 마지막 자릿수 제거

3. **하샤드 수 판별**: `x % digitSum === 0`
   - 원래 숫자를 자릿수 합으로 나눈 나머지가 0인지 확인

## 🚀 다른 해결 방법

### 방법 1: 문자열 변환 활용

```javascript
function solution(x) {
  const digitSum = String(x)
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return x % digitSum === 0;
}
```

### 방법 2: Array.from 사용

```javascript
function solution(x) {
  const digitSum = Array.from(String(x))
    .map(Number)
    .reduce((sum, digit) => sum + digit, 0);

  return x % digitSum === 0;
}
```

### 방법 3: for...of 반복문

```javascript
function solution(x) {
  let digitSum = 0;
  for (let digit of String(x)) {
    digitSum += Number(digit);
  }
  return x % digitSum === 0;
}
```

## 📚 배운 점

- **자릿수 분리 기법**: `% 10`과 `Math.floor(/ 10)`을 활용한 숫자 분해
- **문자열 변환 활용**: 숫자를 문자열로 변환해서 각 자릿수에 접근하는 방법
- **하샤드 수 개념**: 자릿수 합으로 나누어떨어지는 수의 특성
- **여러 접근법**: 수학적 방법과 문자열 처리 방법의 비교

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
