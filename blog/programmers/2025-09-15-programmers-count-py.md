---
slug: programmers-count-py
title: "Lv.1 - 문자열 내 p와 y의 개수"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 문자열]
date: 2025-09-15T09:00:00+09:00
---

프로그래머스 Level 1 문제 "문자열 내 p와 y의 개수"

<!-- truncate -->

## 문제 설명

대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

## 제한사항

- 문자열 s의 길이 : 50 이하의 자연수
- 문자열 s는 알파벳으로만 이루어져 있습니다.

## 입출력 예

| s         | answer |
| --------- | ------ |
| "pPoooyY" | true   |
| "Pyy"     | false  |

### 입출력 예 설명

**입출력 예 #1**

- 'p'의 개수 2개, 'y'의 개수 2개로 같으므로 true를 return 합니다.

**입출력 예 #2**

- 'p'의 개수 1개, 'y'의 개수 2개로 다르므로 false를 return 합니다.

## 해결 과정

1. **대소문자 통일**: 문자열을 모두 소문자로 변환
2. **문자 개수 계산**: 'p'와 'y'의 개수를 각각 셈
3. **개수 비교**: 두 개수가 같은지 확인

## 정답 코드

```javascript
function solution(s) {
  const lowerS = s.toLowerCase();
  let pCount = 0;
  let yCount = 0;

  for (let i = 0; i < lowerS.length; i++) {
    if (lowerS[i] === "p") {
      pCount++;
    } else if (lowerS[i] === "y") {
      yCount++;
    }
  }

  return pCount === yCount;
}
```

## 코드 설명

1. **대소문자 변환**: `toLowerCase()`로 모든 문자를 소문자로 변환
2. **카운터 초기화**: p와 y의 개수를 저장할 변수 생성
3. **반복문으로 카운팅**: 각 문자를 확인하여 해당하는 카운터 증가
4. **결과 반환**: 두 카운터가 같은지 비교

## 다른 해결 방법

### 방법 1: filter 사용

```javascript
function solution(s) {
  const lowerS = s.toLowerCase();
  const pCount = lowerS.split("").filter((char) => char === "p").length;
  const yCount = lowerS.split("").filter((char) => char === "y").length;
  return pCount === yCount;
}
```

### 방법 2: match 사용

```javascript
function solution(s) {
  const pCount = (s.toLowerCase().match(/p/g) || []).length;
  const yCount = (s.toLowerCase().match(/y/g) || []).length;
  return pCount === yCount;
}
```

### 방법 3: reduce 사용

```javascript
function solution(s) {
  const counts = s
    .toLowerCase()
    .split("")
    .reduce(
      (acc, char) => {
        if (char === "p") acc.p++;
        if (char === "y") acc.y++;
        return acc;
      },
      { p: 0, y: 0 }
    );

  return counts.p === counts.y;
}
```

## 배운 점

- **대소문자 처리**: toLowerCase()를 활용한 문자열 정규화
- **문자 개수 세기**: for문, filter, match 등 다양한 방법
- **정규식 활용**: match()와 정규식을 이용한 문자 탐색
- **조건문 활용**: 특정 문자에 대한 조건 처리

---

**문제 출처**: [프로그래머스](https://programmers.co.kr/)
