---
slug: react-study-week1-2
title: "리액트 공식문서 스터디 1주차 - 2"
authors: [junye0l]
date: 2025-11-07T09:00:00+09:00
description: "JSX에서 중괄호를 사용한 JavaScript 표현식 삽입과 동적 UI 구현 방법"
---

> **Using curly braces: A window into the JavaScript world**

- 동적으로 값을 지정하려면 중괄호(`{}`)를 사용해 변수・함수・연산 결과 등 다양한 JS 표현식 삽입 할 수 있다.

```javascript
const name = "Gregorio Y. Zara";
return <h1>{name}'s To Do List</h1>;
// 변수를 JS 표현식으로 삽입
```

```javascript
<h1>To Do List for {formatDate(today)}</h1>
// 함수호출을 JS 표현식으로 삽입
```

> **✨참고사항✨**

- JSX 중괄호 `{}`에서는 자바스크립트 표현식만 허용된다.

  - 변수, 숫자, 산술 연산, 함수 호출, 배열 map/filter, 삼항(`?`), 논리 (`&&`) 등 값을 반환하는 코드만 쓸 수 있다.
  - 자바스크립트 문(`statement`)는 직접 쓸 수 없다.

    - if (조건) { }
    - for (...) { }
    - 변수 선언/할당 `const ~ let ~ var ~`
    - 함수 정의 `익명, 선언식`

  - 이러한 제어/분기/반복 로직은 JSX 바깥(컴포넌트 내부)에서 처리해 결과를 중괄호로 넣어야 한다.

<br />

> **Where to use curly braces**

- 중괄호 사용 위치는 JSX 태그 내 텍스트와 속성 값 2곳뿐이다.

  - `<h1>{name}'s To Do List</h1>` (텍스트)

  - `<img src={avatar} />` (속성값)

  - 문자열 전달과 구별되며, `src="avatar"`처럼 쓰면 문자열 그대로 넘어가서 동작이 다름.

<br />

> **Using "double curlies": CSS and other objects in JSX**

- 객체를 JSX에서 속성값으로 전달할 때는 중괄호를 두 번 겹침 (`{{}}`).

```javascript
<ul style={{ backgroundColor: "black", color: "pink" }}>...</ul>
// 인라인 스타일 예시
// 속성값이 객체이므로 JSX용 {} 객체용 {}가 중첩되어야 한다.
```

<br />

> **More fun with JavaScript objects and curly braces**

- 자바스크립트 객체를 여러 데이터로 정리하고, JSX에서 필요한 부분만 뽑아 쓸 수 있다.

```javascript
const person = { name: 'Gregorio Y. Zara', theme: { backgroundColor: 'black', color: 'pink' } };
...
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
  ...
</div>
// 객체 내부의 필요한 값들만 가져와서 사용할 수 있음.
```

<br />
<br />

> **함께 풀어보는 챌린지**

1. 아래 코드는 `Objects are not valid as a React child`를 표출한다.

```javascript
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

<br />

2. Extract the image URL into the person object.

```javascript
const person = {
  name: "Gregorio Y. Zara",
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className="avatar" src={person.imageUrl} alt="Gregorio Y. Zara" />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

<br />

3. Write an expression inside JSX curly braces

```javascript
const baseUrl = "https://i.imgur.com/";
const person = {
  name: "Gregorio Y. Zara",
  imageId: "7vQD0fP",
  imageSize: "s",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={`${baseUrl}${person.imageId}${person.imageSize}.jpg`}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

<br />
<br />

> **자바스크립트 표현식의 대표적인 예 `map`에 대하여**

- 반복 렌더링의 대표적 "자바스크립트 표현식"

- map의 역할

  - 배열의 각 요소를 함수를 통해 변환해서 새로운 배열을 만들고, 그 결과를 JSX 중괄호 안에서 바로 사용할 수 있음.

- 대표적 활용
  - UI 리스트 반복 렌더링 ( 배열 -> 여러 컴포넌트 생성 )

```javascript
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

<br />
<br />

> **for문과의 차이점**

| 기준          | map                                   | for                                     |
| ------------- | ------------------------------------- | --------------------------------------- |
| 종류          | 배열 메서드                           | 반복문(statement)                       |
| 반환값        | 새 배열(표현식)                       | 없음(문)                                |
| JSX 사용      | JSX({}) 내부 사용 가능                | JSX({}) 내부 사용 불가                  |
| 함수형/불변성 | 함수형 스타일, 불변성 유지            | 명령형 스타일, 변수 선언/수정 필요      |
| 용도          | 반복 렌더링, 결과 배열 필요할 때 사용 | 절차적 반복, 다양한 로직 처리에 사용    |
| 코드예시      | `{arr.map(x => <div>{x}</div>)}`      | `for(let i=0; i<arr.length; i++) {...}` |

<br />
<br />

> **Key 값의 중요성**

**1. Key값이 필요한 이유**

- React는 리스트를 렌더링할 때 각 요소가 "어떤 데이터에 대응되는지" 식별해야한다.

- Key는 React가 아이템의 변화가 있을 때 최소한의 DOM 변경만 하도록 최적화하는 기준값이다.

<br />

**2. Key값으로 사용 가능한 것 과 불가능 한 것**

- 가능한 것 : 데이터의 고유한 값 ( id, db pk ), 변하지 않는 uuid

- 불가능한 것 : 배열의 인덱스 ( 순서값 ), 매번 새로 생성되는 랜덤값 ( uuid )
