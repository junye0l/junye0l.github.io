---
slug: programmers-phone-number
title: "Lv.1 - 핸드폰 번호 가리기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
date: 2025-09-19T09:00:00+09:00
description: "프로그래머스 Lv.1 - 전화번호 뒷자리를 제외한 나머지를 *로 가리는 문자열 처리 문제 풀이"
---

프로그래머스 Level 1 문제 "핸드폰 번호 가리기"

<!-- truncate -->

## 📋 문제 설명

프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 \*으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.

## 🔒 제한사항

- phone_number는 길이 4 이상, 20이하인 문자열입니다.

## 📝 입출력 예

| phone_number  | return            |
| ------------- | ----------------- |
| "01033334444" | "0103333\*\*\*\*" |
| "027778888"   | "02777\*\*\*\*"   |

## 💡 해결 과정

이 문제는 다음과 같은 방법으로 접근할 수 있습니다:

1. **인덱스 찾기**: 맨 뒷 4자리를 제외한 문자열을 찾습니다.
2. **결과 반환**: 찾은 문자열을 \*로 치환한 후 나머지 4자리를 추가해줍니다.

## ✅ 정답 코드

```js
function solution(phone_number) {
  // substring와 replace를 이용해 일부분만 추출해 치환
  return (
    phone_number.substring(0, phone_number.length - 4).replace(/./g, "*") +
    phone_number.substring(phone_number.length - 4)
  );
}

// function solution(phone_number) { repeat를 이용해 *로 치환
//     return "*".repeat(phone_number.length - 4) + phone_number.slice(-4);
// }
```

## 🔍 코드 설명

**substring() 메서드, replace() 메서드, 플러스 연산자를 사용한 문자열 연결 방법**

1. phone_number에서 뒷 4자리 인덱스를 찾습니다.
2. phone_number에서 뒷 4자리 인덱스를 제외한 문자열을 찾습니다.
3. 찾은 문자열을 \*로 치환한 후 나머지 4자리를 추가해줍니다.

**_repeat() 메서드, slice() 메서드_**

1. phone_number 문자열의 길이 보다 4 적은 문자열들의 길이 만큼 \*로 치환해줍니다.
2. phone_number에서 slice(-4)를 사용하여 뒷 4자리 인덱스를 찾습니다.
3. 찾은 문자열들을 더하기 연산자로 합쳐 반환합니다.

## 📚 배운 점

- **substring() 메서드**: 특정 인덱스를 기준으로 문자열을 추출하는 유용한 메서드
- **replace() 메서드**: 특정 문자를 다른 문자로 치환하는 유용한 메서드
- **repeat() 메서드**: 특정 문자를 반복하여 문자열로 만드는 유용한 메서드
- **slice() 메서드**: 특정 인덱스를 기준으로 문자열을 추출하는 유용한 메서드
- **문자열 연결**: 플러스 연산자를 사용한 문자열 연결 방법
- **코드 간결성**: 복잡한 로직 없이 간단한 메서드로 문제 해결

---

**문제 출처**: [프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/12948)
