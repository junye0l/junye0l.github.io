---
slug: programmers-seoul-kim
title: "Lv.1 - 서울에서 김서방 찾기"
authors: [junye0l]
tags: [프로그래머스, 알고리즘, 코딩테스트, JavaScript, 배열]
---

프로그래머스 Level 1 문제 "서울에서 김서방 찾기"

<!-- truncate -->

## 📋 문제 설명

String형 배열 seoul의 element중 "Kim"의 위치 x를 찾아, "김서방은 x에 있다"는 String을 반환하는 함수, solution을 완성하세요. seoul에 "Kim"은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.

## 🔒 제한사항

- seoul은 길이 1 이상, 1000 이하인 배열입니다.
- seoul의 원소는 길이 1 이상, 20 이하인 문자열입니다.
- "Kim"은 반드시 seoul 안에 포함되어 있습니다.

## 📝 입출력 예

| seoul           | return |
| --------------- | ------ |
| ["Jane", "Kim"] | 1      |

### 입출력 예 설명

**입출력 예 #1**

- Kim이 seoul의 1번째에 있으므로, "김서방은 1에 있다"를 return 해야 합니다.

## 💡 해결 과정

이 문제는 다음과 같은 방법으로 접근할 수 있습니다:

1. **인덱스 찾기**: seoul 배열에서 "Kim"이 있는 인덱스를 찾습니다
2. **결과 반환**: "김서방은 "과 인덱스를 결합하여 반환합니다

## ✅ 정답 코드

```js
function solution(seoul) {
  const idx = seoul.indexOf("Kim");
  return "김서방은 " + idx + "에 있다";
}
```

## 🔍 코드 설명

1. seoul 배열에서 'Kim'이 있는 인덱스를 찾습니다.
2. "김서방은 "과 찾은 인덱스, 그리고 "에 있다"를 문자열로 연결하여 반환합니다.

## 📚 배운 점

- **indexOf() 메서드**: 배열에서 특정 원소의 인덱스를 찾는 유용한 메서드
- **문자열 연결**: 플러스 연산자를 사용한 문자열 연결 방법
- **코드 간결성**: 복잡한 로직 없이 간단한 메서드로 문제 해결

---

**문제 출처**: [프로그래머스](https://school.programmers.co.kr/learn/courses/30/lessons/12919)
