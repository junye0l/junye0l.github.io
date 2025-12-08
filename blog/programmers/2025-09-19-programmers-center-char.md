---
slug: programmers-center-char
title: "Lv.1 - 가운데 글자 가져오기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
date: 2025-09-19T09:00:00+09:00
description: "프로그래머스 Lv.1 - 문자열의 가운데 글자를 추출하는 문자열 처리 문제 풀이"
---

프로그래머스 Level 1 문제 "가운데 글자 가져오기"

<!-- truncate -->

## 📋 문제 설명

단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

## 🔒 제한사항

- s는 길이가 1 이상, 100이하인 스트링입니다.

## 📝 입출력 예

| s       | return |
| ------- | ------ |
| "abcde" | "c"    |
| "qwer"  | "we"   |

## 💡 해결 과정

이 문제는 다음과 같은 방법으로 접근할 수 있습니다:

1. **가운데 글자 찾기**: s.length / 2를 사용하여 가운데 인덱스를 찾습니다.
2. **결과 반환**: 짝수라는 조건을 사용하여 그에 맞는 substring() 메서드를 이용하여 값을 반환합니다.

## ✅ 정답 코드

```js
function solution(s) {
  const CENTER = s.length / 2;

  return s.length % 2 === 0
    ? s.substring(CENTER - 1, CENTER + 1)
    : s.substring(CENTER, CENTER + 1);
}
```

## 🔍 코드 설명

**substring() 메서드, 삼항 연산자, 산술 연산자를 사용한 문자열 연결 방법**

1. s.length / 2를 사용하여 가운데 인덱스를 찾습니다.
2. s.length % 2 === 0를 사용하여 짝수인지 홀수인지 구분합니다.
3. 짝수라면 s.substring(CENTER - 1 , CENTER+ 1)를 사용하여 가운데 두글자를 반환합니다.
4. 홀수라면 s.substring(CENTER, CENTER + 1)를 사용하여 가운데 한글자를 반환합니다.

## 📚 배운 점

- **substring() 메서드**: 특정 인덱스를 기준으로 문자열을 추출하는 유용한 메서드
- **삼항 연산자**: 조건에 따라 다른 값을 반환하는 유용한 연산자
- **산술 연산자**: 산술 연산을 수행하는 유용한 연산자
- **코드 간결성**: 복잡한 로직 없이 간단한 메서드로 문제 해결

---

**문제 출처**: [프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/12903)
