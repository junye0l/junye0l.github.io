---
slug: react-study-week2-2
title: "리액트 공식문서 스터디 2주차 - 2"
authors: [junye0l]
date: 2025-11-14T09:00:00+09:00
description: "배열 데이터를 map으로 렌더링하는 방법과 key의 중요성, 리스트 렌더링 패턴"
---

<a href="https://react.dev/learn/rendering-lists"><h2>Rendering Lists</h2></a>

<h3>배열을 데이터로 렌더링하기</h3>

```javascript
const people = ["A", "B", "C"];
const listItems = people.map((person) => <li>{person}</li>);
return <ul>{listItems}</ul>;
```

- 여러 개의 유사한 컴포넌트를 보여줄 때 데이터 배열을 활용한다.

- `map()`을 사용해 배열 요소들을 컴포넌트로 변환할 수 있다.

<h3>배열의 항목들을 필터링하기</h3>

```javascript
const chemists = people.filter((person) => person.profession === "chemist");
const listItems = chemists.map((person) => <li>{person.name}</li>);
```

- `filter()`을 이용해 조건(ex: 특정 직업)에 맞는 항목만 추려서 렌더링할 수 있다.

<h3>리스트 key의 중요성</h3>

- `key` prop은 각 리스트 아이템을 고유하게 식별하며, 필수다.

- 보통 데이터의 고유 id를 사용한다 (`key={person.id}`)

- key는 형제 간에만 고유하면 된다.

<h3>key를 가져오는 곳 및 규칙</h3>

- 데이터베이스의 ID, 로컬 UUID 등 신뢰할 수 있고, 변하지 않는 값을 사용한다.

- 렌더 중 즉석 key 생성은 버그와 성능 저하의 원인이다.

<h3>key와 React 생명주기의 연결고리</h3>

- **React 컴포넌트 생명주기란?**

  - **Mount:** 컴포넌트가 DOM에 처음 추가될 때

  - **Update:** props, state 변경으로 리렌더링 될 때

  - **Unmount:** 컴포넌트가 DOM에서 사라질 때

- **리스트 렌더링에서 key의 역할**

  - key가 제대로 설정되면 React는 "이 컴포넌트가 이전에 있던 그 컴포넌트"라는 걸 정확하게 인식할 수 있다.

  - 컴포넌트의 내부 상태(state), 입력값, focus 등 생명주기 전체 흐름이 안전하게 이어진다.

  - 잘못된 key 사용(index, 즉석 생성)은 컴포넌트가 새로 만들어진 것으로 오인하여 state 초기화, focus 문제 등등 버그가 발생할 수 있다.

- 즉, key는 컴포넌트가 생성, 업데이트, 제거되는 **생명주기를 올바르게 관리**하는 데 필수적이다.

  - 복잡한 동적 리스트/폼에서는 key 때문에 생명주기를 제대로 관리하지 못하면 사용자 경험과 코드의 안정성 모두가 위험해질 수 있다.

<a href="https://react.dev/learn/keeping-components-pure"><h2>Keeping Components Pure</h2></a>

<h3>컴포넌트의 순수성(Purity)이란?</h3>

- **순수 함수(Pure Function):**

  - 외부의 값을 변경하지 않고, 동일한 입력에 대해 항상 동일한 출력을 반환한다.

- **React의 기본전제:**

  - 컴포넌트는 "순수 함수"처럼 동작해야 한다.

  - 똑같은 props, state, context를 전달하면 항상 똑같은 JSX(출력)을 반환해야 한다.

<h3>렌더링 중에는 Side Effects를 피해야 한다.</h3>

- 렌더링은 계산만 해야 하며, 변경이나 효과를 일으키면 안된다.

- 애니메이션 시작, 데이터 fetch, DOM 조작 등과 같은 사이드 이펙트는 이벤트 핸들러, useEffect와 같은 훅에서 렌더 이후에 수행해야 한다.

