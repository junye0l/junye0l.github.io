---
slug: programmers-missing-numbers
title: "Lv.1 - 없는 숫자 더하기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
date: 2025-09-17T09:00:00+09:00
description: "프로그래머스 Lv.1 - 0부터 9까지 숫자 중 배열에 없는 숫자의 합을 구하는 문제 풀이"
---

프로그래머스 Level 1 문제 "없는 숫자 더하기"

<!-- truncate -->

## 📋 문제 설명

0부터 9까지의 숫자 중 일부가 들어있는 정수 배열 numbers가 매개변수로 주어집니다. numbers에서 찾을 수 없는 0부터 9까지의 숫자를 모두 찾아 더한 수를 return 하도록 solution 함수를 완성해주세요.

## 🔒 제한사항

- 1 ≤ numbers의 길이 ≤ 9
- 0 ≤ numbers의 모든 원소 ≤ 9
- numbers의 모든 원소는 서로 다릅니다.

## 📝 입출력 예

| numbers           | result |
| ----------------- | ------ |
| [1,2,3,4,6,7,8,0] | 14     |
| [5,8,4,0,6,7,9]   | 6      |

### 입출력 예 설명

**입출력 예 #1**

- 5, 9가 numbers에 없으므로, 5 + 9 = 14를 return 해야 합니다.

**입출력 예 #2**

- 1, 2, 3이 numbers에 없으므로, 1 + 2 + 3 = 6을 return 해야 합니다.

## 💡 해결 과정

이 문제는 다음과 같은 방법으로 접근할 수 있습니다:

1. **전체 합 계산**: 0부터 9까지의 총합은 45입니다
2. **주어진 배열의 합 계산**: numbers 배열의 모든 원소 합을 구합니다
3. **차이 계산**: 전체 합에서 배열의 합을 빼면 없는 숫자들의 합이 됩니다

## ✅ 정답 코드

```javascript
function solution(numbers) {
  const totalSum = 45; // 0부터 9까지의 총합
  const numbersSum = numbers.reduce((acc, num) => acc + num, 0);
  return totalSum - numbersSum;
}
```

## 🔍 코드 설명

1. **전체 합 상수**: `const totalSum = 45`

   - 0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45

2. **배열 원소 합 계산**: `numbers.reduce((acc, num) => acc + num, 0)`

   - `reduce()` 메서드를 사용해 배열의 모든 원소를 더함
   - 초기값은 0으로 설정

3. **결과 반환**: `totalSum - numbersSum`
   - 전체 합에서 주어진 배열의 합을 빼면 없는 숫자들의 합

## 🚀 다른 해결 방법

### 방법 1: for문 사용

```javascript
function solution(numbers) {
  let sum = 0;
  for (let i = 0; i <= 9; i++) {
    if (!numbers.includes(i)) {
      sum += i;
    }
  }
  return sum;
}
```

### 방법 2: filter와 reduce 조합

```javascript
function solution(numbers) {
  return Array.from({ length: 10 }, (_, i) => i)
    .filter((num) => !numbers.includes(num))
    .reduce((acc, num) => acc + num, 0);
}
```

## 📚 배운 점

- **수학적 접근**: 전체 합에서 주어진 합을 빼는 효율적인 방법
- **reduce() 메서드**: 배열의 모든 원소를 하나의 값으로 축약하는 유용한 메서드
- **시간 복잡도**: O(n)으로 매우 효율적인 해결책
- **코드 간결성**: 수학적 사고로 복잡한 로직을 단순화

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