<h3>Strict Mode로 순수성 확인</h3>

- 개발 중 `<React.StrictMode>`를 사용하면, 컴포넌트의 렌더 함수를 두 번 호출하고 순수하지 않은 컴포넌트는 이상하게 보이거나 예측 불가한 동작을 한다. 그렇기에 오류를 빠르게 잡을 수 있다.

- 또한, 실제 배포에서는 영향이 없다.

<h3>지역변수 mutation</h3>

- 함수(컴포넌트) 안에서 초기화한 변수/객체의 변경은 가능하다.

- 즉, 같은 렌더 동안 만들어진 값 안에서 push, pop 등 사용이 가능하다.
  하지만, 함수 밖 (전역, 상위 범위) 변수 변경은 불가능하다.

<a href="https://react.dev/learn/understanding-your-ui-as-a-tree"><h2>Understanding Your UI as a Tree</h2></a>

<h3>UI와 트리(Tree) 모델의 관계</h3>

- UI는 여러 요소가 부모와 자식 관계로 중첩(nesting)되는 구조로 만들어질 수 있다.

- 브라우저의 DOM(HTML), CSSOM, 모바일 화면 등에서 트리 구조가 활용될 수 있다.

- React 역시 컴포넌트들을 트리로 표현하며, 각 컴포넌트가 트리의 노드(node)가 될 수 있다.

<h3>Render Tree(렌더 트리)</h3>

- 여러 컴포넌트를 중첩(nested)해서 만들면, 자연스럽게 **부모와 자식 구조**가 생길 수 있다.

- React 앱이 렌더될 때 각 컴포넌트 관계가 트리로 표현되어, 렌더 트리가 만들어질 수 있다.

- **root node**는 앱의 루트 컴포넌트(대개 `<App />`)가 될 수 있다.

- 각 부모가 자식을 렌더하고, 자식은 다시 자신의 자식을 렌더하여, 트리가 완성될 수 있다.

- 트리의 각 노드는 컴포넌트를 나타낼 수 있다.

- 렌더 트리에는 HTML 태그가 직접 표시되지 않고, 트리는 **오직 React 컴포넌트들**로 구성될 수 있다.

<h3>Conditional Rendering과 트리 변화</h3>

- 부모 컴포넌트가 props나 state에 따라 자식 컴포넌트를 동적으로 다르게 렌더할 수 있다.

- 즉, **렌더 트리 구조가 render pass마다 바뀔 수 있다.**

- 다양한 조건에서 트리 구조가 달라질 수 있으므로, 데이터 흐름 및 최적화를 이해하기에 유리할 수 있다.

<h3>Top-level vs Leaf Components</h3>

- **Top-level component**는 루트에 가까운 상위 컴포넌트로, 하위 컴포넌트 전체 랜더링 성능에 큰 영향을 줄 수 있다.

- **Leaf component**는 트리의 가장 아래에 있는(자식이 없는) 컴포넌트로, 자주 렌더될 수 있다.

- 이 두 종류를 파악하면 앱의 성능이나 데이터 흐름 분석에 매우 유리할 수 있다.

<h3>Module Dependency Tree(의존성 트리)</h3>

- JS 파일/모듈 간의 import/export 관계 역시 트리 구조로 표현될 수 있다.

- 각 노드는 모듈이 될 수 있고, 각 브랜치는 import 관계를 나타낼 수 있다.

- **루트 노드**는 앱의 엔트리포인트 파일(보통 `index.js` or `App.js`)이 될 수 있다.

- 렌더 트리와 다르게, 의존성 트리에는 함수, 상수, 데이터 모듈 등 비컴포넌트도 포함될 수 있다.

- 어떤 모듈이 어디에 import되어 있고, 어떤 모듈이 꼭 필요한지 파악할 수 있다.

- 번들러(Webpack 등)는 이 트리를 참고해 필요한 JS만을 번들로 묶어서 배포할 수 있다.
